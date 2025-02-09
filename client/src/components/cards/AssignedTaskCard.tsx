import { RateReview, Schedule } from "@mui/icons-material"
import { Avatar, Button, Chip, Tooltip } from "@mui/material"

export enum TaskStatus {
    "pending",
    "completed"
}


interface AssignedCardInterface {
    extraTStyle: string,
    taskTitle: string,
    status: TaskStatus,
    timesRevised: number,
    deadline: string
}

export const AssignedTaskCard: React.FC<AssignedCardInterface> =
    ({
        extraTStyle,
        taskTitle,
        status,
        timesRevised,
        deadline,

    }) => {
        return (
            <div className={`${extraTStyle} min-w-72 flex flex-col px-9  gap-2 justify-center items-center rounded-xl border relative`} >
                <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                    <Avatar
                        alt="collaborator1-img"
                        src="https://mui.com/static/images/avatar/2.jpg" />
                </div>
                <h6 className="w-full py-2 h-1/4" >{taskTitle}</h6>

                <div className="w-full h-1/3 justify-between flex items-center">
                    {status === TaskStatus.pending && <Button size="small" color="primary" variant="outlined" >Chat</Button>}
                    {status === TaskStatus.completed && <Button size="small" color="secondary" variant="outlined" >View it</Button>}

                    <Tooltip title={timesRevised + " revisions"} >
                        <RateReview sx={{ color: "rgb(112, 208, 246)" }} />
                    </Tooltip>
                </div>

                {status === TaskStatus.completed ?

                    <div className="w-full h-1/4 flex flex-col justify-between items-center">
                        <Seperator
                            chipColor="secondary"
                            extraStyle="bg-secondaryLight"
                            label="completed" />
                        <div className="w-full flex justify-start gap-4 mb-1">
                            <Tooltip title="deadline" >
                                <Schedule sx={{ opacity: "0.5" }} />
                            </Tooltip>

                            <p className="opacity-55 text-sm flex justify-end h-full items-center">{deadline}</p>
                            <Chip label="completed" color="success" variant="outlined" />
                        </div>

                    </div> :

                    <div className="w-full h-1/4 flex flex-col justify-between items-center">
                        <Seperator
                            chipColor="primary"
                            extraStyle="bg-secondaryLight"
                            label="pending" />
                        <div className="w-full flex justify-start gap-4 mb-1">
                            <Tooltip title="deadline" >
                                <Schedule sx={{ opacity: "0.5" }} />
                            </Tooltip>

                            <p className="opacity-55 text-sm flex justify-end h-full items-center">{deadline}</p>
                            <Chip label="pending" color="primary" variant="outlined" />

                        </div>

                    </div>
                }


            </div>
        )
    }


const Seperator: React.FC<{ extraStyle: string, label: string, chipColor: string }> = ({ extraStyle, label, chipColor }) => {
    return <div className={`h-[1px] w-full ${extraStyle}`} >
    </div>
}

