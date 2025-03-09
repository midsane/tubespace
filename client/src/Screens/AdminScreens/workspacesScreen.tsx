import { useSelector } from "react-redux";
import { DraftVideosCardSectionWrap } from "../../components/homeTabSection/draftVideosCardSection";
import React, { useRef, useState } from "react";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeStateType } from "../../store/store";
import { WorkspaceCardSection2 } from "../../components/homeTabSection/WorkspaceCardSection";
import { TabsWrappedLabel2 } from "../../components/tabs";
import { AssignedCardSectionWrap } from "../../components/homeTabSection/AssignedCardSection";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { CollaboratorCardSectionWrap } from "../../components/homeTabSection/collaboratorCardSection";
import { useParams } from "react-router-dom";


export const WorkSpacesScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapper links={linkType.one} preRouter={"/y/"}>
            <div className="flex h-full relative justify-center bg-black items-center ">

                <ScreeAreaTxt border title="Your WorkSpaces" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <OfficeArea />
                <WorkspaceCardSection2 />
            </div>
        </ScreenWrapper>
    )
}



const OfficeArea = () => {
    const { workspaceName } = useParams()
    const [value, setValue] = useState<string>('one');
    const arrowRef = useRef<HTMLDivElement>(null)
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    let TabSection = <></>
    switch (value) {
        case "one":
            TabSection = <AssignedCardSectionWrap workspaceId={2} workspaceName={workspaceName}  ref={arrowRef} />
            break;
        case "two":
            TabSection = <DraftVideosCardSectionWrap workspaceId={2} workspaceName={workspaceName} ref={arrowRef} />
            break;
        case "three":
            TabSection = <CollaboratorCardSectionWrap workspaceId={2} workspaceName={workspaceName} ref={arrowRef} />
            break;
    }

    const handleClickUp = () => {
        if (arrowRef.current) {
            arrowRef.current.scrollTop = 0;
        }
    }

    const handleClickDown = () => {
        if (arrowRef.current) {
            arrowRef.current.scrollTop = arrowRef.current.scrollHeight;
        }
    }


    return (<div className={`w-[90%] gap-2 text-xs sm:text-sm  justify-start pt-24 items-center h-full relative flex flex-col  sm:gap-2 ${!onLaptopScreen ? "sm:w-[80%]" : "sm:w-[70%]"} `} >
        <TabsWrappedLabel2 value={value} setValue={setValue} />

        <div className=" h-[90%] flex w-full flex-col justify-center items-center">
            <div className="w-full items-center flex justify-between py-6 px-4 h-fit">
                <h1 className="sm:pl-10 text-lg sm:text-xl">{workspaceName}</h1>
                <div className="flex gap-2">
                    <ArrowUpIcon onClick={handleClickUp} size={35} className="border p-2 cursor-pointer active:scale-90 ease-linear duration-75 border-secondaryLight rounded-full" />
                    <ArrowDownIcon onClick={handleClickDown} size={35} className="border p-2 cursor-pointer active:scale-90 ease-linear duration-75 border-secondaryLight rounded-full" />
                </div>
            </div>
            {TabSection}
        </div>
    </div>)
}


