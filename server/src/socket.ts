import { Server, Socket } from "socket.io";
import client from "./db/db";

const userSocketMap = new Map<string, string>();
const getUserNameFromSocketIdMap = new Map<string, string>();

export enum SOCKET_EVENTS {
    REGISTER = "register",
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    MESSAGE_DELIVERED = "message_delivered",
    MESSAGE_READ = "message_read",
    MESSAGE = "private_message",
    UPDATE_MESSAGE_STATUS = "update_message_status",
}

export enum MESSAGE_STATUS {
    UNSENT = "UNSENT",
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ",
}

const seeConnectedUser = () => {
    console.log("Connected users:");
    for (const [userName, socketId] of userSocketMap.entries()) {
        console.log(`User: ${userName}, Socket ID: ${socketId}`);
    }
};
export const setupSocket = (io: Server) => {
    io.on(SOCKET_EVENTS.CONNECT, (socket: Socket) => {
        console.log(`⚡ Client connected: ${socket.id}`);
        seeConnectedUser();
        socket.on(SOCKET_EVENTS.REGISTER, (userName: string) => {
            userSocketMap.set(userName, socket.id);
            getUserNameFromSocketIdMap.set(socket.id, userName);
            console.log(`🪪 Registered user ${userName} with socket ${socket.id}`);
            seeConnectedUser();
        });

        socket.on(SOCKET_EVENTS.MESSAGE, async ({ toUserName, message, chatId }, callback) => {
            console.log("toUserName", toUserName);
            callback({ status: "ok", msg: "message successfully sent to server", chatId });
            const targetSocketId = userSocketMap.get(toUserName);
            const fromUserName = getUserNameFromSocketIdMap.get(socket.id);
            seeConnectedUser();
            if (targetSocketId) {
                const msg = await client.chat.create({
                    data: {
                        from: fromUserName,
                        to: toUserName,
                        message,
                        isRead: false,
                        status: MESSAGE_STATUS.DELIVERED,
                    },
                });
                if (!msg) {
                    console.log(`❌ Failed to create message in DB`);
                    socket.emit(SOCKET_EVENTS.MESSAGE_DELIVERED, {
                        status: "fail",
                        msg: "Message could not be sent",
                        chatId,
                    });
                    return;
                }
                socket.emit(SOCKET_EVENTS.MESSAGE_DELIVERED, { status: "ok", msg, chatId });
                console.log("msg:", msg);
                io.to(targetSocketId).emit("private_message", msg);
                socket.emit(SOCKET_EVENTS.MESSAGE_READ, { status: "ok", msg });
                await client.chat.update({
                    where: {
                        chatId: msg.chatId,
                    },
                    data: {
                        status: MESSAGE_STATUS.READ,
                        isRead: true,
                    },
                });
                console.log(`📤 Sent message to ${toUserName}`);
            } else {
                const msg = await client.chat.create({
                    data: {
                        from: fromUserName,
                        to: toUserName,
                        message,
                        isRead: false,
                        status: MESSAGE_STATUS.DELIVERED,
                    },
                });
                if (!msg) {
                    console.log(`❌ Failed to create message in DB`);
                    socket.emit(SOCKET_EVENTS.MESSAGE_DELIVERED, {
                        status: "fail",
                        msg: "Message could not be sent",
                        chatId,
                    });
                    return;
                }
                console.log(`❌ User ${toUserName} not connected, so message is not seen yet.`);
                socket.emit(SOCKET_EVENTS.MESSAGE_DELIVERED, { status: "ok", msg, chatId });
            }
        });

        socket.on(SOCKET_EVENTS.UPDATE_MESSAGE_STATUS, async (messageArr) => {
            console.log("messageArr", messageArr);
            for (const message of messageArr) {
                const updatedMsg = await client.chat.update({
                    where: {
                        chatId: message.chatId,
                    },
                    data: {
                        status: MESSAGE_STATUS.READ,
                        isRead: true,
                    },
                });
                console.log("updatedMsg", updatedMsg);
                const targetSocketId = userSocketMap.get(message.from);

                if (updatedMsg && targetSocketId)
                    io.to(targetSocketId).emit(SOCKET_EVENTS.UPDATE_MESSAGE_STATUS, message.chatId);
            }
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            for (const [userId, id] of userSocketMap.entries()) {
                if (id === socket.id) {
                    userSocketMap.delete(userId);
                    break;
                }
            }
            console.log(`❌ Disconnected: ${socket.id}`);
        });
    });
};
