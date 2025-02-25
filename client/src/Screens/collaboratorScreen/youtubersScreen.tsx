import { useSelector } from "react-redux";
import {  ScreenWrapperCol } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeStateType } from "../../store/store";
import { Search } from "lucide-react";
import { WorkSpaceCard } from "../../components/cards/WorkspaceCard";




export const YoutuberScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapperCol>
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Youtubers / WorkSpaces" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <YoutuberArea />
            </div>
        </ScreenWrapperCol>
    )
}



const YoutuberArea = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;

    return (<div className={`w-[90%] text-xs sm:text-sm justify-start pt-24 items-center h-full relative flex flex-col ${!onLaptopScreen ? "sm:w-[90%]" : "sm:w-[80%]"} `}>
        <div className="w-full flex items-center mb-4">
            <input
                type="text"
                placeholder="Search Workspaces..."
                className="w-full p-2 border border-secondaryLight rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="p-2 opacity-80 hover:opacity-100 bg-accent text-white rounded-r-md">
                <Search className="active:scale-90 ease-linear duration-75" />
            </button>
        </div>
        <div className="h-[90%] w-full border border-secondaryLight overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent rounded-xl grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  lg:place-content-start  place-items-center gap-10 p-5">
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
    </div>)
}


