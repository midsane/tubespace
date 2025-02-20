import { AssignedTaskCard, TaskStatus } from "../cards/AssignedTaskCard"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRef } from "react";


export const AssignedCardSection: React.FC = () => {
    const scrollDivRef = useRef<HTMLDivElement>(null);

    const handleLeftSlide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollLeft -= 330;
        }
    }

    const handleRightSlide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollLeft += 330;
        }
    }
    return (
        <div ref={scrollDivRef} className="w-[90%] sm:w-[85%] overflow-x-scroll scroll-smooth rounded-3xl flex justify-start gap-14 sm:gap-10 sm:py-10 sm:px-9 pb-8 pt-12 px-9 h-min-10 bg-black border border-secondaryLight h-fit sm:h-[80%] items-center" >

            <div onClick={handleRightSlide} className="absolute top-[105%] sm:top-1/2 z-10 right-2 sm:right-10 border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                <KeyboardArrowRightIcon />
            </div>
            <div onClick={handleLeftSlide} className="absolute top-[105%] sm:top-1/2 z-10 left-2 sm:left-10  cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                <KeyboardArrowLeftIcon />
            </div>
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
}