import axios from 'axios';
import { Response } from 'express';
import fs from 'fs';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiresponse';
import { client } from '../../db/connectToDb';
import { DownloadImgFromCloudinaryUrl } from '../../utils/yt-helper/imgDownloadCloudinaryurl';
import { getTokenForStartingVideoUploadSession } from '../../utils/yt-helper/getToken';
import { getVideoFileConfigs } from '../../utils/cloudinary';


const startSession = asyncHandler(async (req: any, res: Response) => {

    const { code, taskId } = req.body;
    let access_token = null;
    try {
        access_token = await getTokenForStartingVideoUploadSession(code, taskId);
    } catch (error) {
        console.log('Error getting access token:', error);
        return res.status(500).json(new ApiResponse(null, "Error getting access token"));
    }

    if (!access_token) return res.status(400).send('Access token is required');

    const ytDetails = await client.task.findFirst({
        where: {
            id: taskId
        },
        select: {
            title: true,
            description: true,
            tags: true,
            madeForKids: true,
            editedVideoUrl: true,
        }
    });
    if (!ytDetails) return res.status(404).json(new ApiResponse(null, "YouTube details not found for the task"));

    const { title, description, tags, madeForKids, editedVideoUrl } = ytDetails;
    if (!title || !description || !editedVideoUrl) {
        return res.status(400).json(new ApiResponse(null, "Title, description and video are required"));
    }

    const { fileSize, mimeType } = await getVideoFileConfigs(editedVideoUrl);

    const videoMetadata = {
        "snippet": {
            title,
            description,
            tags: tags || [],
            "categoryId": 22
        },
        "status": {
            "privacyStatus": "private",
            "embeddable": true,
            "license": "youtube",
            madeForKids
        }
    };

    axios({
        method: 'post',
        url: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Upload-Content-Length': fileSize,
            'X-Upload-Content-Type': mimeType
        },
        data: videoMetadata
    })
        .then(response => {
            console.log('Resumable session initiated successfully!');
            console.log('Location header (resumable session URI):', response.headers.location);
            return res.status(200).json(new ApiResponse({
                uploadUrl: response.headers.location
            }, "Resumable session initiated successfully"));
        })
        .catch(error => {
            console.error('Error initiating resumable session:', error);
            return res.status(500).json(new ApiResponse(null, "Error initiating resumable session"));
        });
})

const uploadChunks = asyncHandler(async (req: any, res: Response) => {
    const { access_token, uploadUrl, chunkSize, startByte = 0, videoPath, fileSize } = req.body;
    if (!access_token || !uploadUrl || !chunkSize || !videoPath || !chunkSize)
        return res.status(400).json(new ApiResponse(null, "access_token, uploadUrl, chunkSize, videoPath and fileSize are required"));

    const endByte = Math.min(startByte + chunkSize - 1, fileSize - 1);
    const contentLength = endByte - startByte + 1;

    console.log(`Uploading chunk: ${startByte} to ${endByte} (length: ${contentLength})`);

    const fileChunk = fs.createReadStream(videoPath, { start: startByte, end: endByte });

    try {
        const response = await axios({
            method: 'put',
            url: uploadUrl,
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Length': contentLength,
                'Content-Type': 'video/webm', // Use actual MIME type
                'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`
            },
            data: fileChunk,
            validateStatus: () => true, // Accept non-2xx (like 308)
        });

        //  Chunk successfully uploaded
        if (response.status === 308) {
            const range = response.headers.range; // Might be undefined if nothing uploaded
            const nextStart = range ? parseInt(range.split('-')[1]) + 1 : startByte + chunkSize;

            return res.status(200).json({
                message: 'Chunk uploaded, continue upload',
                nextStartByte: nextStart
            });
        }

        //  Final chunk uploaded
        if (response.status === 201 || response.status === 200) {
            return res.status(201).json({
                message: 'Upload complete!',
                video: response.data
            });
        }

        // Unexpected status
        return res.status(response.status).json({
            message: 'Unexpected response during upload',
            status: response.status,
            data: response.data
        });

    } catch (error) {
        console.error('Upload failed:', error);
        return res.status(500).json(new ApiResponse(null, "Error uploading chunk"));
    }
})

const uploadThumbnail = asyncHandler(async (req: any, res: Response) => {
    const { videoId, accessToken, taskId } = req.body;

    if (!videoId || !accessToken || !taskId) {
        return res.status(400).json({ error: 'videoId, taskId and accessToken are required' });
    }

    const task = await client.task.findFirst({
        where: {
            id: taskId
        }
    });
    if (!task || !task.thumbnail) {
        return res.status(400).json(new ApiResponse(null, "Invalid task or no thumbnail available"));
    }

    const thumbnailPath = DownloadImgFromCloudinaryUrl(task.thumbnail)

    if (!fs.existsSync(thumbnailPath)) {
        return res.status(404).json({ error: 'Thumbnail image not found on server' });
    }

    const imageData = fs.readFileSync(thumbnailPath);
    const fileSize = fs.statSync(thumbnailPath).size;

    try {
        const response = await axios.post(
            `https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${videoId}`,
            imageData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'image/jpeg',
                    'Content-Length': fileSize
                }
            }
        );

        console.log('Thumbnail uploaded:', response.data);
        res.status(200).json({
            message: 'Thumbnail uploaded successfully',
            thumbnailDetails: response.data
        });

    } catch (error) {
        console.error('Error uploading thumbnail:', error);
        res.status(500).json(new ApiResponse(null, "Error uploading thumbnail"));
    }
})

const publishVideo = asyncHandler(async (req: any, res: Response) => {
    const {
        accessToken,
        videoId,
        taskId,
        categoryId = 22,

    } = req.body;

    if (!accessToken || !videoId || taskId) {
        return res.status(400).json({
            error: 'Missing required fields: accessToken, videoId, taskId'
        });
    }

    const task = await client.task.findFirst({
        where: {
            id: taskId
        }
    });

    if (!task) {
        return res.status(404).json(new ApiResponse(null, "Task not found"));
    }
    const { title, description, tags, madeForKids } = task;

    try {
        const response = await axios.put(
            'https://www.googleapis.com/youtube/v3/videos?part=snippet,status',
            {
                id: videoId,
                snippet: {
                    title,
                    description,
                    tags: tags || [],
                    categoryId
                },
                status: {
                    privacyStatus: "public",
                    madeForKids
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(`Video "${title}" published successfully!`);
        return res.status(200).json(new ApiResponse(response.data, "Video published successfully"));

    } catch (error) {
        console.error('Failed to publish video:', error);
        return res.status(500).json(new ApiResponse(null, "Failed to publish video"));
    }
})

export {
    startSession,
    uploadChunks,
    uploadThumbnail,
    publishVideo
}