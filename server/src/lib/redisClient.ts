import { Redis } from '@upstash/redis';

const REDIS_API_KEY = process.env.REDIS_API_KEY;
if (!REDIS_API_KEY) {
    throw new Error("REDIS_API_KEY is not defined in the environment variables.");
}


export const redisClient = new Redis({
    url: 'https://light-frog-49204.upstash.io',
    token: REDIS_API_KEY,
});