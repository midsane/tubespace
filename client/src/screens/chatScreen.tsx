
import React, { useEffect, useRef } from "react";
import { OuterModal } from "../components/outerModal"
import { Sidebar } from "../components/sidebar"
import { useSelector } from "react-redux"
import { Avatar, Input } from "@mui/material";
import { Send } from "lucide-react";

const BubbleColor = "bg-accent text-black"

export const ChatScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    return (
        <div className='w-screen h-screen flex justify-end' >
            <OuterModal />
            <Sidebar />
            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
                <div className="flex h-full justify-center pt-[8%] pb-[1%] bg-black flex-col items-center ">
                    <ChatArea />
                </div>
            </div>
        </div>
    )
}

const ChatArea: React.FC = () => {
    const chatAreaRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [])

    return <div
        ref={chatAreaRef}
        className="flex flex-col justify-start items-center scrollbar-hide overflow-y-scroll h-full rounded w-[95%] gap-2" >
        <div className="w-full flex gap-0 justify-start p-2">
            <div className="w-fit h-fit p-1 rounded-full border border-blue-200 ">
                <Avatar alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />
            </div>

            <div className="flex flex-col gap-2" >
                {["That's never been done in the history of the Jedi. It's insulting!", "What kind of nonsense is this",
                    "this should not happen again", "is there any way to solve it", "i am done with you"
                ].
                    map((msg, ind) =>
                        <Bubble ind={ind} msgBy="satmak" Start text={msg} key={ind} />
                    )
                }
            </div>
        </div>

        <div className="w-full flex gap-0 justify-end p-2">
            <div className="flex flex-col gap-2" >
                <Bubble ind={0} End text="Calm down Anakin." />

            </div>
            <div className="w-fit h-fit p-1 rounded-full border border-blue-200">
                <Avatar alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />
            </div>
        </div>


        <div className="w-full flex gap-0 justify-end p-2">
            <div className="flex gap-2" >
                {/* <Input
                        margin="dense"
                        fullWidth
                        required
                        color="primary"
                        placeholder="type your message"
                        sx={{ color: "black", borderRadius: "2%", padding: "2px 10px", backgroundColor: "white" }} /> */}
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-square btn-outline">
                    <Send />
                </button>
            </div>
        </div>

    </div>
}

const Bubble: React.FC<{ msgBy?: string, Start?: boolean, End?: boolean, text: string, ind: number }> = ({ msgBy, ind, Start, End, text }) => {
    return <div className={`chat ${Start && "chat-start"} ${End && "chat-end"}`} >
        <div className={`chat-bubble flex flex-col gap-1 max-w-[48rem] ${BubbleColor}`}>
            {ind === 0 && <p className="text-purple-950  " >{msgBy}</p>}
            <p>{text} </p>
            <p className="text-right text-sm opacity-70" >17:53</p>
        </div>

    </div>
}

