import { RateReview, Schedule } from "@mui/icons-material"
import { Avatar, Button, Chip, Divider, Tooltip } from "@mui/material"

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
            <div className={`${extraTStyle} flex flex-col px-10 gap-2 justify-center items-center rounded-xl border relative`} >
                <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                    <Avatar
                        alt="collaborator1-img"
                        src="https://mui.com/static/images/avatar/2.jpg" />
                </div>
                <h6 className="w-full py-4 h-1/4" >{taskTitle}</h6>

                <div className="w-full h-1/3  justify-between flex items-center">
                    {status === TaskStatus.pending && <Button size="small" color="secondary" variant="contained" >Chat</Button>}
                    {status === TaskStatus.completed && <Button size="small" color="success" variant="contained" >View it</Button>}

                    <Tooltip title={timesRevised + " revisions"} >
                        <RateReview sx={{ color: "rgb(112, 208, 246)"}} />
                    </Tooltip>
                </div>

                {status === TaskStatus.completed ?

                    <div className="w-full h-1/4 flex flex-col justify-between items-center">
                        <Seperator
                            chipColor="success"
                            extraStyle="bg-red-300"
                            label="completed" />
                        <div className="w-full flex justify-start gap-4 text-orange-300">
                            <Tooltip title="deadline" >
                                <Schedule />
                            </Tooltip>

                            <p className="opacity-85 text-sm flex justify-end h-full items-end">{deadline}</p>
                        </div>

                    </div> :

                    <div className="w-full h-1/4 flex flex-col justify-between items-center">
                        <Seperator
                            chipColor="secondary"
                            extraStyle="bg-red-300"
                            label="pending" />
                        <div className="w-full flex justify-start gap-4 text-orange-300"> 
                            <Tooltip title="deadline" >
                                <Schedule  />
                            </Tooltip>
                       
                            <p className="opacity-85 text-sm flex justify-end h-full items-end">{deadline}</p>
                        </div>
                         
                    </div>
                }


            </div>
        )
    }


const Seperator: React.FC<{ extraStyle: string, label: string, chipColor: string }> = ({ extraStyle, label, chipColor }) => {
    return <div className={`relative h-[1px] w-full ${extraStyle}`} >
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
            <Chip label={label} size="small" color={chipColor} />
        </div>
    </div>
}

