
import { Queue } from "bullmq";
import { redisClient } from "./redisClient";
import { YOUTUBE_UPLOAD_TYPES } from "../types/types";

export const youtubeUploadQueue = new Queue(YOUTUBE_UPLOAD_TYPES.VIDEO_UPLOAD, {
    connection: redisClient
})

export const thumbnailUploadQueue = new Queue(YOUTUBE_UPLOAD_TYPES.THUMBNAIL_UPLOAD, {
    connection: redisClient
})

export const publishVideoQueue = new Queue(YOUTUBE_UPLOAD_TYPES.PUBLISH_VIDEO, {
    connection: redisClient
})

