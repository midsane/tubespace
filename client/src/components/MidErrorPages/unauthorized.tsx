import { Button } from "@mui/material"
import { SplitText } from "../textAnimations/splitText"
import { Squares } from "./squaresEffect"
import { Link } from "react-router-dom"
import { storeDispatchType, storeStateType } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { modalActions } from "../../store/modal"
import { LoginBox } from "../landingpagecomp/Auth"

export const UnAuthorzedPage = () => {

    const dispatch: storeDispatchType = useDispatch()
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar.onLaptopScreen)

    const handleLogin = () => {
        dispatch(modalActions.openMoal({
            content: <LoginBox />,
            buttons: false,
            submitText: "Login",
            title: "",
        }))
    }

    return <div className="w-screen h-screen">
        <Squares />
        <div className="fixed top-1/2 left-1/2 flex gap-5  flex-col justify-center items-center -translate-x-1/2 z-[100] -translate-y-1/2 w-full h-full p-2 backdrop-blur-[3px] text-4xl sm:text-8xl text-center text-opacity-65 opacity-100  ">

            <SplitText text="UnAuthorized Request" />
            <p className="text-sm sm:text-lg opacity-85" >Login/Register to access this page!</p>
            <div className="flex gap-4 justify-center" >
                <Button  sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "4px 12px" : "" }}  variant="contained" color="secondary"><Link to="/">Home page</Link></Button>
                <Button sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "4px 12px" : "" }}   onClick={handleLogin} variant="contained">Login</Button>
            </div>
        </div>
    </div>
}