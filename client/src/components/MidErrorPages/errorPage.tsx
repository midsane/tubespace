import { Button } from "@mui/material"

import { Squares } from "./squaresEffect"
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"
import { useSelector } from "react-redux"
import { storeStateType } from "../../store/store"
import SplitText from "../textAnimations/SplitText/SplitText"



export const ErrorPage = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar.onLaptopScreen)

    const error = useRouteError();

    let errorMessage = "Something went wrong!";

    if (isRouteErrorResponse(error)) {
        // This means it's an error response from the router
        errorMessage = error.statusText || "Unknown error";
    } else if (error instanceof Error) {
        // Standard JS error
        errorMessage = error.message;
    } else if (typeof error === "string") {
        // If the error is directly a string
        errorMessage = error;
    }

    const goBack = () => {
        window.history.back()
    }

    return <div className="w-screen h-screen">
        <Squares />
        <div className="fixed top-1/2 left-1/2 flex gap-5 flex-col justify-center items-center -translate-x-1/2 z-[100] -translate-y-1/2 w-full h-full p-20 backdrop-blur-[3px] text-4xl sm:text-8xl text-center text-opacity-65 opacity-100  ">

            <SplitText text="Something went wrong!" />
            <p className="text-sm sm:text-lg opacity-85" >{errorMessage}</p>
            <div className="flex gap-4 justify-center" >
                <Button sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "4px 12px" : "" }} onClick={goBack} variant="contained" color="secondary"><Link to="/">Go Back</Link></Button>
                <Button sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "4px 12px" : "" }} variant="contained"><Link to="/" >Home Page</Link></Button>
            </div>
        </div>
    </div>
}