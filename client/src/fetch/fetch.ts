const BASE_URL = import.meta.env.VITE_BACKEND_URL
export const registerYoutuber = async (data: any) => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/register-youtuber`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
}


