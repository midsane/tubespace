import { redirect } from "react-router-dom";

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
    const response = await fetch(`${BASE_URL}/api/v1/auth/check-loggedInStatus`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resData = await response.json();

    return resData;
}



export const checkAuthentication = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/check-loggedInStatus`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resData = await response.json();
    if (resData && resData.success) return null
    else {

        throw redirect("/unauthorized")
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