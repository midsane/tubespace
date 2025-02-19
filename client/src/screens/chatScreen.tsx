
import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material";
import { CircleXIcon, MenuIcon, Send } from "lucide-react";
import { Delete } from "@mui/icons-material";
import { storeStateType } from "../store/store";
import { AnimatePresence, motion } from "framer-motion";

const BubbleColor = "bg-accent text-black"

export const ChatScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    return (
        <div className='w-screen h-screen flex justify-end max-[850px]:text-xs' >
            <Sidebar />
            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
                <div className="flex h-full justify-start relative items-center ">
                    <div className={`${onLaptopScreen ? "w-[70%]" : "w-full"} h-16 absolute top-0 left-0 z-20 p-2 flex gap-5 justify-start items-center bg-primary border-b border-secondaryLight`} >
                        <div className="w-fit h-fit p-1 rounded-full border border-blue-200 ">
                            <Avatar alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />

                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <p className="font-bold" >Satmak</p>
                            <p className="badge badge-ghost badge-sm">
                                Last online on 12th Feb, 2024.
                            </p>
                        </div>


                    </div>
                    <ChatArea />
                    <PersonsForChat />
                </div>
            </div>
        </div>
    )
}

const PersonsForChat = () => {
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (<>
        {
            sideBarState.onLaptopScreen ?
                <div className="overflow-x-auto h-full w-[30%] bg-secondary">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th><span className="active:scale-90 hover:scale-105 ease-linear cursor-pointer duration-75"><Delete /></span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[{ name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }
                                , { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }
                            ].map((u, i) =>

                                <tr key={i}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={u.src}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div className="font-bold">{u.name}</div>
                                        </div>
                                    </td>
                                    <td >
                                        <p className="badge badge-ghost badge-sm">
                                            {u.lastMsg}
                                        </p>
                                    </td>

                                </tr>
                            )
                            }

                        </tbody>

                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>status</th>
                            </tr>
                        </tfoot>
                    </table>
                </div> :
                <>
                    <AnimatePresence>
                        {isOpen &&
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className="overflow-x-auto h-full z-20 w-full top-0 left-0 fixed bg-secondary">
                                <table className="table">
                                    <CircleXIcon className="fixed z-50 top-4 right-4 cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setIsOpen(false)} />
                                    <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <th><span className="active:scale-90 hover:scale-105 ease-linear cursor-pointer duration-75"><Delete /></span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[{ name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }
                                            , { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { name: "lavneesh", lastMsg: "i will come...", src: "https://img.daisyui.com/images/profile/demo/2@94.webp" }
                                        ].map((u, i) =>

                                            <tr key={i}>
                                                <th>
                                                    <label>
                                                        <input type="checkbox" className="checkbox" />
                                                    </label>
                                                </th>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={u.src}
                                                                    alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div className="font-bold">{u.name}</div>
                                                    </div>
                                                </td>
                                                <td >
                                                    <p className="badge badge-ghost badge-sm">
                                                        {u.lastMsg}
                                                    </p>
                                                </td>

                                            </tr>
                                        )
                                        }

                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>status</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </motion.div>
                        }

                    </AnimatePresence>
                    {!isOpen &&
                        <div
                        >
                            <MenuIcon className="fixed top-4 right-4 z-20 cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setIsOpen(true)} />
                        </div>
                    }
                </>
        }
    </>

    )
}

const ChatArea: React.FC = () => {
    const chatAreaRef = useRef<HTMLDivElement>(null)
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [])

    return <div
        ref={chatAreaRef}
        className={`flex flex-col opacity-95 justify-center px-2 items-center scrollbar-hide overflow-y-scroll h-full border-r border-secondary rounded ${sideBarState.onLaptopScreen ? "w-[70%]" : "w-full"} gap-2 pt-20 `} >

        <div className="flex flex-col w-full h-full">
            <div className="w-full flex gap-0 justify-start p-2">
                <div className="w-fit h-fit p-1 rounded-full border border-blue-200 ">
                    <Avatar sx={{ width: 30, height: 30 }} variant="circular" alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />
                </div>

                <div className="flex flex-col gap-2" >
                    {["That's never been done in the history of the Jedi. It's insulting!", "What kind of nonsense is this",
                        "this should not happen again", "is there any way to solve it", "i am done with you",
                        "this should not happen again", "is there any way to solve it", "i am done with you",
                        "this should not happen again", "is there any way to solve it", "i am done with you",
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
                    <Avatar sx={{ width: 30, height: 30 }} alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />
                </div>
            </div>
            <div className="w-full flex gap-0 justify-end p-2 pt-14">
                <div className="flex gap-2" >
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <button className="btn btn-square btn-outline">
                        <Send />
                    </button>
                </div>
            </div>

        </div>

    </div>
}

const Bubble: React.FC<{ msgBy?: string, Start?: boolean, End?: boolean, text: string, ind: number }> = ({ msgBy, ind, Start, End, text }) => {
    return <div className={`chat ${Start && "chat-start"} ${End && "chat-end"}`} >
        <div className={`chat-bubble flex flex-col gap-1 max-w-[48rem] max-[850px]:max-w-[15rem] ${BubbleColor}`}>
            {ind === 0 && <p className="text-purple-950  " >{msgBy}</p>}
            <p>{text} </p>
            <p className="text-right text-sm opacity-70" >17:53</p>
        </div>

    </div>
}

