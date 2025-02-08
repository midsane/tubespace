
import React from "react";
import { OuterModal } from "../components/outerModal"
import { Sidebar } from "../components/sidebar"
import { useSelector } from "react-redux"

export const ChatScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    return (
        <div className='w-screen h-screen flex justify-end' >
            <OuterModal />
            <Sidebar />
             <div className={`h-full text-slate-300 bg-black ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
                    <div className=" h-[55%] flex flex-col justify-around items-center relative">
                        <ChatArea />
                    </div>
                </div>
        </div>
    )
}

const ChatArea: React.FC = () => {

    return<div>
        
    </div>
}