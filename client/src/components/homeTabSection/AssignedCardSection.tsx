import { AssignedTaskCard, TaskStatus } from "../cards/AssignedTaskCard"

export const AssignedCardSection: React.FC = () => {
    return (
        <div className="w-[85%] rounded-3xl flex  justify-start gap-10 py-10 px-9 h-min-10 bg-black border border-white/10 h-[80%] items-center " >

            <AssignedTaskCard
                timesRevised={0}
                deadline="9th Feb 2025"
                taskTitle="Edit the video"
                status={TaskStatus.pending}
                extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-white/10" />
            <AssignedTaskCard
                timesRevised={2}
                deadline="9th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="make an engaging thumbnail"
                extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-white/10" />
            <AssignedTaskCard
                timesRevised={3}
                deadline="8th Feb 2025"
                status={TaskStatus.completed}
                taskTitle="frame catchy title and description"
                extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-white/10" />
        </div>
    )
}