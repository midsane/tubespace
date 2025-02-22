import { useSelector } from "react-redux";
import { DraftVideosCardSectionWrap } from "../components/homeTabSection/draftVideosCardSection";
import React, { useState } from "react";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ScreeAreaTxt } from "../components/screenAreaTxt";
import { storeStateType } from "../store/store";
import { WorkspaceCardSection2 } from "../components/homeTabSection/WorkspaceCardSection";
import {  TabsWrappedLabel2 } from "../components/tabs";
import { AssignedCardSectionWrap } from "../components/homeTabSection/AssignedCardSection";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";


export const WorkSpacesScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapper>
            <div className="flex h-full relative justify-center bg-black items-center ">

                <ScreeAreaTxt border title="Your WorkSpaces" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <OfficeArea />
                <WorkspaceCardSection2 />
            </div>
        </ScreenWrapper>
    )
}



const OfficeArea = () => {

    const [value, setValue] = useState<string>('one');
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    let TabSection = <></>
    switch (value) {
        case "one":
            TabSection = <AssignedCardSectionWrap />
            break;
        case "two":
            TabSection = <DraftVideosCardSectionWrap />
            break;
        case "three":
            TabSection = <DraftVideosCardSectionWrap />
            break;
    }

    return (<div className={`w-[90%] gap-2 text-xs sm:text-sm  justify-start pt-24 items-center h-full relative flex flex-col  sm:gap-2 ${!onLaptopScreen ? "sm:w-[80%]" : "sm:w-[70%]"} `} >
        <TabsWrappedLabel2 value={value} setValue={setValue} />

        <div className=" h-[90%] flex w-full flex-col justify-center items-center">
            <div className="w-full items-center flex justify-between py-6 px-4 h-fit">
                <h1>midsane's office</h1>
                <div className="flex gap-2">
                    <ArrowUpIcon size={35} className="border p-2 cursor-pointer active:scale-90 ease-linear duration-75 border-secondaryLight rounded-full" />
                    <ArrowDownIcon size={35} className="border p-2 cursor-pointer active:scale-90 ease-linear duration-75 border-secondaryLight rounded-full" />
                </div>
            </div>
            {TabSection}
        </div>
    </div>)
}


