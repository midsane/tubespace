import { Description, Done, Movie, Panorama, Pending, Title, } from "@mui/icons-material"
import { Button, Tooltip, } from "@mui/material"

import { useEffect, useState } from "react"
import { storeDispatchType } from "../../store/store"
import { useDispatch } from "react-redux"

import { ThreeDotsMenu } from "../menus/basicmenu"

import { CardWrapper, CreateNewCard } from "./cardWrapper"
import { DraftVideosInterface } from "../../types/youtuberTypes"
import { CircularProgressBar } from "../ui/circularprogressbar"
import { modalActions } from "../../store/modal"
import { CreateNewSample } from "../modalCompnents/createNewSample"
import toast from "react-hot-toast"
import { addDraft } from "../../fetch/fetchForYoutuber"



const LOGO1SIZE = 18
const LOGO2SIZE = 10

type extendedDraftVideoType = DraftVideosInterface & { extraTStyle: string }


export const CreateNewVideoCard: React.FC<{ extraTStyle: string }> = ({ extraTStyle }) => {

    const dispatch: storeDispatchType = useDispatch()

    const createDrafts = async (draftName: string, workspaceId: number) => {
        if (draftName?.trim() === "") {
            toast.error("input cannot be empty!");
            return;
        }
        const resData = await addDraft(draftName, workspaceId)
        if (resData.success)
            toast.success(resData.message)
        else toast.error(resData.message)
        dispatch(modalActions.closeModal())
    }

    const createNewSampleFnc = () => {
        dispatch(modalActions.openMoal({
            title: "Create new Sample",
            content: <CreateNewSample type={2} fn={createDrafts} />
        }))
    }

    return (
        <CreateNewCard
            extraTStyle={extraTStyle}
            text1="create new sample video"
            text2="add/assign video details"
            enableText2={true}
            createFnc={createNewSampleFnc}
        />
    )
}



export const DraftVideosCard: React.FC<extendedDraftVideoType> =
    ({
        extraTStyle,
        DraftTitle: DraftName,
        draftVideoId: _id,
        // ...rest
    }) => {

        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>
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
                </>
            </CardWrapper>
        )
    }



export const ThreeDots = ({ _id, draftName }: { _id: number, draftName: string }) => {
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
        className="flex flex-col gap-1 cursor-pointer absolute top-0 right-0 hover:bg-secondaryLight w-fit h-fit p-2 rounded-2xl">
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