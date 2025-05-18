import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { setupSocket } from "./socket";

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
    cors: {
        origin: [process.env.clientURL || "", process.env.clientURL2 || ""],
        credentials: true,
    },
});

setupSocket(io);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
