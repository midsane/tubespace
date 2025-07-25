import { Response } from 'express';
import axios, { AxiosError } from 'axios';
import fs from 'fs';
import { client } from '../../db/connectToDb';
import { ApiResponse } from '../../utils/apiresponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { getTokenForStartingVideoUploadSession } from '../../utils/yt-helper/getToken';
import { getVideoFileConfigs } from '../../utils/cloudinary';
import { youtubeUploadQueue } from '../../lib/bullmq';
import { DownloadImgFromCloudinaryUrl } from '../../utils/yt-helper/imgDownloadCloudinaryurl';
import { customRequest, JobData, VideoMetadata, YOUTUBE_UPLOAD_TYPES } from '../../types/types';
import { buildYouTubeMetadata } from '../../utils/youtubeMetdata';
import { jwtSecretConfig, mode } from '../../config';
import jwt from "jsonwebtoken"

const getAccessToken = asyncHandler(async (req: customRequest, res: Response) => {
    const { code, taskId: taskid } = req.body;
    const 
    taskId = Number(taskid);
    if (!code || !taskId) {
        return res.status(400).json(new ApiResponse(null, " and taskId are required"));
    }
    const { accessToken } = await getTokenForStartingVideoUploadSession(code, taskId);
    if (!accessToken) {
        return res.status(400).json(new ApiResponse(null, "Failed to get access token"));
    }

    const jwtSecret = jwtSecretConfig
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "jwt secret not loaded/ internal server err"))

    const token = jwt.sign({ accessToken, id: req.user.id }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("socketAuth", "Bearer " + token, {
        secure: mode !== "development",
        httpOnly: true,
        sameSite: mode === "development" ? "lax" : "none"
    })

    res.status(200).json(new ApiResponse(accessToken, "access token generated successfully"))

})

const startSession = asyncHandler(async (req: customRequest, res: Response) => {
    const { taskId: taskid } = req.body;
    const accessToken = req?.user?.accessToken;
    const userId = req?.user?.id;

    if (!accessToken) {
        return res.status(400).json(new ApiResponse(null, "access token not set in cookie"));
    }

    if (!userId) {
        return res.status(400).json(new ApiResponse(null, "user ID not set in cookie"));
    }
    const taskId = Number(taskid);

    if (!taskId) {
        return res.status(400).json(new ApiResponse(null, "taskId is required"));
    }

    
    const ytDetails = await client.task.findFirst({
        where: { id: taskId },
        select: {
            youtuberId: true,
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

    if (ytDetails.youtuberId !== userId) {
        return res.status(404).json(new ApiResponse(null, "user not authorized to start this session"));
    }

    const { title, description, tags, madeForKids, editedVideoUrl } = ytDetails;

    if (!title || !description || !editedVideoUrl) {
        return res.status(400).json(new ApiResponse(null, "Title, description and video are required"));
    }

    const { fileSize, mimeType } = await getVideoFileConfigs(editedVideoUrl);

    const videoMetadata: VideoMetadata = buildYouTubeMetadata(title, description, tags, madeForKids);

    console.log("videoMetadata", videoMetadata);

    console.log("file size:", fileSize);
    console.log("mimeType:", mimeType);
    console.log("accessToken:", accessToken);


    try {
        const response = await axios({
            method: 'post',
            url: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Upload-Content-Length': `${fileSize}`,
                'X-Upload-Content-Type': `${mimeType}`
            },
            data: videoMetadata
        })

        console.log('Resumable session initiated successfully!');
        console.log('Location header (resumable session URI):', response.headers.location);
        const uploadUrl = response.headers.location;
        if (!uploadUrl) {
            return res.status(500).json(new ApiResponse(null, "Failed to get upload URL"));
        }
        const jobData: JobData = {
            taskId,
            youtuberId: req.user.id,
            uploadUrl,
            mimeType,
            accessToken: accessToken,
            chunkSize: 1024 * 1024, // 1MB
            startByte: 0,
            videoUrl: editedVideoUrl,
            fileSize,
            title,
            description,
            tags,
            madeForKids,
        };

        await youtubeUploadQueue.add(YOUTUBE_UPLOAD_TYPES.VIDEO_UPLOAD, jobData, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000, // Retry after 1s, then 2s, then 4s...
            },
            removeOnComplete: true,
            removeOnFail: true,
        });
        console.log('Job added to queue:', jobData);
        return res.status(200).json(new ApiResponse(null, "Resumable session initiated successfully"));

    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(null, "Failed to initiate resumable session"));
    }

})


interface uploadThumbnailParams {
    taskId: number,
    videoId: string,
    accessToken: string,
    onComplete: () => void
}

const uploadThumbnail = async ({ taskId, videoId, accessToken, onComplete }: uploadThumbnailParams) => {

    if (!videoId || !accessToken || !taskId) {
        throw new Error("videoId, taskId and accessToken are required")
    }

    const task = await client.task.findFirst({ where: { id: taskId }, select: { thumbnail: true } });
    if (!task) {
        throw new Error("Task not found");
    }

    const { thumbnail } = task;

    if (!thumbnail) {
        throw new Error("Thumbnail is required")
    }

    const thumbnailPath = await DownloadImgFromCloudinaryUrl(thumbnail)
    console.log("Thumbnail path:", thumbnailPath);

    if (!fs.existsSync(thumbnailPath)) {
        throw new Error("Thumbnail image not found on server");
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
        )
        console.log('Thumbnail uploaded:', response.data);
        fs.unlinkSync(thumbnailPath); // Clean up the thumbnail file after upload
        console.log('Thumbnail file deleted from server:', thumbnailPath);
        onComplete();

    }
    catch (error) {
        console.error('Error uploading thumbnail:', error);
        fs.unlinkSync(thumbnailPath); // Clean up the thumbnail file even if upload fails
        throw new Error(`Failed to upload thumbnail: ${error}`);
    }
}

interface publishVideoParams {
    taskId: number,
    videoId: string,
    accessToken: string,
    onComplete: () => void;
}


const publishVideo = async ({ taskId, videoId, accessToken, onComplete }: publishVideoParams) => {

    if (!accessToken || !videoId || !taskId) {
        throw new Error('Missing required fields: accessToken, videoId, taskId');
    }

    const task = await client.task.findFirst({
        where: {
            id: taskId
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }
    const { title, description, tags, madeForKids } = task;
    console.log("title: ", title)
    console.log("description:", description)
    console.log("tags: ", tags)
    console.log("madeForKids:", madeForKids)
    console.log("taskId: ", taskId)
    console.log("videoId:", videoId)
    // console.log("accessToken:", accessToken)

    try {
        const response = await axios.put(
            'https://www.googleapis.com/youtube/v3/videos?part=snippet,status',
            {
                id: videoId,
                snippet: {
                    title,
                    description,
                    tags: tags || [],
                    categoryId: 22
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
        console.log('Video published successfully:', response.data);
        console.log(`Video "${title}" published successfully!`);
        onComplete();
    } catch (error) {
        if (error instanceof AxiosError)
            console.error('Error response:', error?.response?.data);
        throw new Error(`Failed to publish video: ${JSON.stringify((error as AxiosError).response?.data)}`);

    }
}

export {
    getAccessToken,
    startSession,
    uploadThumbnail,
    publishVideo
}