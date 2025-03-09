import { CreateNewVideoCard, DraftVideosCard } from "../cards/draftVideosCard"
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatchType, storeStateType } from "../../store/store";
import { CardSection } from "./cardSection";
import { AnimatePresence, motion } from "framer-motion";
import { CircleXIcon, MenuIcon } from "lucide-react";

import { DraftVideosInterface } from "../../types/youtuberTypes";
import { youtuberDraftActions } from "../../store/youtuberStore/youtuberDraftVideos.slice";
import { useFetch } from "../../hooks/fetchHooks";
import { fetchDraftVideos } from "../../fetch/fetchForYoutuber";
import toast from "react-hot-toast";
import { CardWrapper } from "../cards/cardWrapper";
import SplitText from "../textAnimations/SplitText/SplitText";



export const DraftVideosCardSection: React.FC = () => {
    const DraftArr = useSelector((state: storeStateType) => state.youtuberDraft);
    return (<CardSection>
        <>
            <CreateNewVideoCard
                extraTStyle="bg-secondary border-white/10 hover:opacity-100 opacity-70 duration-75 ease-linear "
            />
            {DraftArr && DraftArr.map(draft => <DraftVideosCard {
                ...draft}
                extraTStyle="cursor-pointer hover:opacity-100 opacity-70 bg-secondary border-white/10 duration-75 ease-linear "
                key={draft.draftVideoId} />)}
        </>
    </CardSection>)
}

export const DraftVideosCardSection2: React.FC = () => {
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const youtuberDraftData = useSelector((state: storeStateType) => state.youtuberDraft);
    const sideBarState = useSelector((state: storeStateType) => state.sidebar);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch: storeDispatchType = useDispatch();

    const { data: DraftArr, error, loading } = useFetch<DraftVideosInterface[]>(fetchDraftVideos)
    console.log(DraftArr)
    useEffect(() => {
        if (youtuberDraftData) {
            dispatch(youtuberDraftActions.setDraft(youtuberDraftData))
        }
    }, [youtuberDraftData])

    if (error) {
        toast.error(error)
    }

    const handleTopSide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop -= 330;
        }
    };

    const handleBottomSide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop += 330;
        }
    };

    return (
        <>
            {sideBarState.onLaptopScreen ? (
                <div className="h-[90%] w-[30%] relative">
                    <div
                        ref={scrollDivRef}
                        className="flex flex-col pl-14 overflow-y-scroll scroll-smooth bg-secondary gap-6 h-full py-10 rounded-l-3xl justify-start items-center w-full "
                    >
                        <div
                            onClick={handleTopSide}
                            className="absolute bottom-1/2 left-2 translate-y-[-50%] border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 "
                        >
                            <KeyboardArrowUp />
                        </div>
                        <div
                            onClick={handleBottomSide}
                            className="absolute top-1/2 left-2 translate-y-1/2 cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear"
                        >
                            <KeyboardArrowDown />
                        </div>
                        <CreateNewVideoCard extraTStyle="cursor-pointer hover:opacity-100  opacity-70 bg-secondary border-white/10 duration-75 ease-linear " />
                        {loading && <CardWrapper extraTStyle="bg-secondary border-secondaryLight skeleton" >
                            <div className="skeleton rounded " ></div>
                        </CardWrapper>}
                        {DraftArr &&
                            DraftArr.map((draft) => (
                                <DraftVideosCard
                                    {...draft}
                                    extraTStyle="cursor-pointer hover:opacity-100 opacity-90 bg-secondary border-secondaryLight  duration-75 ease-linear "
                                    key={draft.draftVideoId}
                                />
                            ))}
                    </div>
                </div>
            ) : (
                <>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className="h-[100dvh] w-screen fixed top-0 left-0 z-[100]"
                            >
                                <CircleXIcon
                                    className="fixed z-50 top-4 right-8 cursor-pointer active:scale-90 ease-linear duration-75"
                                    onClick={() => setIsOpen(false)}
                                />

                                <div
                                    ref={scrollDivRef}
                                    className="flex flex-col pl-14 overflow-y-scroll scroll-smooth bg-secondary gap-6 h-full py-10 pt-2 rounded-l-3xl justify-start items-center w-full "
                                >
                                    <p>{"--------------------"}</p>
                                    <SplitText text="All Draft Videos" />
                                    <div
                                        onClick={handleTopSide}
                                        className="absolute bottom-1/2 left-2 translate-y-[-50%] border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 "
                                    >
                                        <KeyboardArrowUp />
                                    </div>
                                    <div
                                        onClick={handleBottomSide}
                                        className="absolute top-1/2 left-2 translate-y-1/2 cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear"
                                    >
                                        <KeyboardArrowDown />
                                    </div>
                                    <CreateNewVideoCard extraTStyle="cursor-pointer hover:opacity-100 opacity-90 bg-secondary border-white/10 duration-75 ease-linear " />
                                    {DraftArr &&
                                        DraftArr.map((draft) => (
                                            <DraftVideosCard
                                                {...draft}
                                                extraTStyle="cursor-pointer hover:opacity-100 opacity-70 bg-secondary border-white/10 duration-75 ease-linear "
                                                key={draft.draftVideoId}
                                            />
                                        ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!isOpen && (
                        <div>
                            <MenuIcon
                                className="fixed top-4 right-4 z-[80] cursor-pointer active:scale-90 ease-linear duration-75"
                                onClick={() => setIsOpen(true)}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

interface propInterface {
    workspaceName: string | undefined,
    workspaceId: number | undefined,
}

export const DraftVideosCardSectionWrap = forwardRef<HTMLDivElement, propInterface>(({ workspaceName, workspaceId }, ref) => {
    console.log(workspaceId, workspaceName)
    const DraftArr = useSelector((state: storeStateType) => state.youtuberDraft);
    return (
        <div ref={ref} className={`flex flex-col gap-10 p-10 justify-start items-center  overflow-x-hidden overflow-y-scroll rounded-2xl scroll-smooth border border-secondaryLight h-[90%] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent  w-[95%] sm:w-[90%] `}>
            <CreateNewVideoCard
                extraTStyle="bg-secondary border-secondaryLight hover:opacity-100 opacity-90 duration-75 ease-linear "
            />
            {DraftArr && DraftArr.map(draft => <DraftVideosCard {
                ...draft}
                extraTStyle="cursor-pointer hover:opacity-100 opacity-70 bg-secondary border-white/10 duration-75 ease-linear "
                key={draft.draftVideoId} />)}
        </div>
    )
})