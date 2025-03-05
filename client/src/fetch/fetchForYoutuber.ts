import { BASE_URL } from "./fetch";

export const fetchYoutuberData = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/youtuber/fetch-home`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resData = await response.json();
    return resData
}
