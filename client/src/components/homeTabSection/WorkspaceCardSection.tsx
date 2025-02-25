import { useRef, useState } from "react";
import { WorkSpaceCard } from "../cards/WorkspaceCard"
import { CardSection } from "./cardSection";
import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { CircleXIcon, MenuIcon } from "lucide-react";
import { SplitText } from "../textAnimations/splitText";

export const WorkspaceCardSection: React.FC = () => {
    return (<CardSection>
        <>

            <WorkSpaceCard
                name="midsane office"
                pendingTasksCnt={5}
                AssignedTasksCnt={2}
                completedTasksCnt={3}
                collaborators={[
                    {
                        id: "1di",
                        name: "adi",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "2di",
                        name: "abhi",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "3di",
                        name: "lav",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    }
                ]}
                extraTStyle="bg-secondary border-white/10"
            />


            <WorkSpaceCard
                name="midsane office"
                pendingTasksCnt={5}
                AssignedTasksCnt={2}
                completedTasksCnt={3}
                collaborators={[
                    {
                        id: "1di",
                        name: "adi",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "2di",
                        name: "abhi",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "3di",
                        name: "lav",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    }
                ]}
                extraTStyle="bg-secondary border-white/10"
            />
            <WorkSpaceCard
                name="midsane office"
                pendingTasksCnt={5}
                AssignedTasksCnt={2}
                completedTasksCnt={3}
                collaborators={[
                    {
                        id: "1di",
                        name: "adi",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "2di",
                        name: "abhi",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "3di",
                        name: "lav",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    }
                ]}
                extraTStyle="bg-secondary border-white/10"
            />
            <WorkSpaceCard
                name="midsane office"
                pendingTasksCnt={5}
                AssignedTasksCnt={2}
                completedTasksCnt={3}
                collaborators={[
                    {
                        id: "1di",
                        name: "adi",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "2di",
                        name: "abhi",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "3di",
                        name: "lav",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    }
                ]}
                extraTStyle="bg-secondary border-white/10"
            />
        </>
    </CardSection>)
}



export const WorkspaceCardSection2: React.FC = () => {
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
    return (<>
        {sideBarState.onLaptopScreen ?
            <div className="h-[90%] w-[30%] relative">
                <div ref={scrollDivRef} className="flex flex-col pl-14 overflow-y-scroll scroll-smooth bg-secondary gap-6 h-full py-10 rounded-l-3xl  justify-start items-center w-full ">

                    <div onClick={handleTopSide} className="absolute bottom-1/2 left-2 translate-y-[-50%] border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                        <KeyboardArrowUp />
                    </div>
                    <div onClick={handleBottomSide} className="absolute top-1/2 left-2 translate-y-1/2 cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                        <KeyboardArrowDown />
                    </div>

                    <WorkSpaceCard
                        name="midsane office"
                        pendingTasksCnt={5}
                        AssignedTasksCnt={2}
                        completedTasksCnt={3}
                        collaborators={[
                            {
                                id: "1di",
                                name: "adi",
                                imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            },
                            {
                                id: "2di",
                                name: "abhi",
                                imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                            },
                            {
                                id: "3di",
                                name: "lav",
                                imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            },
                            {
                                id: "4di",
                                name: "lav",
                                imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                            },
                            {
                                id: "4di",
                                name: "lav",
                                imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                            }
                        ]}
                        extraTStyle="bg-secondary border-white/10"
                    />
                    <WorkSpaceCard
                        name="midsane office"
                        pendingTasksCnt={5}
                        AssignedTasksCnt={2}
                        completedTasksCnt={3}
                        collaborators={[
                            {
                                id: "1di",
                                name: "adi",
                                imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            },
                            {
                                id: "2di",
                                name: "abhi",
                                imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                            },
                            {
                                id: "3di",
                                name: "lav",
                                imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            },
                            {
                                id: "4di",
                                name: "lav",
                                imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                            },
                            {
                                id: "4di",
                                name: "lav",
                                imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                            }
                        ]}
                        extraTStyle="bg-secondary border-white/10"
                    />
                </div>
            </div> :
            <>
                <AnimatePresence>
                    {isOpen && <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="h-[100dvh] w-screen fixed top-0 left-0 z-[100]">
                        <CircleXIcon className="fixed z-50 top-4 right-8 cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setIsOpen(false)} />



                        <div ref={scrollDivRef} className="flex flex-col pl-14 overflow-y-scroll scroll-smooth bg-secondary gap-6 h-full py-10 pt-2 rounded-l-3xl  justify-start items-center w-full ">
                            <p>{"--------------------"}</p>
                            <SplitText
                                text="All your Workspaces"
                            />
                            <div onClick={handleTopSide} className="absolute bottom-1/2 left-2 translate-y-[-50%] border border-zinc-700 rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                                <KeyboardArrowUp />
                            </div>
                            <div onClick={handleBottomSide} className="absolute top-1/2 left-2 translate-y-1/2 cursor-pointer border-zinc-700 border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                                <KeyboardArrowDown />
                            </div>
                            <WorkSpaceCard
                                name="midsane office"
                                pendingTasksCnt={5}
                                AssignedTasksCnt={2}
                                completedTasksCnt={3}
                                collaborators={[
                                    {
                                        id: "1di",
                                        name: "adi",
                                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                                    },
                                    {
                                        id: "2di",
                                        name: "abhi",
                                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                                    },
                                    {
                                        id: "3di",
                                        name: "lav",
                                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                                    },
                                    {
                                        id: "4di",
                                        name: "lav",
                                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                                    },
                                    {
                                        id: "4di",
                                        name: "lav",
                                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                                    }
                                ]}
                                extraTStyle="bg-secondary border-white/10"
                            />
                        </div>

                    </motion.div>}
                </AnimatePresence>
                {!isOpen &&
                    <div
                    >
                        <MenuIcon className="fixed top-4 right-4 z-[80] cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setIsOpen(true)} />
                    </div>
                }
            </>
        }
    </>)
}
