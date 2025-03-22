export const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const registerYoutuber = async (data: any) => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/register-youtuber`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
}

export const registerCollaborator = async (data: any) => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/register-collaborator`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
}

export const loginYoutuber = async (data: any) => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/login-youtuber`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
}

export const loginCollaborator = async (data: any) => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/login-collaborator`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
}

export const checkLoggedIn = async () => {

    try {
        console.log("hitting api")
        const response = await fetch(`${BASE_URL}/api/v1/auth/check-loggedInStatus`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData = await response.json();

        return resData;
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message || "An error occured while checking logged in status"
        }

    }
}

export const logoutUser = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resData = await response.json();
    return resData;
}