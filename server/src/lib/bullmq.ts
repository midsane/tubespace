
import { Queue } from "bullmq";
import { redisClient } from "./redisClient";

export const youtubeUploadQueue = new Queue("youtube-upload", {
    connection: redisClient
})