import { httpServer } from "./app";
import { PORT } from "./config";
import "./lib/redisClient"
import "./lib/webSocketClient";
const port = PORT

const startServer = async () => {

    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port} ⛩️`);
    });
}

startServer().catch((error) => {
    console.error("Error starting server:", error);
});