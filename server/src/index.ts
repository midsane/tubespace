import { httpServer } from "./app";
import { PORT } from "./config";
import { youtubeUploadQueue, thumbnailUploadQueue, publishVideoQueue } from "./lib/bullmq";
import { redisClient } from "./lib/redisClient";
// import "./lib/redisClient"
import "./lib/webSocketClient";
import "./realTime-chat/socket";
import "./utils/push-notification/notify"
const port = PORT


const startServer = async () => {
    // await youtubeUploadQueue.obliterate({ force: true });
    // await thumbnailUploadQueue.obliterate({ force: true });
    // await publishVideoQueue.obliterate({ force: true });

    await redisClient.quit();

    console.log("BullMQ queues cleared");

    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port} ⛩️`);
    });
}

startServer().catch((error) => {
    console.error("Error starting server:", error);
})