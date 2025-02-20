import { RateReview, Schedule } from "@mui/icons-material"
import { Avatar, Button, Chip, Tooltip } from "@mui/material"
import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";

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

        const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
        return (
            <div className={`${extraTStyle} w-56 h-36 sm:w-72 sm:h-48 flex-shrink-0 flex flex-col px-2 sm:px-9 gap-2 justify-center items-center rounded-xl border relative`} >
                <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                    <Avatar
                        sx={{ width: `${!onLaptopScreen ? "2rem" : "2.5rem"}`, height: `${!onLaptopScreen ? "2rem" : "2.5rem"}` }}
                        alt="collaborator1-img"
                        src="https://mui.com/static/images/avatar/2.jpg" />
                </div>
                <h6 className="w-full sm:pl-0 pl-6 py-2 h-1/4" >{taskTitle}</h6>

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
                            extraStyle="bg-secondaryLight"
                        />
                        <div className="w-full flex  items-center justify-start gap-4 mb-1">
                            <Tooltip title="deadline" >
                                <Schedule fontSize="small" sx={{ opacity: "0.5" }} />
                            </Tooltip>

                            <p className="opacity-55 flex justify-end h-full text-xs sm:text-smitems-center">{deadline}</p>
                            <Chip size="small" label="completed" color="success" variant="outlined" />
                        </div>

                    </div> :

                    <div className="w-full h-1/4 flex flex-col justify-between items-center">
                        <Seperator
                            extraStyle="bg-secondaryLight"
                        />
                        <div className="w-full flex justify-start items-center gap-4 mb-1">
                            <Tooltip title="deadline" >
                                <Schedule fontSize="small" sx={{ opacity: "0.5" }} />
                            </Tooltip>

                            <p className="opacity-55 text-xs sm:text-sm flex justify-end h-full items-center">{deadline}</p>
                            <Chip label="pending" size="small" color="primary" variant="outlined" />

                        </div>

                    </div>
                }


            </div>
        )
    }

const Seperator: React.FC<{ extraStyle: string }> = ({ extraStyle }) => {
    return <div className={`h-[1px] w-full ${extraStyle}`} >
    </div>
}

