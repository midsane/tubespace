import { AssignmentTurnedIn, KeyboardArrowDown, KeyboardArrowUp, PendingActions, Videocam, Workspaces } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { TabsWrappedLabel } from "./tabs";
import { useRef, useState } from "react";
import { AssignedCardSection } from "./homeTabSection/AssignedCardSection";
import { WorkspaceCardSection } from "./homeTabSection/WorkspaceCardSection";
import { DraftVideosCardSection } from "./homeTabSection/draftVideosCardSection";
import { ScreeAreaTxt } from "./screenAreaTxt";


export const Main = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    const [value, setValue] = useState<string>('one');

    let TabSection = <></>
    switch (value) {
        case "one":
            TabSection = <AssignedCardSection />
            break;
        case "two":
            TabSection = <WorkspaceCardSection />
            break;
        case "three":
            TabSection = <DraftVideosCardSection />
    }

    const scrollDivRef = useRef<HTMLDivElement>(null);

    const handleUpSlide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop -= 200
        }
    }

    const handleDownSlide = () => {

        if (scrollDivRef.current) {
            scrollDivRef.current.scrollTop += 200
        }
    }

    return (<div className={`h-full relative text-slate-300 flex flex-col  gap-4  ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]  max-[520px]:w-[85vw]"}`}>
        <ScreeAreaTxt title="Home" border />
        <div className={` h-[30%] ${onLaptopScreen ? "mt-28" : "mt-44"} relative rounded`}>
            <div className={`w-[90%] rounded-3xl flex ${onLaptopScreen ? "py-12 px-2" : "flex-col  sm:gap-4 gap-3 pb-10 pt-12 px-1 sm:px-6"} justify-between translate-x-1/2 right-1/2 h-min-10 bg-black absolute bottom-0 border border-secondaryLight `} >

                <div className={`${onLaptopScreen ? "flex " : "w-full flex-col flex gap-3 sm:gap-4"} `}>

                    <ProfileInfo Svg={<Videocam />} text1="videos uploaded" text2="121" />
                    <ProfileInfo Svg={<AssignmentTurnedIn />} text1="assigned tasks completed" text2="23" />

                </div>
                <div className={`${onLaptopScreen ? "flex" : "w-full flex-col flex gap-3 sm:gap-4"} `} >

                    <ProfileInfo Svg={<PendingActions />} text1="assigned tasks pending" text2="2" />
                    <ProfileInfo Svg={<Workspaces />} text1="your workspaces" text2="2" />

                </div>

                <div className="fixed flex flex-col gap-2 top-[-45px] right-1/2 translate-x-1/2 rounded-3xl max-[400px]:w-14 max-[400px]:h-20 w-16 h-24 sm:w-20 sm:h-28 ">

                    <div className="w-full h-[70%] bg-blue-200 mask mask-squircle" >
                        <img src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            className="object-cover rounded-3xl"
                        />
                    </div>

                    <p className="text-center sm:text-lg text-sm" >username</p>
                </div>

            </div>
        </div>

        <div className="w-full overflow-x-hidden flex justify-center items-center">
            <div className={` w-[90%] relative overflow-hidden flex flex-col gap-4 justify-start items-start `}>
                <TabsWrappedLabel value={value} setValue={setValue} />
                <div 
                ref={scrollDivRef}
                className={`w-full h-full max-[400px]:static relative border border-secondaryLight rounded-3xl flex justify-center items-center max-[400px]:h-[200px] max-[400px]:overflow-y-scroll
                  max-[400px]:items-start scroll-smooth scrollbar-thin dark:scrollbar-track-primary  dark:scrollbar-thumb-accent`}>
                    {TabSection}
                    <div onClick={handleUpSlide} className="absolute hidden max-[400px]:block bg-secondaryLight top-20 right-4 sm:right-2 z-20 border border-primary rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                        <KeyboardArrowUp fontSize='small' />
                    </div>
                    <div onClick={handleDownSlide} className="absolute hidden max-[400px]:block bottom-2 right-4 z-10 cursor-pointer border-primary bg-secondaryLight border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                        <KeyboardArrowDown fontSize='small' />
                    </div>
                </div>
            </div>

        </div>
    </div >)
}



const ProfileInfo = ({ Svg, text1, text2 }: { Svg: React.ReactNode, text1: String, text2: String }) => {

    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;

    return (<div className={`${onLaptopScreen ? " flex-col justify-between gap-2" : " border-b-0 justify-center gap-2 sm:gap-8  "} flex text-sm px-4 items-center  border-secondaryLight`}>

        <div className="stat-figure text-accent">
            {Svg}
        </div>
        <div className="stat-title text w-full text-left text-sm ">{text1}</div>
        <div className={`stat-value text-center ${onLaptopScreen ? "text-xl" : "text-sm"}`}>{text2}</div>
    </div>)
}