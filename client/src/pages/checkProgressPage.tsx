
import { LoadingTitle } from "@/components/loadingUI/loadingTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { socketUrl } from "@/constast";
import { UploadSocketEvent } from "@/types/socketEventEnums";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

export const CheckProgressPage = () => {
    const { taskId } = useParams();

    const numericTaskId = taskId ? Number(taskId) : undefined;
    console.log("CheckProgressPage taskId:", numericTaskId);
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        const socket = io(socketUrl, {
            withCredentials: true,
        })

        socketRef.current = socket;

        socket.on(UploadSocketEvent.CONNECT, () => {
            console.log("Connected to socket server");
        })

        socket.on(UploadSocketEvent.CONNECT_ERROR, (err) => {
            console.error("websocket connection error:", err)
        })

        socket.on(UploadSocketEvent.UPLOAD_PROGRESS, (data) => {
            console.log("Upload progress:", data);
            // Handle upload progress updates here
        });
        socket.on(UploadSocketEvent.UPLOAD_COMPLETE, (data) => {
            console.log("Upload complete:", data);
            // Handle upload completion here
        });
        socket.on(UploadSocketEvent.UPLOAD_FAILED, (error) => {
            console.error("Upload failed:", error);
            // Handle upload failure here
        });
        socket.on(UploadSocketEvent.THUMBNAIL_UPLOADED, (data) => {
            console.log("Thumbnail uploaded:", data);
            // Handle thumbnail upload success here
        });
        socket.on(UploadSocketEvent.THUMBNAIL_UPLOAD_FAILED, (error) => {
            console.error("Thumbnail upload failed:", error);
            // Handle thumbnail upload failure here
        });

        socket.on(UploadSocketEvent.PUBLISH_VIDEO, (data) => {
            console.log("Video published:", data);
            // Handle video publish success here
        });

        socket.on(UploadSocketEvent.PUBLISH_VIDEO_FAILED, (error) => {
            console.error("Video publish failed:", error);
            // Handle video publish failure here
        });

        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        }


    }, [])

    return (
        <Card className="w-screen h-screen flex items-center justify-center">
            <CardContent className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Check Progress</h1>
                <p className="text-lg text-center opacity-80">You can check the progress of your video upload here.</p>
                {numericTaskId ? (
                    <p className="text-sm text-gray-500">Task ID: {numericTaskId}</p>
                ) : (
                    <p className="text-sm text-red-500">No valid task ID provided.</p>
                )}
                <LoadingTitle />

                <Progress value={12} />
                <p className="text-left w-full text-sm opacity-70" >{"12% completed "}</p>

            </CardContent>
        </Card>
    );
}

