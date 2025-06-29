import { baseUrl } from "@/constast";
import type { httpRequstType, UserRole } from "@/types/types";

const LoginUser = async (email: string, password: string) => {
    const response = await fetch(baseUrl + `user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });

    const resData: httpRequstType = await response.json();
    if (!response.ok || response.status >= 300) {
        throw new Error(resData.message || "Failed to fetch profile data");
    };
    return resData.data;
}

const RegisterUser = async (email: string, password: string, role: UserRole) => {
    const response = await fetch(baseUrl + `user/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role })
    });

    const resData: httpRequstType = await response.json();
    if (!response.ok || response.status >= 300) {
        throw new Error(resData.message || "Failed to fetch profile data");
    };
    return resData.data;
}
export {
    LoginUser,
    RegisterUser
}