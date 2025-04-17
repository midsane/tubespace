import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { storeStateType } from "../store/store";
import { useFetch } from "../hooks/fetchHooks";
import { PersonEntry } from "../types/chatTypes";
import { fetchPersonList } from "../fetch/fetchChat";
import toast from "react-hot-toast";


export const ChatParent = () => {
    const { data: chatPersonsList, loading, error } = useFetch<PersonEntry[]>(fetchPersonList)
    const currentUserName = useSelector((state: storeStateType) => state.youtuberInfo.user?.username) || useSelector((state: storeStateType) => state.collaboratorInfo.user?.username)
    const navigate = useNavigate()

    if (chatPersonsList && chatPersonsList.length === 0) {
        toast("No chat persons found, checkout people you can chat with")
        navigate(`/c/${currentUserName}/Youtubers`);
        return;

    }
    if (chatPersonsList) {
        if (chatPersonsList[0])
            navigate(`${chatPersonsList[0].username}`)
        else {
            toast("No chat persons found, checkout people you can chat with")
            navigate(`c/${currentUserName}/Youtubers`);
        }
    }
    if (loading) return <>loading...</>
    return <Outlet />
}