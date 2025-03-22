import { useEffect } from "react";
import { logoutUser } from "../fetch/fetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Squares } from "../components/MidErrorPages/squaresEffect";
import { HamsterLoader } from "../components/loader/hamsterLoading";
import SplitText from "../components/textAnimations/SplitText/SplitText";


export const LogoutPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            const resData = await logoutUser();
            await new Promise((resolve) => setTimeout(resolve, 500))
            if (resData.success) {
                toast.success(resData.message)
                navigate("/")
            }
            else {
                toast.error(resData.message)
                navigate("/")
            }
        }
        logout()

    }, [])
    return (<div className="w-screen h-screen">
        <Squares />
        <div className="fixed top-1/2 left-1/2 flex gap-6  sm:gap-10  flex-col justify-center items-center -translate-x-1/2 z-[100] -translate-y-1/2 w-full h-full  backdrop-blur-[3px] text-3xl sm:text-6xl text-center text-opacity-65 opacity-100  ">
            <SplitText delay={10} text="Logging yout out..." />
            <HamsterLoader />
        </div>
    </div>)
}

