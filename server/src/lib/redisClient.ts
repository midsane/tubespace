import { REDIS_CLOUD_URL } from '../config';

if (!REDIS_CLOUD_URL) {
    throw new Error("REDIS_CLOUD_URL is not defined in the environment variables.");
}

import Redis from "ioredis"

export const redisClient = new Redis(REDIS_CLOUD_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    retryStrategy: (times) => {
        const delay = Math.min(times * 100, 2000)   // Exponential backoff
        return delay;
    }
});
