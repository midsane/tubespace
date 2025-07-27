import { httpServer } from "./app";
import { PORT } from "./config";
import { youtubeUploadQueue, thumbnailUploadQueue, publishVideoQueue } from "./lib/bullmq";
import "./lib/redisClient"
import "./lib/webSocketClient";
import "./realTime-chat/socket";
import "./upload-worker/uploadWorker"
import "./utils/push-notification/notify"
const port = PORT

const startServer = async () => {
    await youtubeUploadQueue.obliterate({ force: true });
    await thumbnailUploadQueue.obliterate({ force: true });
    await publishVideoQueue.obliterate({ force: true });

    console.log("BullMQ queues cleared");

    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port} ⛩️`);
    });
}

startServer().catch((error) => {
    console.error("Error starting server:", error);
})