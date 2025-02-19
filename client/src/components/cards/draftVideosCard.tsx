import { AddCircle, Description, Done, Movie, Panorama, Pending, Title, Videocam } from "@mui/icons-material"
import { Button, Input, Tooltip } from "@mui/material"
import { CircularProgressBar } from "../ui/circularprogressbar"
import { useEffect, useState } from "react"
import { storeDispatchType } from "../../store/store"
import { useDispatch } from "react-redux"

import { modalActions } from "../../store/modal"
import { ThreeDotsMenu } from "../menus/basicmenu"
import { CreateNewSample } from "../modalCompnents/createNewSample"


const LOGO1SIZE = 18
const LOGO2SIZE = 10

interface collaboratorsCardInterface {
    extraTStyle: string,
    DraftName: string,
    _id: string
}

export const CreateNewVideoCard: React.FC<{ extraTStyle: string, }> = ({ extraTStyle }) => {

    const dispatch: storeDispatchType = useDispatch()
    const createNewSample = () => {
        dispatch(modalActions.openMoal({
            title: "Create new Sample",
            content: <CreateNewSample />
        }))
    }

    return (
        <div className={`${extraTStyle} flex-shrink-0 w-72 h-48 flex flex-col px-10 gap-2 justify-center items-center rounded-xl border relative`} >
            <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400 ">
                <AddCircle />

            </div>
            <AddCircle />

            <div className="flex flex-col gap-0">
                <p className="text-center">create new sample video</p>
                <p className="opacity-55 text-sm text-center" >add/assign video details</p>
            </div>

            <Button onClick={createNewSample} variant="outlined" >
                Create
            </Button>

        </div>
    )
}

export const DraftVideosCard: React.FC<collaboratorsCardInterface> =
    ({
        extraTStyle,
        DraftName,
        _id

    }) => {
        return (
            <div className={`${extraTStyle} flex-shrink-0 w-72 h-48 flex flex-col px-10 gap-2 justify-center items-center rounded-xl border relative`} >
                <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                    <Videocam />
                </div>

                <h6 className="w-full py-4 h-1/3 flex items-start justify-start" >{DraftName}</h6>
                <div className="flex gap-1 justify-around w-full pb-4  items-center">
                    <CircularProgressBar
                        progress={66.6}
                        size={80}
                        strokeWidth={5}
                        gradientStart="rgb(112, 208, 246) "
                        gradientEnd="rgb(52, 163, 207)"
                        backgroundColor="rgb(98, 106, 108)"
                        textColor="rgb(112, 208, 246)"
                    />

                    <div className="w-full h-full justify-between items-start gap-2 flex flex-col ">
                        <Tooltip title={"Video: pending"} >
                            <div className="flex gap-0">
                                <Movie sx={{ fontSize: LOGO1SIZE, color: "rgb(243, 238, 238)" }} />
                                <Pending sx={{ fontSize: LOGO2SIZE, color: "rgb(217, 81, 81)" }} />
                            </div>
                        </Tooltip>

                        <Tooltip title={"thumbnail: completed"} >
                            <div className="flex gap-0 ml-4">
                                <Panorama sx={{ fontSize: LOGO1SIZE, color: "rgb(112, 208, 246)" }} />
                                <Done sx={{ fontSize: LOGO2SIZE, color: "rgb(75, 218, 75)," }} />
                            </div>
                        </Tooltip>

                        <Tooltip title={"description: completed"} >
                            <div className="flex gap-0 ml-4">
                                <Description sx={{ fontSize: LOGO1SIZE, color: "rgb(112, 208, 246)" }} />
                                <Done sx={{ fontSize: LOGO2SIZE, color: "rgb(70, 217, 70)," }} />
                            </div>
                        </Tooltip>


                        <Tooltip title={"title: completed"} >
                            <div className="flex gap-0">
                                <Title sx={{ fontSize: LOGO1SIZE, color: "rgb(112, 208, 246)" }} />
                                <Done sx={{ fontSize: LOGO2SIZE, color: "rgb(70, 217, 70)," }} />
                            </div>
                        </Tooltip>
                    </div>
                    <ThreeDots draftName={DraftName} _id={_id} />
                    <Button variant="outlined" sx={{ height: "2rem" }} >View</Button>
                </div>
            </div>
        )
    }



export const ThreeDots = ({ _id, draftName }: { _id: string, draftName: string }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const ref = document.getElementById('create-screen-three-dots-menu');
            if (ref && ref.contains(event.target as Node)) {
                return;
            }
            if (showMenu) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return <span
        onClick={() => setShowMenu(prev => !prev)}
        className="flex flex-col gap-1 cursor-pointer absolute top-5 right-5 hover:bg-secondaryLight p-2 rounded-2xl">
        <Dots />
        <Dots />
        <Dots />
        {showMenu && <div id="create-screen-three-dots-menu" className="absolute z-20 top-[110%] right-0">
            <ThreeDotsMenu draftName={draftName} _id={_id} />
        </div>}
    </span>
}

const Dots = () => {
    return (<div className="w-1 aspect-square rounded-full bg-label"></div>)
}