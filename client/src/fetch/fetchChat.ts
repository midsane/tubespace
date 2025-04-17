export const BASE_URL = import.meta.env.VITE_BACKEND_URL


export const fetchPersonList = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/chat/getChatPersonList`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const resData = await response.json();
    return resData;
}


export const addPersonToChatList = async (otherUserId: number) => {
    const response = await fetch(`${BASE_URL}/api/v1/chat/addPersonToChatList`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otherUserId }),
    });
    const resData = await response.json();
    return resData;
}


export const fetchMsgOfUser = async (otherUserName: string) => {
    const response = await fetch(`${BASE_URL}/api/v1/chat/fetchMsgOfUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otherUserName }),
    });
    const resData = await response.json();
    return resData;
}


export const editMsg = async (chatId: number,
    message: string,
    isRead: boolean) => {
    const response = await fetch(`${BASE_URL}/api/v1/chat/editMsg`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ chatId, message, isRead }),
    });
    const resData = await response.json();
    return resData;
}

export const deleteMsg = async (chatId: number) => {
    const response = await fetch(`${BASE_URL}/api/v1/chat/deleteMsg`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ chatId }),
    });
    const resData = await response.json();
    return resData;
}