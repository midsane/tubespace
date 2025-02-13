import { CreateNewVideoCard, DraftVideosCard } from "../cards/draftVideosCard"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, { useRef } from "react";

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
            className="w-[85%] overflow-x-scroll rounded-3xl flex justify-start gap-10 py-10 px-9  h-min-10 bg-black border border-white/10 h-[80%] items-center " >

            <div onClick={handleRightSlide} className="absolute top-1/2 right-10 border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                <KeyboardArrowRightIcon />
            </div>
            <div onClick={handleLeftSlide} className="absolute top-1/2 left-10  cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                <KeyboardArrowLeftIcon />
            </div>
           
            <CreateNewVideoCard
                extraTStyle="bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="bg-secondary border-white/10"
            />


            <DraftVideosCard
                title="sample video 1"
                extraTStyle="bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="bg-secondary border-white/10"
            />

        </div>
    )
}

export const DraftVideosCardSection2: React.FC = () => {
    return (<>
        <div className="flex flex-col pl-14 overflow-y-scroll gap-6 h-[90%] py-10 rounded-l-3xl bg-secondary justify-start items-center w-[30%]">
            <CreateNewVideoCard
                extraTStyle="cursor-pointer hover:opacity-100 hover:border-accent opacity-80 bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="cursor-pointer hover:opacity-100 hover:border-accent opacity-80 bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="cursor-pointer hover:opacity-100 hover:border-accent opacity-80 bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="cursor-pointer hover:opacity-100 hover:border-accent opacity-80 bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="cursor-pointer hover:opacity-100 hover:border-accent opacity-80 bg-secondary border-white/10"
            />

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="cursor-pointer hover:opacity-100 hover:border-accent opacity-80 bg-secondary border-white/10"
            />
        </div>
    </>)
}