const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socketUrl = import.meta.env.VITE_SOCKET_URL;
const fallback_bannerImg = "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
import fallback_profileImg from "@/assets/pfp.png"
const noPfpImg = "http://localhost:5173/src/assets/pfp.png"
import logo from "/favicon.png"
import googleIcon from "@/assets/google.svg"

export {
    fallback_profileImg,
    socketUrl,
    baseUrl,
    noPfpImg,
    fallback_bannerImg,
    logo,
    googleIcon
}