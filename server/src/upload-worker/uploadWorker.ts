import { Worker } from "bullmq"
import { uploadChunkedVideoToYouTube } from "../controllers/yt-upload/chunk-upload";
import { io, userSocketMap } from "../lib/webSocketClient";
import { redisClient } from "../lib/redisClient";


const worker = new Worker("youtube-upload", async (job) => {
    const {
        taskId, youtuberId, uploadUrl, accessToken,
        chunkSize, startByte, videoUrl, fileSize, mimeType,
        title, description, tags, madeForKids
    } = job.data;

    await uploadChunkedVideoToYouTube({
        uploadUrl,
        videoUrl,
        chunkSize,
        mimeType,
        startByte,
        accessToken,
        fileSize,
        onProgress: (percent) => {
            const socketId = userSocketMap.get(youtuberId);
            if (socketId)
                io.to(socketId).emit('upload-progress', { taskId, youtuberId, percent });
            else
                io.emit('upload-progress', { taskId, youtuberId, percent });

        }
    });


}, { connection: redisClient })

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
});