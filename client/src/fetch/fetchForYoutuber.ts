import { DraftVideosInterface } from "../types/youtuberTypes";
import { BASE_URL } from "./fetch";

export const fetchYoutuberData = async () => {

    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/fetch-home`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();
        console.log(resData)
        return resData
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching youtuber data"
        }

    }
}


export const addDraft = async (data: DraftVideosInterface) => {
    const response = await fetch(`${BASE_URL}/api/v1/youtuber/fetch-home`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resData = await response.json();
    console.log(resData)
    return resData

}