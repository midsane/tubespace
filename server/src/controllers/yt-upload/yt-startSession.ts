import { Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import { client } from '../../db/connectToDb';
import { ApiResponse } from '../../utils/apiresponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getTokenForStartingVideoUploadSession } from '../../utils/yt-helper/getToken';
import { getVideoFileConfigs } from '../../utils/cloudinary';
import { youtubeUploadQueue } from '../../lib/bullmq';
import { DownloadImgFromCloudinaryUrl } from '../../utils/yt-helper/imgDownloadCloudinaryurl';

const startSession = asyncHandler(async (req: any, res: Response) => {
    const { code, taskId: taskid } = req.body;
    const taskId = Number(taskid);

    if (!code || !taskId) {
        return res.status(400).json(new ApiResponse(null, "Code and taskId are required"));
    }

    let access_token: string | null = null;

    try {
        access_token = (await getTokenForStartingVideoUploadSession(code, taskId)).accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        return res.status(500).json(new ApiResponse(null, "Failed to get access token"));
    }

    if (!access_token) {
        return res.status(400).json(new ApiResponse(null, "Access token is required"));
    }

    const ytDetails = await client.task.findFirst({
        where: { id: taskId },
        select: {
            title: true,
            description: true,
            tags: true,
            madeForKids: true,
            editedVideoUrl: true,
        },
    });

    if (!ytDetails) {
        return res.status(404).json(new ApiResponse(null, "YouTube details not found for this task"));
    }

    const { title, description, tags, madeForKids, editedVideoUrl } = ytDetails;

    if (!title || !description || !editedVideoUrl) {
        return res.status(400).json(new ApiResponse(null, "Title, description and video are required"));
    }

    const { fileSize, mimeType } = await getVideoFileConfigs(editedVideoUrl);

    const videoMetadata = {
        snippet: {
            title,
            description,
            tags: tags || [],
            categoryId: 22,
        },
        status: {
            privacyStatus: 'private',
            embeddable: true,
            license: 'youtube',
            madeForKids,
        },
    };

    try {
        const response = await axios.post(
            'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails',
            videoMetadata,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Upload-Content-Length': fileSize,
                    'X-Upload-Content-Type': mimeType,
                },
            }
        );

        const uploadUrl = response.headers.location;

        if (!uploadUrl) {
            throw new Error("Missing 'Location' header in resumable session response");
        }

        const jobData = {
            taskId,
            youtuberId: req.user.id,
            uploadUrl,
            mimeType,
            accessToken: access_token,
            chunkSize: 1024 * 1024, // 1MB
            startByte: 0,
            videoUrl: editedVideoUrl,
            fileSize,
            title,
            description,
            tags,
            madeForKids,
        };

        await youtubeUploadQueue.add('upload-video-task', jobData, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000, // Retry after 1s, then 2s, then 4s...
            },
            removeOnComplete: true,
            removeOnFail: false,
        });

        return res.status(200).json(new ApiResponse(
            { uploadUrl },
            'Video upload session staged successfully'
        ));
    } catch (err) {
        console.error('🔥 Error initiating YouTube upload session:', err);
        return res.status(500).json(new ApiResponse(null, 'Failed to initiate upload session'));
    }
});

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
    uploadThumbnail,
    publishVideo
}