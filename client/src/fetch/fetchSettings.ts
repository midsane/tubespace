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

const fetchCollaboratorSettings = async (userName: string) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/collaborator/settingPage`, {
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

const updateCollaboratorSettings = async (updatedCollaboratorSettings: FormData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/collaborator/update-settings`, {
            method: "PUT",
            credentials: "include",
            body: updatedCollaboratorSettings
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
    fetchCollaboratorSettings,
    updateYoutuberSettings,
    updateCollaboratorSettings
}