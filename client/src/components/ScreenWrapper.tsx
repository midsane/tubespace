import { useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar'
import { storeStateType } from '../store/store';
import React, { ReactNode } from 'react';
import { Home } from 'lucide-react';
import { AddCircleOutline, Chat, Workspaces } from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';


interface screenWrapperInterface {
    children: ReactNode,
    links: linkType,
    preRouter?: string
}

export enum linkType {
    "one",
    "two"
}

const linksObj = {
    "one": [["Home", <Home />], ["Create", <AddCircleOutline />], ["Workspaces", <Workspaces />], ["Chat", <Chat />], ['Collaborators', <GroupsIcon />]],

    "two": [["Home", <Home />], ["Youtubers", <Workspaces />], ["Chat", <Chat />]],
}

export const ScreenWrapper: React.FC<screenWrapperInterface> =
    ({ children }) => {

        const userInfo = useSelector((state: storeStateType) => state.youtuberInfo.user);
        const userInfoCol = useSelector((state: storeStateType) => state.collaboratorInfo.user);

        const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;

        let userName = ""

        const preRouter = userInfo?.role === "youtuber" ? "/y/" : "/c/";

        let userLinkType: linkType = linkType.one;
        if (userInfo) {
            userLinkType = linkType.one
            userName = userInfo.username
        }

        else if (userInfoCol) {
            userLinkType = linkType.two
            userName = userInfoCol.username
        }


        return (
            <div className='w-screen h-[100dvh] flex justify-end max-[850px]:text-xs ' >
                <Sidebar
                    loading={userInfo || userInfoCol ? false : true}
                    links={linksObj[userLinkType === linkType.one ? "one" : "two"]}
                    preRouter={preRouter + (userName ? userName : "dummy") + "/"} />

                <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]  max-[520px]:w-[85vw]"}`}>
                    {children}
                </div>
            </div>
        )
    }





