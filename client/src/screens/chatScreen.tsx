
import React, { useEffect, useRef } from "react";

import { Sidebar } from "../components/sidebar"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material";
import { Send } from "lucide-react";
import { Delete } from "@mui/icons-material";

const BubbleColor = "bg-accent text-black"

export const ChatScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    return (
        <div className='w-screen h-screen flex justify-end' >
            <Sidebar />
            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
                <div className="flex h-full justify-start relative items-center ">
                    <div className="w-[70%] h-16 absolute top-0 left-0 z-20 p-2 flex gap-5 justify-start items-center bg-primary border-b border-secondaryLight" >
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
    return (
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

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Hart Hagerty</div>
                            </div>
                        </td>
                        <td >
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Brice Swyre</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Marjy Ferencz</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Yancy Tear</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>
                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Hart Hagerty</div>
                            </div>
                        </td>
                        <td >
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Brice Swyre</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Marjy Ferencz</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Yancy Tear</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>
                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Hart Hagerty</div>
                            </div>
                        </td>
                        <td >
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Brice Swyre</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Marjy Ferencz</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                    <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className="font-bold">Yancy Tear</div>
                            </div>
                        </td>
                        <td>
                            <p className="badge badge-ghost badge-sm">
                                i am working on that, will take a...
                            </p>
                        </td>

                    </tr>

                </tbody>

                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>status</th>
                    </tr>
                </tfoot>
            </table>
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
        className="flex flex-col opacity-95 justify-start items-center scrollbar-hide overflow-y-scroll h-full border-r border-secondary rounded w-[70%] gap-2 pt-20 " >

        <div className="flex flex-col w-full h-full">
            <div className="w-full flex gap-0 justify-start p-2">
                <div className="w-fit h-fit p-1 rounded-full border border-blue-200 ">
                    <Avatar alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />
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
                    <Avatar alt="collaborator1" src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg" />
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
        <div className={`chat-bubble flex flex-col gap-1 max-w-[48rem] ${BubbleColor}`}>
            {ind === 0 && <p className="text-purple-950  " >{msgBy}</p>}
            <p>{text} </p>
            <p className="text-right text-sm opacity-70" >17:53</p>
        </div>

    </div>
}

