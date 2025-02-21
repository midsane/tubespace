import { Assignment, FactCheck, Pending, WorkspacePremiumSharp } from "@mui/icons-material"
import { Avatar, AvatarGroup, Button, Tooltip } from "@mui/material"
import { CardWrapper } from "./cardWrapper"


interface collaboratorsInterface {
    id: string,
    name: string,
    imgUrl: string,

}

export interface collaboratorsCardInterface {
    extraTStyle: string,
    name: string,
    collaborators: collaboratorsInterface[],
    pendingTasksCnt: number,
    AssignedTasksCnt: number,
    completedTasksCnt: number
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
                        {collaborators.map(c => <Avatar key={c.id} alt="collaborator1" src={c.imgUrl} />)}

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

