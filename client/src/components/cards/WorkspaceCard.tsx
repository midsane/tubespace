import { Assignment, FactCheck, Pending } from "@mui/icons-material"
import { Avatar, AvatarGroup, Button, Tooltip } from "@mui/material"
import { CardWrapper, CreateNewCard } from "./cardWrapper"
import { collaboratorInterface } from "../../types/youtuberTypes"
import { SproutIcon } from "lucide-react"
import { storeDispatchType } from "../../store/store"
import { modalActions } from "../../store/modal"
import { CreateNewSample } from "../modalCompnents/createNewSample"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { createWorkspaceFetch } from "../../fetch/fetchForYoutuber"
import { Frown } from 'lucide-react';
import { Link } from "react-router-dom"


export interface collaboratorsCardInterface {
    extraTStyle: string,
    name: string,
    collaborators: collaboratorInterface[],
    pendingTasksCnt: number,
    AssignedTasksCnt: number,
    completedTasksCnt: number,
    workspaceImg?: string
}


export const CreateNewWorkSpaceCard: React.FC<{ extraTStyle: string }> = ({ extraTStyle }) => {

    const dispatch: storeDispatchType = useDispatch()

    const createWorkspace = async (workspaceName: string) => {
        if (workspaceName?.trim() === "") {
            toast.error("input cannot be empty!");
            return;
        }
        const resData = await createWorkspaceFetch(workspaceName)
        if (resData.success)
            toast.success(resData.message)
        else toast.error(resData.message)
        dispatch(modalActions.closeModal())
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
        name,
        pendingTasksCnt,
        AssignedTasksCnt,
        completedTasksCnt,
        collaborators,
        workspaceImg

    }) => {
        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>
                    <div className="absolute top-[-20px] sm:top-[-8px] left-[-8px] flex gap-2 items-end rounded-full">
                        <Avatar sizes="small" src={workspaceImg || "https://photosking.net/wp-content/uploads/2024/05/no-dp-for-whatsapp_60.webp"} />
                        <h6 className="w-full text-xs sm:text-sm flex items-start justify-start" >{name}</h6>

                    </div>
                    {collaborators && collaborators.length === 0 && <div className="flex flex-col justify-center mt-4 items-center text-xs sm:text-sm gap-2 opacity-60" >
                        <Frown />
                        <p>No people in your workspace!</p>
                    </div>}
                    <AvatarGroup max={4}>
                        {collaborators.map(c => <Avatar key={c.userId} alt="collaborator1" src={c.user?.profilepic || "https://photosking.net/wp-content/uploads/2024/05/no-dp-for-whatsapp_60.webp"} />)}

                    </AvatarGroup>



                    <div className="w-full  flex justify-between gap-4 ">
                        <Link to={`../${name}/Workspaces`}><Button size="small" color="primary" variant="outlined" >View</Button></Link>

                        <div className="w-full h-full  justify-end gap-1 flex items-end">

                            <Tooltip title={AssignedTasksCnt + " assigned Tasks"} >
                                <Assignment sx={{ color: "rgb(112, 208, 246)" }} />
                            </Tooltip>

                            <Tooltip title={pendingTasksCnt + " pending tasks"} >
                                <Pending sx={{ color: "rgb(112, 208, 246)" }} />
                            </Tooltip>

                            <Tooltip title={completedTasksCnt + " completed tasks"} >
                                <FactCheck sx={{ color: "rgb(112, 208, 246)" }} />
                            </Tooltip>
                        </div>
                    </div>
                </>
            </CardWrapper>
        )
    }

