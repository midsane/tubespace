import { BASE_URL } from "./fetch";

interface responseData {
    success: boolean,
    message: string,
    data: any
}

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


export const addDraft = async (draftName: string, workspaceId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/add-draft`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                DraftTitle: draftName,
                workspaceId
            })
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {

        return {
            success: false,
            data: null,
            message: error.message || "An error occured while adding draft"
        }
    }

}

export const createWorkspaceFetch = async (workspaceName: string) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/create-workspace`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: workspaceName })
        });
        const resData: responseData = await response.json();

        return resData
    } catch (error: any) {
        console.log(error)
        const resData: responseData = {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching youtuber data"
        }
        return resData
    }
}

