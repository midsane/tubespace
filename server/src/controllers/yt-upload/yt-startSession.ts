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
import { customRequest, JobData, VideoMetadata } from '../../types/types';
import { redisClient } from '../../lib/redisClient';
import { buildYouTubeMetadata } from '../../utils/youtubeMetdata';


const startSession = asyncHandler(async (req: customRequest, res: Response) => {
    const { code, taskId: taskid } = req.body;
    const taskId = Number(taskid);

    if (!code || !taskId) {
        return res.status(400).json(new ApiResponse(null, "Code and taskId are required"));
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

    const videoMetadata = buildYouTubeMetadata(title, description, tags, madeForKids);

    console.log("videoMetadata", videoMetadata);
    const { accessToken, refreshToken } = await getTokenForStartingVideoUploadSession(code, taskId);
    if(!accessToken) {
        return res.status(400).json(new ApiResponse(null, "Failed to get access token"));
    }

    console.log("file size:", fileSize);
    console.log("mimeType:", mimeType);
    console.log("accessToken:", accessToken);


    await axios({
        method: 'post',
        url: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Upload-Content-Length': `${fileSize}`, // Replace with the actual size of your video file in bytes
            'X-Upload-Content-Type': `${mimeType}` // Replace with the actual MIME type of your video file
        },
        data: JSON.stringify(videoMetadata)
    })
        .then(response => {
            console.log('Resumable session initiated successfully!');
            console.log('Location header (resumable session URI):', response.headers.location);
            // You would typically save the location header value to use for the actual video upload
        })
        .catch(error => {
            console.error('Error initiating resumable session:', error.response ? error.response.data : error.message);
        });

})






const reqForChunkedUpload = async (
    youtuberId: number,
    videoMetadata: VideoMetadata,
    access_token: string,
    fileSize: number,
    mimeType: string,
    taskId: number,
    editedVideoUrl: string,
    title: string,
    description: string,
    tags: string[] | undefined,
    madeForKids: boolean
): Promise<void> => {
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

        const uploadUrl: string | undefined = response.headers.location;

        if (!uploadUrl) {
            throw new Error("Missing 'Location' header in resumable session response");
        }

        const jobData: JobData = {
            taskId,
            youtuberId,
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
    }
    catch (err: any) {
        if (axios.isAxiosError(err)) {
            console.error("YouTube resumable session error:", {
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                headers: err.response?.headers,
            });
        } else {
            console.error("Non-Axios error:", err);
        }

        throw new Error("Failed to get upload session URL");
    }
}

const uploadThumbnail = asyncHandler(async (req: customRequest, res: Response) => {
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

const publishVideo = asyncHandler(async (req: customRequest, res: Response) => {
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