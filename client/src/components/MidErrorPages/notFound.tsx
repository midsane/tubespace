import { Button } from "@mui/material"
import { Squares } from "./squaresEffect"
import { Link } from "react-router-dom"
import { FuzzyText } from "../textAnimations/fuzzyText"
import { useSelector } from "react-redux"
import { storeStateType } from "../../store/store"


export const NotFoundPage = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar.onLaptopScreen)

    const goBack = () => {
        window.history.back()
    }

    return <div className="w-screen h-screen">
        <Squares />
        <div className="fixed top-1/2 left-1/2 flex gap-6  sm:gap-10  flex-col justify-center items-center -translate-x-1/2 z-[100] -translate-y-1/2 w-full h-full  backdrop-blur-[3px] text-3xl sm:text-8xl text-center text-opacity-65 opacity-100  ">

            <FuzzyText
                fontSize={onLaptopScreen ? "clamp(10rem, 15vw, 20rem)" : "clamp(8rem, 10vw, 15rem)"}
            >
                404
            </FuzzyText>
            <div className="flex gap-4 justify-center " >
                <Button onClick={goBack} variant="contained" sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "4px 12px" : "" }} color="secondary"><Link to="/">Go Back</Link></Button>

                
                <Button sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "4px 12px" : "" }} variant="contained"><Link to="/" >Home Page</Link></Button>
            </div>
        </div>
    </div>
}