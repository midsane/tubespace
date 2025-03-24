import { BASE_URL } from "./fetch";

const fetchYoutuberSettings = async (userName: string) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/settingPage`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName })
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching setting page data"
        }
    }
}

const updateYoutuberSettings = async (updatedYoutuberSettings: FormData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/update-settings`, {
            method: "PUT",
            credentials: "include",
            body: updatedYoutuberSettings
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching setting page data"
        }
    }
}


export {
    fetchYoutuberSettings,
    updateYoutuberSettings
}