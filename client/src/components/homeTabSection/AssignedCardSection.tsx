import { forwardRef } from "react";
import { AssignedTaskCard, NoAssignedTasks } from "../cards/AssignedTaskCard"
import { CardSection, } from "./cardSection";
import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";
import { taskType } from "../../types/youtuberTypes";
import { CardWrapper } from "../cards/cardWrapper";

const getTaskTitle = (tType: taskType) => {
    switch (tType) {
        case taskType.video:
            return "Edit Video"
        case taskType.thumbnail:
            return "Thumbnail Task"
        case taskType.title:
            return "Title Task"
        case taskType.description:
            return "Description Task"
        default:
            return "Task"
    }
}

export const AssignedCardSection = () => {
    const cardDataArr = useSelector((state: storeStateType) => state.youtuberAssignedTask)

    return (<CardSection>
        <>
            {!cardDataArr && <CardWrapper extraTStyle=" border-secondary skeleton text-transparent" >loading</CardWrapper>}
            {cardDataArr && cardDataArr.length === 0 && <NoAssignedTasks
                extraTStyle=" border-secondaryLight hover:opacity-100 opacity-90 duration-75 ease-linear "
            />}
            {cardDataArr && cardDataArr.map((cardData, index: number) => (
                <AssignedTaskCard
                    key={index}
                    timesRevised={cardData.numberOfRevisions}
                    deadline={cardData.deadline}
                    taskTitle={getTaskTitle(cardData.taskType)}
                    status={cardData.status}
                    extraTStyle="bg-secondary border-secondaryLight" />
            ))}
        </>
    </CardSection>)
}


export const AssignedCardSectionCol: React.FC = () => {
    const cardDataArr = useSelector((state: storeStateType) => state.youtuberAssignedTask)
    return (<CardSection>
        <>
            {!cardDataArr && <CardWrapper extraTStyle=" border-secondary skeleton text-transparent" >loading</CardWrapper>}
            {cardDataArr && cardDataArr.length === 0 && <NoAssignedTasks
                extraTStyle=" border-secondaryLight hover:opacity-100 opacity-90 duration-75 ease-linear "
            />}
            {cardDataArr && cardDataArr.map((cardData: any, index: number) => (
                <AssignedTaskCard
                    key={index}
                    timesRevised={cardData.timesRevised}
                    deadline={cardData.deadline}
                    taskTitle={cardData.taskTitle}
                    status={cardData.status}
                    extraTStyle="bg-secondary border-secondaryLight" />
            ))}
        </>
    </CardSection>)
}

export const AssignedCardSectionWrap = forwardRef<HTMLDivElement>((_, ref) => {

    const cardDataArr = useSelector((state: storeStateType) => state.youtuberAssignedTask)

    return (
        <div ref={ref} className={`flex flex-col gap-10 p-10 justify-start items-center  overflow-x-hidden overflow-y-scroll scroll-smooth rounded-2xl border border-secondaryLight h-[90%] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent w-[95%] sm:w-[90%] `}>
            {cardDataArr && cardDataArr.length === 0 && <NoAssignedTasks
                extraTStyle=" border-secondaryLight hover:opacity-100 opacity-90 duration-75 ease-linear "
            />}

            {!cardDataArr && <CardWrapper extraTStyle=" border-secondary skeleton text-transparent" >loading</CardWrapper>}

            {cardDataArr && cardDataArr.map((cardData: any, index: number) => (
                <AssignedTaskCard
                    key={index}
                    timesRevised={cardData.timesRevised}
                    deadline={cardData.deadline}
                    taskTitle={cardData.taskTitle}
                    status={cardData.status}
                    extraTStyle="bg-secondary border-secondaryLight" />
            ))}
        </div>
    )
})