import { Worker } from "bullmq"
import { uploadChunkedVideoToYouTube } from "../controllers/yt-upload/chunk-upload";
import { io, userSocketMap } from "../lib/webSocketClient";
import { redisClient } from "../lib/redisClient";
import { publishVideo, uploadThumbnail } from "../controllers/yt-upload/yt-startSession";
import { publishVideoQueue } from "../lib/bullmq";
import { YOUTUBE_UPLOAD_TYPES } from "../types/types";
import { UploadSocketEvent } from "../types/socketEventEnums";

const videoUploadWorker = new Worker(YOUTUBE_UPLOAD_TYPES.VIDEO_UPLOAD, async (job) => {
    console.log(`Processing video upload job ${job.id} for taskId: ${job.data.taskId}`);
    const { youtuberId, taskId } = job.data;
    await uploadChunkedVideoToYouTube({
        ...job.data,
        onProgress: (percent) => {
            const socketId = userSocketMap.get(youtuberId);
            if (socketId)
                io.to(socketId).emit(UploadSocketEvent.UPLOAD_PROGRESS, { taskId, youtuberId, percent });
            else
                io.emit(UploadSocketEvent.UPLOAD_PROGRESS, { taskId, youtuberId, percent });
        }
    });

}, { connection: redisClient })

videoUploadWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

videoUploadWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
    const { youtuberId, taskId } = job?.data || {};
    const socketId = userSocketMap.get(youtuberId);
    if (socketId) {
        io.to(socketId).emit(UploadSocketEvent.UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    } else {
        io.emit(UploadSocketEvent.UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    }
});


const thumbnailUploadWorker = new Worker(YOUTUBE_UPLOAD_TYPES.THUMBNAIL_UPLOAD, async (job) => {
    console.log(`Processing thumbnail upload job ${job.id} for taskId: ${job.data.taskId}`);
    const {
        taskId,
        videoId,
        accessToken
    } = job.data;

    await uploadThumbnail({
        taskId,
        videoId,
        accessToken,
        onComplete: () => {
            const socketId = userSocketMap.get(job.data.youtuberId);
            if (socketId) {
                io.to(socketId).emit(UploadSocketEvent.THUMBNAIL_UPLOADED, { taskId, videoId: job.data.videoId });
            } else {
                io.emit(UploadSocketEvent.THUMBNAIL_UPLOADED, { taskId, videoId: job.data.videoId });
            }
        }
    });

}, { connection: redisClient })

thumbnailUploadWorker.on("completed", async (job) => {
    console.log(`Job ${job.id} completed successfully`);
    await publishVideoQueue.add(YOUTUBE_UPLOAD_TYPES.PUBLISH_VIDEO, {
        ...job.data
    }, {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: true,
    });
});

thumbnailUploadWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
    const { youtuberId, taskId } = job?.data || {};
    const socketId = userSocketMap.get(youtuberId);
    if (socketId) {
        io.to(socketId).emit(UploadSocketEvent.THUMBNAIL_UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    } else {
        io.emit(UploadSocketEvent.THUMBNAIL_UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    }
});

const publishVideoWorker = new Worker(YOUTUBE_UPLOAD_TYPES.PUBLISH_VIDEO, async (job) => {
    console.log(`Processing publish-video job ${job.id} for taskId: ${job.data.taskId}`);
    const {
        taskId,
        videoId,
        accessToken
    } = job.data;

    await publishVideo({
        taskId,
        videoId,
        accessToken,
        onComplete: () => {
            const socketId = userSocketMap.get(job.data.youtuberId);
            if (socketId) {
                io.to(socketId).emit(UploadSocketEvent.PUBLISH_VIDEO, { taskId, videoId: job.data.videoId });
            } else {
                io.emit(UploadSocketEvent.PUBLISH_VIDEO, { taskId, videoId: job.data.videoId });
            }
        }
    });

}, { connection: redisClient })

publishVideoWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

publishVideoWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
    const { youtuberId, taskId } = job?.data || {};
    const socketId = userSocketMap.get(youtuberId);
    if (socketId) {
        io.to(socketId).emit(UploadSocketEvent.PUBLISH_VIDEO_FAILED, { taskId, youtuberId, error: err.message });
    } else {
        io.emit(UploadSocketEvent.PUBLISH_VIDEO_FAILED, { taskId, youtuberId, error: err.message });
    }
});

