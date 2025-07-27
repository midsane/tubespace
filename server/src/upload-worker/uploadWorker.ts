import { Worker } from "bullmq"
import { uploadChunkedVideoToYouTube } from "../controllers/yt-upload/chunk-upload";
import { io, userSocketMap } from "../lib/webSocketClient";
import { redisClient } from "../lib/redisClient";
import { publishVideo, uploadThumbnail } from "../controllers/yt-upload/yt-startSession";
import { publishVideoQueue } from "../lib/bullmq";
import { YOUTUBE_UPLOAD_TYPES } from "../types/types";
import { UploadSocketEvent } from "../types/socketEventEnums";
import { notify } from "../utils/push-notification/notify";
import { client } from "../db/connectToDb";

const videoUploadWorker = new Worker(YOUTUBE_UPLOAD_TYPES.VIDEO_UPLOAD, async (job) => {
    console.log(`Processing video upload job ${job.id} for taskId: ${job.data.taskId}`);
    const { youtuberId, taskId } = job.data;
    await uploadChunkedVideoToYouTube({
        ...job.data,
        onProgress: (percent) => {
            console.log("youtuberId:", youtuberId)
            const socketId = userSocketMap.get(youtuberId);
            console.log("socketid:", socketId)
            if (socketId)
                io.to(socketId).emit(UploadSocketEvent.UPLOAD_PROGRESS, { taskId, youtuberId, percent });
            else
                io.emit(UploadSocketEvent.UPLOAD_FAILED, { taskId, youtuberId, message: "user not authenticated to see the progress" });
        }
    });

}, { connection: redisClient })

videoUploadWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
    const { youtuberId, taskId } = job.data;

    const socketId = userSocketMap.get(youtuberId);
    if (socketId)
        io.to(socketId).emit(UploadSocketEvent.UPLOAD_PROGRESS, { taskId, youtuberId, percent: 100 });
    else
        io.emit(UploadSocketEvent.UPLOAD_FAILED, { taskId, youtuberId, message: "user not authenticated to see the progress" });
});

videoUploadWorker.on("failed", async (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
    const { youtuberId, taskId } = job?.data || {};
    const socketId = userSocketMap.get(youtuberId);
    if (socketId) {
        io.to(socketId).emit(UploadSocketEvent.UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    } else {
        io.emit(UploadSocketEvent.UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    }

    if (!job) {
        console.error(`job undefined, failed to send notification.`);
        return;
    }
    const ytDetails = await client.user.findFirst({
        where: { id: job.data.youtuberId },
        select: { fcmTokens: true }
    })
    if (!ytDetails) {
        console.error(`Youtuber with ID ${job.data.youtuberId} not found.\n failed to send notification.`);
        return;
    }
    await notify(
        ytDetails?.fcmTokens[0],
        "⚠️ Video Upload Failed",
        `Unfortunately, your video titled "${job.data.title}" could not be uploaded to YouTube.\nPlease try again or check your connection.`
    );
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

thumbnailUploadWorker.on("failed", async (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
    const { youtuberId, taskId } = job?.data || {};
    const socketId = userSocketMap.get(youtuberId);
    if (socketId) {
        io.to(socketId).emit(UploadSocketEvent.THUMBNAIL_UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    } else {
        io.emit(UploadSocketEvent.THUMBNAIL_UPLOAD_FAILED, { taskId, youtuberId, error: err.message });
    }

    if (!job) {
        console.error(`job undefined, failed to send notification.`);
        return;
    }
    const ytDetails = await client.user.findFirst({
        where: { id: job.data.youtuberId },
        select: { fcmTokens: true }
    })
    if (!ytDetails) {
        console.error(`Youtuber with ID ${job.data.youtuberId} not found.\n failed to send notification.`);
        return;
    }
    await notify(
        ytDetails?.fcmTokens[0],
        "⚠️ Thumbnail Upload Failed",
        `The thumbnail for your video titled "${job.data.title}" could not be uploaded to YouTube.\n\nAs a result, the video has been uploaded in private mode and was not made public.\nPlease update the thumbnail and publish it manually.`
    );

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

publishVideoWorker.on("completed", async (job) => {
    console.log(`Job ${job.id} completed successfully`);
    const ytDetails = await client.user.findFirst({
        where: { id: job.data.youtuberId },
        select: { fcmTokens: true }
    })
    if (!ytDetails) {
        console.error(`Youtuber with ID ${job.data.youtuberId} not found.\n failed to send notification.`);
        return;
    }
    await notify(
        ytDetails?.fcmTokens[0],
        `🎉 Your video "${job.data.title}" has been successfully published on YouTube!\n\nTap to watch it now.`,
        "https://www.youtube.com/watch?v=" + job.data.videoId
    );
});

publishVideoWorker.on("failed", async (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err);
    const { youtuberId, taskId } = job?.data || {};
    const socketId = userSocketMap.get(youtuberId);
    if (socketId) {
        io.to(socketId).emit(UploadSocketEvent.PUBLISH_VIDEO_FAILED, { taskId, youtuberId, error: err.message });
    } else {
        io.emit(UploadSocketEvent.PUBLISH_VIDEO_FAILED, { taskId, youtuberId, error: err.message });
    }

    if (!job) {
        console.error(`job undefined, failed to send notification.`);
        return;
    }
    const ytDetails = await client.user.findFirst({
        where: { id: job.data.youtuberId },
        select: { fcmTokens: true }
    })
    if (!ytDetails) {
        console.error(`Youtuber with ID ${job.data.youtuberId} not found.\n failed to send notification.`);
        return;
    }
    await notify(
        ytDetails?.fcmTokens[0],
        "⚠️ Metadata Upload Failed",
        `We were unable to upload the title, description, or other metadata for your video: "${job.data.title}".\n\nAs a result, the video has been uploaded in private mode and was not made public.\nPlease review the metadata and publish the video manually from your YouTube Studio.`
    );
});

