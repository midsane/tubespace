import { CreateNewVideoCard, DraftVideosCard } from "../cards/draftVideosCard"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRef } from "react";

export const DraftVideosCardSection: React.FC = () => {
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
        <div
            ref={scrollDivRef}
            className="w-[85%] overflow-x-scroll scroll-smooth scrollbar-hide rounded-3xl flex justify-start gap-10 py-10 px-9  h-min-10 bg-black border border-white/10 h-[80%] items-center " >

            <div onClick={handleRightSlide} className="absolute top-1/2 right-10 border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                <KeyboardArrowRightIcon />
            </div>
            <div onClick={handleLeftSlide} className="absolute top-1/2 left-10  cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                <KeyboardArrowLeftIcon />
            </div>
            <CreateNewVideoCard
                extraTStyle="w-[30%] h-[80%] bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="w-[30%] h-[80%] bg-secondary border-white/10"
            />


            <DraftVideosCard
                title="sample video 1"
                extraTStyle="w-[30%] h-[80%] bg-secondary border-white/10"
            />

        </div>
    )
}