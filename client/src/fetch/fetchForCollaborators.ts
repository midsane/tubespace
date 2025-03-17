import { BASE_URL } from "./fetch";

export const fetchCollaborators = async (searchQuery: string, limit: number, start: number) => {
    console.log("searchquery:" + searchQuery)
    try {
        const response = await fetch(`${BASE_URL}/api/v1/collaborator/fetch-collaborators?searchQuery=${searchQuery}&limit=${limit}&start=${start}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();
        return resData
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching collaborators"
        }

    }
}


export const fetchCollaboratorsShallow = async (searchQuery: string) => {

    try {
        const response = await fetch(`${BASE_URL}/api/v1/collaborator/fetch-collaborators-shallow?searchQuery=${searchQuery}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();

        return resData
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching collaborators"
        }

    }
}

export const fetchCollaboratorData = async (userName: string | null) => {

    try {
        const response = await fetch(`${BASE_URL}/api/v1/collaborator/fetch-home`, {
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
        console.log(error)
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while fetching collaborator data"
        }

    }
}
