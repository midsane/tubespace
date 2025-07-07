import { baseUrl } from "@/constast";
import type { httpRequstType } from "@/types/types";

const fetchTasks = async () => {
    const response = await fetch(baseUrl + `task/fetch-tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const resData: httpRequstType = await response.json();

    if (!response.ok || response.status >= 300) {
        throw new Error(resData.message || "Failed to fetch user's Tasks");
    };
    return resData.data;
}

const getVideoPreviewUrl = async (taskId: number | null | undefined) => {
    if (!taskId) throw new Error("Task ID is invalid or missing");
    const response = await fetch(baseUrl + `task/video-preview/${taskId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const resData: httpRequstType = await response.json();

    if (!response.ok || response.status >= 300) {
        throw new Error(resData.message || "Failed to fetch video preview url");
    };
    return resData.data;
}



export {
    fetchTasks,
    getVideoPreviewUrl
}