import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";
import { ReactNode } from "react";
import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";


export const CardWrapper: React.FC<{ children: ReactNode , extraTStyle: string }> = ({ children, extraTStyle }) => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <div className={`${extraTStyle} ${onLaptopScreen} w-56 h-36 sm:w-72 sm:h-48 flex-shrink-0 flex flex-col px-4 sm:px-9 gap-2 justify-center items-center rounded-xl border relative`} >
            {children}
        </div>
    )
}



export const CreateNewCard: React.FC<{
    extraTStyle: string,
    text1: string,
    text2?: string,
    enableText2: boolean,
    SvgIcon?: ReactNode,
    noButtons?: boolean,
    createFnc: () => void
}> = ({
    extraTStyle,
    text1 = "create new sample video",
    text2 = "add/assign video details",
    enableText2 = true,
    SvgIcon,
    noButtons = false,
    createFnc }) => {


        const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>

                    {!SvgIcon ? <AddCircle sx={{ width: `${!onLaptopScreen ? "2rem" : "2.5rem"}`, height: `${!onLaptopScreen ? "2rem" : "2.5rem"}` }} />
                        :
                        SvgIcon}

                    <div className="flex flex-col gap-0">
                        <p className="text-center">{text1}</p>
                        {enableText2 && <p className="opacity-55 text-sm text-center" >{text2}</p>}
                    </div>
                    {!noButtons && <Button onClick={createFnc}
                        sx={{ fontSize: !onLaptopScreen ? "13px" : "15px", padding: !onLaptopScreen ? "2px 10px" : "" }}
                        variant="contained" color="primary" >Create</Button>}
                </>
            </CardWrapper>
        )
    }