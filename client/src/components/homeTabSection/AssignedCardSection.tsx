import { forwardRef } from "react";
import { AssignedTaskCard, TaskStatus } from "../cards/AssignedTaskCard"
import { CardSection,  } from "./cardSection";


export const AssignedCardSection: React.FC = () => {
    return (<CardSection>
        <>
            <AssignedTaskCard
                timesRevised={0}
                deadline="9th Feb 2025"
                taskTitle="Edit the video"
                status={TaskStatus.pending}
                extraTStyle="bg-secondary border-white/10" />
            <AssignedTaskCard
                timesRevised={2}
                deadline="9th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="make an engaging thumbnail"
                extraTStyle="bg-secondary border-white/10" />
            <AssignedTaskCard
                timesRevised={3}
                deadline="8th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="frame catchy title and description"
                extraTStyle="bg-secondary border-white/10" />
            <AssignedTaskCard
                timesRevised={3}
                deadline="8th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="frame catchy title and description"
                extraTStyle="bg-secondary border-white/10" />
        </>
    </CardSection>)
}


export const AssignedCardSectionWrap = forwardRef<HTMLDivElement>((_, ref) => {
    
   
    return (
        <div ref={ref} className={`flex flex-col gap-10 p-10 justify-start items-center  overflow-x-hidden overflow-y-scroll scroll-smooth rounded-2xl border border-secondaryLight h-[90%] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent w-[95%] sm:w-[90%] `}>
            <AssignedTaskCard
                timesRevised={0}
                deadline="9th Feb 2025"
                taskTitle="Edit the video"
                status={TaskStatus.pending}
                extraTStyle="bg-secondary border-white/10" />
            <AssignedTaskCard
                timesRevised={2}
                deadline="9th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="make an engaging thumbnail"
                extraTStyle="bg-secondary border-white/10" />
            <AssignedTaskCard
                timesRevised={3}
                deadline="8th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="frame catchy title and description"
                extraTStyle="bg-secondary border-white/10" />
            <AssignedTaskCard
                timesRevised={3}
                deadline="8th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="frame catchy title and description"
                extraTStyle="bg-secondary border-white/10" />
        </div>
    )
})