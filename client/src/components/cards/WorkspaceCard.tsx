import { Assignment, FactCheck, Pending } from "@mui/icons-material"
import { Avatar, AvatarGroup, Button, Tooltip } from "@mui/material"
import { CardWrapper, CreateNewCard } from "./cardWrapper"
import { taskInterface, TASKSTATUS, workspaceInterface } from "../../types/youtuberTypes"
import { SproutIcon } from "lucide-react"
import { storeDispatchType, storeStateType } from "../../store/store"
import { modalActions } from "../../store/modal"
import { CreateNewSample } from "../modalCompnents/createNewSample"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { createWorkspaceFetch } from "../../fetch/fetchForYoutuber"
import { Frown } from 'lucide-react';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ThreeDotsMenuWrk } from "../menus/basicmenu"
import { youtuberWorkspacesAction } from "../../store/youtuberStore/youtuberWorspaces.slice"


export interface collaboratorsCardInterface extends workspaceInterface {
    extraTStyle: string,
}



export const getTaskCntByType = (tasks: taskInterface[], type: TASKSTATUS) => {
    return tasks.filter(t => t.status === type).length
}

export const CreateNewWorkSpaceCard: React.FC<{ extraTStyle: string }> = ({ extraTStyle }) => {


    const dispatch: storeDispatchType = useDispatch()

    const createWorkspace = async (workspaceName: string) => {
        if (workspaceName?.trim() === "") {
            toast.error("input cannot be empty!");
            return;
        }
        const resData = await createWorkspaceFetch(workspaceName)
        if (resData.success) {
            toast.success(resData.message)
            const newWrk = { ...resData.data, tasks: [], collaborators: [] }
            dispatch(youtuberWorkspacesAction.addWorkspaces(newWrk))
            dispatch(modalActions.closeModal())
        }

        else toast.error(resData.message)

    }

    const createNewSampleFnc = () => {
        dispatch(modalActions.openMoal({
            title: "Create new workspace",
            content: <CreateNewSample fn={createWorkspace} />
        }))
    }

    return (
        <CreateNewCard
            extraTStyle={extraTStyle}
            text1="create new workspace"
            enableText2={false}
            createFnc={createNewSampleFnc}
            SvgIcon={<SproutIcon />}
        />
    )
}



export const WorkSpaceCard: React.FC<collaboratorsCardInterface> =
    ({
        extraTStyle,
        ...restFields

    }) => {
        console.log("restfields")
        console.log(restFields)

        const thirdPerson = useSelector((state: storeStateType) => state.thirdPerson.val)

        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>
                    <div className="absolute top-[-20px] sm:top-[-8px] left-[-8px] flex gap-2 items-end rounded-full">
                        <Avatar sizes="small" src={restFields.workspacePic || "https://photosking.net/wp-content/uploads/2024/05/no-dp-for-whatsapp_60.webp"} />
                        <h6 className="w-full text-xs sm:text-sm flex items-start justify-start" >{restFields.name}</h6>

                    </div>
                    {restFields.collaborators && restFields.collaborators.length === 0 && <div className="flex flex-col justify-center mt-4 items-center text-xs sm:text-sm gap-2 opacity-60" >
                        <Frown />
                        <p>No people in your workspace!</p>
                    </div>}
                    <AvatarGroup max={4}>
                        {restFields.collaborators?.map(c => <Avatar key={c.userId} alt="collaborator1" src={c.user?.profilepic || "https://photosking.net/wp-content/uploads/2024/05/no-dp-for-whatsapp_60.webp"} />)}

                    </AvatarGroup>



                    <div className="w-full  flex justify-between gap-4 ">
                        {!thirdPerson && <Link to={`../Workspaces/${restFields.name}`}><Button size="small" color="primary" variant="outlined" >View</Button></Link>}

                        <div className="w-full h-full  justify-end gap-1 flex items-end">

                            {restFields && restFields.tasks ?
                                <Tooltip title={restFields.tasks.length + " assigned tasks"} >
                                    <Assignment sx={{ color: "rgb(112, 208, 246)" }} />
                                </Tooltip>
                                :
                                <div className="w-5  bg-primary border border-secondaryLight aspect-square rounded skeleton" ></div>
                            }


                            {restFields && restFields.tasks ?
                                <Tooltip title={getTaskCntByType(restFields.tasks, TASKSTATUS.pending) + " pending tasks"} >
                                    <Pending sx={{ color: "rgb(112, 208, 246)" }} />
                                </Tooltip>
                                :
                                <div className="w-5  bg-primary border border-secondaryLight aspect-square rounded skeleton" ></div>
                            }

                            {restFields && restFields.tasks ?
                                <Tooltip title={getTaskCntByType(restFields.tasks, TASKSTATUS.completed) + " completed tasks"} >
                                    <FactCheck sx={{ color: "rgb(112, 208, 246)" }} />
                                </Tooltip>
                                :
                                <div className="w-5 bg-primary border border-secondaryLight aspect-square rounded skeleton" ></div>
                            }
                        </div>
                        {!thirdPerson && <ThreeDotsWrk draftName={restFields.name} _id={restFields.workspaceid} />}
                    </div>
                </>
            </CardWrapper>
        )
    }


const ThreeDotsWrk = ({ _id, draftName }: { _id: number, draftName: string }) => {
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
            <ThreeDotsMenuWrk draftName={draftName} _id={_id} />
        </div>}
    </span>
}

const Dots = () => {
    return (<div className="w-1 aspect-square rounded-full bg-label"></div>)
}