import { AssignmentTurnedIn, PendingActions, Videocam, Workspaces } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { TabsWrappedLabel } from "./tabs";
import { useState } from "react";
import { AssignedCardSection } from "./homeTabSection/AssignedCardSection";
import { WorkspaceCardSection } from "./homeTabSection/WorkspaceCardSection";
import { DraftVideosCardSection } from "./homeTabSection/draftVideosCardSection";


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


    return (<div className={`h-full text-slate-300 bg-black ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
        <div className=" h-[40%] mt-[2%] relative rounded">
            <div className="w-[85%] rounded-3xl flex justify-between translate-x-1/2 right-1/2 p-10 h-min-10 bg-black absolute bottom-0 border border-white/10 " >
                <div className="w-1/3 flex " >

                    <ProfileInfo Svg={<Videocam />} text1="videos uploaded" text2="121" />
                    <ProfileInfo Svg={<AssignmentTurnedIn />} text1="assigned tasks completed" text2="23" />

                </div>
                <div className="w-1/3 flex " >

                    <ProfileInfo Svg={<PendingActions />} text1="assigned tasks pending" text2="2" />
                    <ProfileInfo Svg={<Workspaces />} text1="your workspaces" text2="2" />

                </div>

                <div className="fixed flex flex-col gap-2 top-[-35px] right-1/2 translate-x-1/2 rounded-3xl w-20 h-28 ">

                    <div className="w-full h-[70%] bg-blue-200 mask mask-squircle" >
                        <img src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            className="object-cover rounded-3xl"
                        />
                    </div>

                    <p className="text-center" >username</p>
                </div>

            </div>
        </div>

        <div className=" h-[55%] flex flex-col justify-around items-center relative">

            <div className="w-[85%] h-[10%] rounded-3xl ">
                <TabsWrappedLabel value={value} setValue={setValue} />

            </div>

            {TabSection}


        </div>
    </div>)
}


const ProfileInfo = ({ Svg, text1, text2 }: { Svg: React.ReactNode, text1: String, text2: String }) => {

    return (<div className="border-r-2 justify-between flex text-sm flex-col px-5 gap-2 border-white/10">

        <div className="stat-figure text-accent">
            {Svg}
        </div>
        <div className="stat-title">{text1}</div>
        <div className="stat-value text-center">{text2}</div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
    </div>)
}