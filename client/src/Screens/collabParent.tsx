import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RefreshLogin } from "./RefreshLogin";
import { storeStateType } from "../store/store";


export const CollabParent = () => {
    const CUD = useSelector((state: storeStateType) => state.collaboratorInfo).user
    const currentUsername = CUD?.username;
    const userRole = useSelector((state: storeStateType) => state.userRole).role

    if (!currentUsername && !userRole) return <RefreshLogin />
    return <Outlet />
}