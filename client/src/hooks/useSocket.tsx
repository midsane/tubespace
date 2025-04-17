import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "../types/socketEventsType";
import { storeStateType } from "../store/store";
import { useSelector } from "react-redux";
import { ChatEntry } from "../types/chatTypes";

let socketInstance: Socket | null = null

const connectSocket = () => {
    socketInstance = io("http://localhost:3000", {
        autoConnect: false,
    });
}

console.log("usesocket file executed");

export const useSocket = (): Socket | null => {
    console.log("inside use socket")

    const userIdY = useSelector((state: storeStateType) => state.youtuberInfo.user?.username);
    const userIdC = useSelector((state: storeStateType) => state.collaboratorInfo.user?.username);

    const setUpListeners = () => {
        if (!socketInstance?.hasListeners(SOCKET_EVENTS.CONNECT)) {
            socketInstance?.on(SOCKET_EVENTS.CONNECT, () => {
                console.log("Connected to socket server");
                const userId = userIdC || userIdY;
                if (userId) {
                    socketInstance?.emit(SOCKET_EVENTS.REGISTER, userId);
                    console.log("Registered with socket server", userId);
                }

                else {
                    console.log("No userId found");
                    socketInstance?.disconnect();
                }
            })
        }

        if (!socketInstance?.hasListeners(SOCKET_EVENTS.DISCONNECT)) {
            socketInstance?.on(SOCKET_EVENTS.DISCONNECT, () => {
                console.log("Disconnected from socket server");
            })
        }

    }

    useEffect(() => {
        if (!socketInstance) {
            const userId = userIdC || userIdY;
            if (userId)
                connectSocket();
            else
                console.log("No userId found");
        }
        else if (!socketInstance?.connected) {
            setUpListeners();
            socketInstance?.connect();
        }
        return () => {
            socketInstance?.off;
            socketInstance?.disconnect()
        }
    }, [userIdC, userIdY, socketInstance])

    return socketInstance;

}