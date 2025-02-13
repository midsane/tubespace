import { WorkSpaceCard } from "../cards/WorkspaceCard"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRef } from "react";

export const WorkspaceCardSection: React.FC = () => {
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
                name="romans office"
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
    )
}