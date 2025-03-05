import { Assignment, FactCheck, Pending, WorkspacePremiumSharp } from "@mui/icons-material"
import { Avatar, AvatarGroup, Button, Tooltip } from "@mui/material"
import { CardWrapper, CreateNewCard } from "./cardWrapper"
import { collaboratorInterface } from "../../types/youtuberTypes"
import { SproutIcon } from "lucide-react"


export interface collaboratorsCardInterface {
    extraTStyle: string,
    name: string,
    collaborators: collaboratorInterface[],
    pendingTasksCnt: number,
    AssignedTasksCnt: number,
    completedTasksCnt: number
}


export const CreateNewWorkSpaceCard: React.FC<{ extraTStyle: string }> = ({ extraTStyle }) => {

    // const dispatch: storeDispatchType = useDispatch()
    // const createNewSampleFnc = () => {
    //     dispatch(modalActions.openMoal({
    //         title: "Create new Sample",
    //         content: <CreateNewSample />
    //     }))
    // }

    return (
        <CreateNewCard
            extraTStyle={extraTStyle}
            text1="create new workspace"
            enableText2={false}
            createFnc={() => { }}
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
        collaborators

    }) => {
        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>
                    <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                        <WorkspacePremiumSharp />
                    </div>
                    <AvatarGroup max={4}>
                        {collaborators.map(c => <Avatar key={c.userId} alt="collaborator1" src={c.user?.profilepic || "https://photosking.net/wp-content/uploads/2024/05/no-dp-for-whatsapp_60.webp"} />)}

                    </AvatarGroup>
                    <h6 className="w-full py-4 h-1/3 flex items-start justify-start" >{name}</h6>



                    <div className="w-full  flex justify-between gap-4 ">
                        <Button size="small" color="primary" variant="outlined" >Enter</Button>

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

