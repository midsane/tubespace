import { RateReview, Schedule } from "@mui/icons-material"
import { Avatar, Button, Chip, Tooltip } from "@mui/material"
import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";
import { CardWrapper } from "./cardWrapper";
import { TASKSTATUS } from "../../types/youtuberTypes";
import { CloudIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"


const formatDeadline = (deadline: Date) => {
    const date = new Date(deadline);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
}

interface AssignedCardInterface {
    extraTStyle: string,
    taskTitle: string,
    status: TASKSTATUS,
    timesRevised: number,
    deadline: Date
}


export const NoAssignedTasks = () => {
    const onlaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (<motion.div
        initial={{ y: "10%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "10%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className=" w-full h-36 sm:h-48 flex-shrink-0 flex flex-col px-4 sm:px-9 gap-2 justify-center items-center" >
        <CloudIcon size={onlaptopScreen ? 50 : 30} />
        <p className="text-center">No tasks assigned</p>
    </motion.div>)

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
            <CardWrapper extraTStyle={extraTStyle}>
                <>
                    <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                        <Avatar
                            sx={{ width: `${!onLaptopScreen ? "2rem" : "2.5rem"}`, height: `${!onLaptopScreen ? "2rem" : "2.5rem"}` }}
                            alt="collaborator1-img"
                            src="https://mui.com/static/images/avatar/2.jpg" />
                    </div>
                    <h6 className="w-full sm:pl-0 pl-6 py-2 h-1/4" >{taskTitle}</h6>

                    <div className="w-full h-1/3 justify-between flex items-center">
                        {status === TASKSTATUS.pending && <Button size="small" color="primary" variant="outlined" >Chat</Button>}
                        {status === TASKSTATUS.completed && <Button

                            size="small" color="secondary" variant="outlined" >View it</Button>}

                        <Tooltip title={timesRevised + " revisions"} >
                            <RateReview sx={{ color: "rgb(112, 208, 246)" }} />
                        </Tooltip>
                    </div>

                    {status === TASKSTATUS.completed ?

                        <div className="w-full h-1/4 flex flex-col justify-between items-center">
                            <Seperator
                                extraStyle="bg-secondaryLight"
                            />
                            <div className="w-full flex  items-center justify-start gap-4 mb-1">
                                <Tooltip title="deadline" >
                                    <Schedule fontSize="small" sx={{ opacity: "0.5" }} />
                                </Tooltip>

                                <p className="opacity-55 flex justify-end h-full text-xs sm:text-smitems-center">{formatDeadline(deadline)}</p>
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

                                <p className="opacity-55 text-xs sm:text-sm flex justify-end h-full items-center">{formatDeadline(deadline)}</p>
                                <Chip label="pending" size="small" color="primary" variant="outlined" />

                            </div>

                        </div>
                    }
                </>
            </CardWrapper>
        )
    }

export const AssignedTaskCardCol: React.FC<AssignedCardInterface> =
    ({
        extraTStyle,
        taskTitle,
        status,
        timesRevised,
        deadline,

    }) => {

        const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
        return (
            <CardWrapper extraTStyle={extraTStyle}>
                <>
                    <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                        <Avatar
                            sx={{ width: `${!onLaptopScreen ? "2rem" : "2.5rem"}`, height: `${!onLaptopScreen ? "2rem" : "2.5rem"}` }}
                            alt="collaborator1-img"
                            src="https://mui.com/static/images/avatar/2.jpg" />
                    </div>
                    <h1 className="w-full sm:text-lg border-b opacity-90 border-secondaryLight  sm:pl-2 pl-6 pt-2">midsane's Workspaces</h1>
                    <h6 className="w-full opacity-75 sm:pl-2 pl-6 pb-2" >{taskTitle}</h6>

                    <div className="w-full h-1/3 justify-between flex items-center">
                        {status === TASKSTATUS.pending && <Button size="small" color="primary" variant="outlined" >Chat</Button>}
                        {status === TASKSTATUS.completed && <Button size="small" color="secondary" variant="outlined" >View it</Button>}

                        <Tooltip title={timesRevised + " revisions"} >
                            <RateReview sx={{ color: "rgb(112, 208, 246)" }} />
                        </Tooltip>
                    </div>

                    {status === TASKSTATUS.completed ?

                        <div className="w-full h-1/4 flex flex-col justify-between items-center">
                            <Seperator
                                extraStyle="bg-secondaryLight"
                            />
                            <div className="w-full flex  items-center justify-start gap-4 mb-1">
                                <Tooltip title="deadline" >
                                    <Schedule fontSize="small" sx={{ opacity: "0.5" }} />
                                </Tooltip>

                                <p className="opacity-55 flex justify-end h-full text-xs sm:text-smitems-center">{formatDeadline(deadline)}</p>
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

                                <p className="opacity-55 text-xs sm:text-sm flex justify-end h-full items-center">{formatDeadline(deadline)}</p>
                                <Chip label="pending" size="small" color="primary" variant="outlined" />

                            </div>

                        </div>
                    }
                </>
            </CardWrapper>
        )
    }


const Seperator: React.FC<{ extraStyle: string }> = ({ extraStyle }) => {
    return <div className={`h-[1px] w-full ${extraStyle}`} >
    </div>
}

