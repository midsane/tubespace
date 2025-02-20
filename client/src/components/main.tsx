import { AssignmentTurnedIn, PendingActions, Videocam, Workspaces } from "@mui/icons-material";
import { useSelector } from "react-redux";

// import { TabsWrappedLabel } from "./tabs";
// import { useState } from "react";
// import { AssignedCardSection } from "./homeTabSection/AssignedCardSection";
// import { WorkspaceCardSection } from "./homeTabSection/WorkspaceCardSection";
// import { DraftVideosCardSection } from "./homeTabSection/draftVideosCardSection";
import { ScreeAreaTxt } from "./screenAreaTxt";


export const Main = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    // const [value, _] = useState<string>('one');



    // let TabSection = <></>
    // switch (value) {
    //     case "one":
    //         TabSection = <AssignedCardSection />
    //         break;
    //     case "two":
    //         TabSection = <WorkspaceCardSection />
    //         break;
    //     case "three":
    //         TabSection = <DraftVideosCardSection />
    // }
    


    return (<div className={`h-full relative text-slate-300 flex flex-col gap-4  ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
          <ScreeAreaTxt title="Home" border />
            <div className=" h-[30%] mt-44 sm:mt-24 relative rounded">
                <div className={`w-[90%] sm:w-[85%] rounded-3xl flex ${onLaptopScreen ? "py-10 px-10" : "flex-col sm:gap-2 gap-3 pb-10  pt-20 max-[400px]:pt-16 sm:pt-24 px-1 sm:px-6"} justify-between translate-x-1/2 right-1/2 h-min-10 bg-black absolute bottom-0 border border-secondaryLight `} >
                    <div className={`${onLaptopScreen ? "w-1/3 flex" : "w-full flex-col flex gap-3 sm:gap-2"} `}>

                        <ProfileInfo Svg={<Videocam />} text1="videos uploaded" text2="121" />
                        <ProfileInfo Svg={<AssignmentTurnedIn />} text1="assigned tasks completed" text2="23" />

                    </div>
                    <div className={`${onLaptopScreen ? "w-1/3 flex" : "w-full flex-col flex gap-3 sm:gap-2"} `} >

                        <ProfileInfo Svg={<PendingActions />} text1="assigned tasks pending" text2="2" />
                        <ProfileInfo Svg={<Workspaces />} text1="your workspaces" text2="2" />

                    </div>

                    <div className="fixed flex flex-col gap-2 top-[-35px] right-1/2 translate-x-1/2 rounded-3xl max-[400px]:w-14 max-[400px]:h-20  w-16 h-24 sm:w-20 sm:h-28 ">

                        <div className="w-full h-[70%] bg-blue-200 mask mask-squircle" >
                            <img src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                                className="object-cover rounded-3xl"
                            />
                        </div>

                        <p className="text-center sm:text-xl text-sm" >username</p>
                    </div>

                </div>
            </div>

            <div className=" h-1/2 relative overflow-x-hidden flex flex-col justify-around items-center ">

                {/* <div className="w-[90%]  sm:w-[85%] h-[5%] sm:h-[10%] rounded-3xl ">
                    <TabsWrappedLabel value={value} setValue={setValue} />

                </div> */}
{/*             
                {TabSection} */}


            </div>
            
    </div >)
}


const ProfileInfo = ({ Svg, text1, text2 }: { Svg: React.ReactNode, text1: String, text2: String }) => {

    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;

    return (<div className={`${onLaptopScreen ? "border-r-2 flex-col justify-between gap-2" : " border-b-0 justify-center gap-2 sm:gap-8  "} flex text-sm px-5 items-center  border-secondaryLight`}>

        <div className="stat-figure text-accent">
            {Svg}
        </div>
        <div className="stat-title text w-full text-left text-sm ">{text1}</div>
        <div className={`stat-value text-center ${onLaptopScreen ? "" : "text-sm sm:text-lg"}`}>{text2}</div>
    </div>)
}