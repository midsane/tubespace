import dotenv from "dotenv";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { setupSocket } from "./socket";

dotenv.config({
    path: ".env",
});

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: [process.env.clientURL || "", process.env.clientURL2 || ""],
        credentials: true,
    },
});

setupSocket(io);

const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🗿🚬`);
});
