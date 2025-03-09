import { DraftVideosInterface, workspaceInterface } from "../types/youtuberTypes";
import { BASE_URL } from "./fetch";

export interface responseData {
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


export const updatedDraft = async (
    draftVideoId: number,
    updateFields: Partial<DraftVideosInterface>
) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/update-draft`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...updateFields,
                draftVideoId

            })
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {

        return {
            success: false,
            data: null,
            message: error.message || "An error occured while updating draft"
        }
    }

}



export const deleteDraft = async (draftVideoId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/delete-draft`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            draftVideoId
            })
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {

        return {
            success: false,
            data: null,
            message: error.message || "An error occured while deleting draft"
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


export const updateWorkspace = async (
    workspaceId: number,
    updateFields: Partial<workspaceInterface>
) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/update-workspace`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...updateFields,
                workspaceid: workspaceId

            })
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {

        return {
            success: false,
            data: null,
            message: error.message || "An error occured while updating workspace"
        }
    }

}



export const deleteWorkspace = async (workspaceId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/delete-workspace`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            workspaceid: workspaceId
            })
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {

        return {
            success: false,
            data: null,
            message: error.message || "An error occured while deleting workspace"
        }
    }

}

export const fetchRelevantWorkspaces = async (searchQuery?: string) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/fetch-all-workspaces?searchQuery=${searchQuery}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching workspaces"
        }
    }
}
export const fetchDraftVideos = async (searchQuery?: string, workspaceId?: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/fetch-all-draftVideos?searchQuery=${searchQuery}&workspaceid=${workspaceId}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching draft videos"
        }
    }
}

export const fetchAssignedTasks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/youtuber/fetch-all-assigned-tasks`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching assigned tasks"
        }
    }
}