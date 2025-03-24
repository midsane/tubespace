import { useDispatch, useSelector } from "react-redux";
import { DraftVideosCardSectionWrap } from "../../components/homeTabSection/draftVideosCardSection";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeDispatchType, storeStateType } from "../../store/store";
import { WorkspaceCardSection2 } from "../../components/homeTabSection/WorkspaceCardSection";
import { TabsWrappedLabel2 } from "../../components/tabs";
import { AssignedCardSectionWrap } from "../../components/homeTabSection/AssignedCardSection";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { CollaboratorCardSectionWrap } from "../../components/homeTabSection/collaboratorCardSection";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWorkspaceScreenData } from "../../fetch/fetchForYoutuber";
import { useFetch } from "../../hooks/fetchHooks";
import { workspaceInterface } from "../../types/youtuberTypes";
import toast from "react-hot-toast";
import { youtuberWorkspacesAction } from "../../store/youtuberStore/youtuberWorspaces.slice";
import { motion } from "framer-motion"
import { RefreshLogin } from "../RefreshLogin";
import { otherUserYoutuberWorkspacesAction } from "../../store/otherUser/youtuber/restOtherYoutuber.slice";


export const getCurrentWorkspaceInfo = (workspaceTitle: string | undefined, workspaceArr: workspaceInterface[]) => {
    if (!workspaceArr || workspaceArr.length === 0) return null;
    if (workspaceTitle)
        return workspaceArr.find(ws => ws.name === workspaceTitle) || null
    else {
        return workspaceArr[0];
    }
}
export const WorkSpacesScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    const { workspaceName, username } = useParams();

    const dispatch: storeDispatchType = useDispatch()

    const fetchFnc = useCallback(() => fetchWorkspaceScreenData(username ? username : null), [username])





    const navigate = useNavigate();

    const [fetching, setFetching] = useState<boolean>(true);
    const workspaces = useSelector((state: storeStateType) => state.youtuberWorkSpaces)

    const { data: workspaceScreenData, error } = useFetch<workspaceInterface[]>(fetchFnc)


    useEffect(() => {

        if (workspaceScreenData) {
            if (currentUser)
                dispatch(youtuberWorkspacesAction.setWorkspaces(workspaceScreenData))
            else dispatch(otherUserYoutuberWorkspacesAction.setWorkspaces(workspaceScreenData))

            setFetching(false)

        }
    }, [workspaceScreenData, dispatch])

    if (error) toast.error(error)

    const currentUsername = useSelector((state: storeStateType) => state.youtuberInfo).user?.username;
    if (!currentUsername) return <RefreshLogin />
    const currentUser = currentUsername === username && username ? true : false;
    return (
        <ScreenWrapper links={linkType.one} preRouter={"/y/"}>
            <div className="flex h-full relative justify-center bg-black items-center ">

                <ScreeAreaTxt border title="Your WorkSpaces" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <OfficeArea
                    workspaceInfo={getCurrentWorkspaceInfo(workspaceName, workspaces)}
                    loading={fetching}
                />
                {currentUser && <WorkspaceCardSection2 loading={fetching} />}
            </div>
        </ScreenWrapper>
    )
}



const OfficeArea = ({ workspaceInfo }: { loading: boolean, workspaceInfo: workspaceInterface | null }) => {
    const { workspaceName } = useParams()
    const [value, setValue] = useState<string>('one');
    const arrowRef = useRef<HTMLDivElement>(null)
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    let TabSection = <></>
    switch (value) {
        case "one":
            TabSection = <AssignedCardSectionWrap
                taskInfo={workspaceInfo?.tasks}
                workspaceName={workspaceName} ref={arrowRef} />
            break;
        case "two":
            TabSection = <DraftVideosCardSectionWrap
                draftInfo={workspaceInfo?.draftVideos}
                workspaceName={workspaceName} ref={arrowRef} />
            break;
        case "three":
            TabSection = <CollaboratorCardSectionWrap
                collaboratorInfo={workspaceInfo?.collaborators}
                workspaceName={workspaceName} ref={arrowRef} />
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

        <div
            className=" h-[90%] flex w-full flex-col justify-center items-center">
            <div className="w-full items-center flex justify-between py-6 px-4 h-fit">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="sm:pl-10 text-lg sm:text-xl">{workspaceName}</motion.h1>
                <div className="flex gap-2">
                    <ArrowUpIcon onClick={handleClickUp} size={35} className="border p-2 cursor-pointer active:scale-90 ease-linear duration-75 border-secondaryLight rounded-full" />
                    <ArrowDownIcon onClick={handleClickDown} size={35} className="border p-2 cursor-pointer active:scale-90 ease-linear duration-75 border-secondaryLight rounded-full" />
                </div>
            </div>
            {TabSection}
        </div>
    </div>)
}


