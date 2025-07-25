import { httpServer } from "../app";
import { Server } from "socket.io";
import { CLIENT_URL1, CLIENT_URL2, CLIENT_URL3, jwtSecretConfig } from "../config";
import { ChatSocketEvents } from "../types/socketEventEnums";
import jwt from "jsonwebtoken";
import { customSocket } from "../types/types";

if (!CLIENT_URL1 || !CLIENT_URL2 || !CLIENT_URL3) {
    console.log("CLIENT_URL1 or CLIENT_URL2 or CLIENT_URL3 is not set in the environment variables.");
    throw new Error("CLIENT_URL1 or CLIENT_URL2 or CLIENT_URL3 is not set in the environment variables.");
}

const getSocketFromEmailMap = new Map<string, string>();
const getEmailFromSocketMap = new Map<string, string>();

const io = new Server(httpServer, {
    cors: {
        origin: [CLIENT_URL1, CLIENT_URL2, CLIENT_URL3],
        credentials: true,
    },
});

io.use((socket: customSocket, next) => {
    const bearerToken = socket.handshake.headers.cookie;
    const token = bearerToken ? bearerToken.split(' ')[1] : null;
    console.log("token:", token);
    if (!jwtSecretConfig) {
        return next(new Error("JWT secret config is not set"));
    }
    if (!token) {
        return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, jwtSecretConfig);
    if (!decoded) {
        return next(new Error("Authentication error: Invalid token"));
    }

    socket.user = decoded as typeof socket.user;
    getSocketFromEmailMap.set(socket.user?.email as string, socket.id);
    getEmailFromSocketMap.set(socket.id, socket.user?.email as string);
    next();
});

io.on(ChatSocketEvents.CONNECT, (socket) => {
    console.log("A user connected:", socket.id);
});

io.on(ChatSocketEvents.CONNECT_ERROR, (error) => {
    console.error("Connection error:", error);
});

io.on(ChatSocketEvents.DISCONNECT, (socket) => {
    console.log("A user disconnected:", socket.id);
});

io.on(ChatSocketEvents.MESSAGE_RECEIVED, (socket, data) => {
    console.log("Message received from socket", socket.id);
    console.log("Message received from email", getEmailFromSocketMap.get(socket.id));
    console.log("Message received:", data);

})