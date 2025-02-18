import { CreateNewVideoCard, DraftVideosCard } from "../cards/draftVideosCard"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, { useRef } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";


export const DraftVideosCardSection: React.FC = () => {
    const DraftArr = useSelector((state: storeStateType) => state.draft);
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
                extraTStyle="bg-secondary border-white/10 hover:opacity-100 opacity-70 duration-75 ease-linear "
            />
            {DraftArr.map(draft => <DraftVideosCard {
                ...draft}
                extraTStyle="cursor-pointer hover:opacity-100 opacity-70 bg-secondary border-white/10 duration-75 ease-linear "
                key={draft._id} />)}

        </div>
    )
}

export const DraftVideosCardSection2: React.FC = () => {
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const DraftArr = useSelector((state: storeStateType) => state.draft);
    

    const handleTopSide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop -= 330;
        }
    }

    const handleBottomSide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop += 330;
        }
    }
    return (<div className="h-[90%] w-[30%] relative">
        <div ref={scrollDivRef} className="flex flex-col pl-14 overflow-y-scroll scroll-smooth bg-secondary gap-6 h-full py-10 rounded-l-3xl  justify-start items-center w-full ">

            <div onClick={handleTopSide} className="absolute bottom-1/2 left-2 translate-y-[-50%] border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                <KeyboardArrowUp />
            </div>
            <div onClick={handleBottomSide} className="absolute top-1/2 left-2 translate-y-1/2 cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                <KeyboardArrowDown />
            </div>
            <CreateNewVideoCard
                extraTStyle="cursor-pointer hover:opacity-100  opacity-70 bg-secondary border-white/10 duration-75 ease-linear "
            />
            {DraftArr.map(draft => <DraftVideosCard
                {...draft}
                extraTStyle="cursor-pointer hover:opacity-100 opacity-70 bg-secondary border-white/10 duration-75 ease-linear "
                key={draft._id} />)}

        </div>
    </div>)
}

