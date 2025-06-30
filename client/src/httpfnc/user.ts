import { baseUrl } from "@/constast";
import type { httpRequstType } from "@/types/types";

const getProfileData = async (username: string) => {
    const response = await fetch(baseUrl + `user/profile?username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
   
    const resData: httpRequstType = await response.json();

    if (!response.ok || response.status >= 300) {
        throw new Error(resData.message || "Failed to fetch profile data");
    };
    return resData.data;
}

const getTopEditors = async () => {
    const response = await fetch(baseUrl + `user/top-editors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
   
    const resData: httpRequstType = await response.json();

    if (!response.ok || response.status >= 300) {
        throw new Error(resData.message || "Failed to fetch profile data");
    };
    return resData.data;
}

export {
    getProfileData,
    getTopEditors
}