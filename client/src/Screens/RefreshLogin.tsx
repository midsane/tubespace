import { useEffect } from "react";
import { checkLoggedIn } from "../fetch/fetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Squares } from "../components/MidErrorPages/squaresEffect";
import { HamsterLoader } from "../components/loader/hamsterLoading";
import SplitText from "../components/textAnimations/SplitText/SplitText";
import { storeDispatchType, storeStateType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { youtuberActions } from "../store/youtuberStore/youtuber.slice";
import { collaboratorActions } from "../store/collaboratorStore/collaborator.slice";
import { userRoleActions } from "../store/role.slice";
import { userRole } from "../types/youtuberTypes";


export const RefreshLogin = () => {
    const navigate = useNavigate()
    const youtuberInfo = useSelector((state: storeStateType) => state.youtuberInfo)
    const collaboratorInfo = useSelector((state: storeStateType) => state.collaboratorInfo)
    const dispatch: storeDispatchType = useDispatch()


    useEffect(() => {
        const checkStatus = async () => {

            const status = await checkLoggedIn()
            if (status?.data?.success) {
                if (status.data.user?.role === "youtuber" && !youtuberInfo.user) {
                    console.log(status.data.user)
                    dispatch(youtuberActions.setUserInfo({ user: status.data.user }))
                    dispatch(userRoleActions.setRole(userRole.YOUTUBER))
                }

                else if (status.data.user?.role === "collaborator" && !collaboratorInfo.user) {
                    dispatch(collaboratorActions.setUserInfo({ user: status.data.user }))
                    dispatch(userRoleActions.setRole(userRole.COLLABORATOR))
                }


            }
            else {
                toast.error("You are not logged in")
                navigate("/")
            }
        }

        checkStatus()
    }, [])

    return (<div className="w-screen h-screen">
        <Squares />
        <div className="fixed top-1/2 left-1/2 flex gap-6  sm:gap-10  flex-col justify-center items-center -translate-x-1/2 z-[100] -translate-y-1/2 w-full h-full  backdrop-blur-[3px] text-3xl sm:text-6xl text-center text-opacity-65 opacity-100  ">
            <SplitText delay={10} text="Trying to log you in..." />
            <HamsterLoader />
        </div>
    </div>)
}

