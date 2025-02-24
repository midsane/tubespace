import { Assignment, FactCheck, Pending, WorkspacePremiumSharp } from "@mui/icons-material"
import { Avatar, Button, Rating, Tooltip } from "@mui/material"
import { CardWrapper } from "./cardWrapper"

interface collaboratorsCardInterface {
    extraTStyle: string,
    id?: string,
    name: string,
    imgUrl: string,
    pendingTasksCnt: number,
    AssignedTasksCnt: number,
    completedTasksCnt: number
}

export const CollaBoratorCard: React.FC<collaboratorsCardInterface> =
    ({
        extraTStyle,
        name,
        pendingTasksCnt,
        AssignedTasksCnt,
        completedTasksCnt,
        imgUrl,

    }) => {
        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>
                    <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                        <WorkspacePremiumSharp />
                    </div>
                    <div className="flex w-full justify-center gap-2 items-center h-fit">
                        <Avatar sx={{ width: 60, height: 60 }} className="border-2 shadow-lg shadow-primary  border-primary" alt="collaborator1" src={imgUrl} />
                        <div className="flex flex-col h-fit gap-1">
                            <h6 className="text-lg sm:text-xl" >{name}</h6>
                            <div className=" flex flex-col">
                                <Rating size="small" name="read-only" value={3} readOnly />
                                <p className="pl-1 opacity-80 text-xs">20 ratings</p>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="w-full flex justify-between gap-4 ">
                        <Button size="small" color="primary" variant="outlined" >Chat</Button>

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

