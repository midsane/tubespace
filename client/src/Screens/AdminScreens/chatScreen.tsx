
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { CircleXIcon, MenuIcon, PlusIcon, Send } from "lucide-react";
import { Delete } from "@mui/icons-material";
import { storeStateType } from "../../store/store";
import { AnimatePresence, motion } from "framer-motion";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";

const BubbleColor = "bg-accent text-black"

export const ChatScreen = ({ linkType : lType}: { linkType: linkType }) => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapper links={lType} preRouter={lType === linkType.one ? "/y/" : "/c/"}>
            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]  max-[520px]:w-[85vw]"}`}>

                <div className="flex h-full justify-start relative items-center ">
                    <div className={`${onLaptopScreen ? "w-[70%]" : "w-full"} h-16 absolute top-20 left-0 z-20 p-2 flex gap-5 justify-start items-center bg-primary border-b border-secondaryLight`} >
                        <div className="w-fit h-fit p-1 ml-2 border rounded-xl mask mask-mask-squircle border-secondaryLight bg-accent " >
                            <img src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                                className="object-cover h-10 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col justify-start items-start">
                            <p className="font-bold" >Satmak</p>
                            <p className="badge badge-ghost badge-sm">
                                Last online on 12th Feb, 2024.
                            </p>
                        </div>
                    </div>

                    <ScreeAreaTxt title="chat" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                    <div className={`${onLaptopScreen ? "w-[70%]" : "w-[98%]"} h-fit absolute left-0 bottom-0 z-50 px-2 flex gap-4 justify-between items-center border-b bg-primary py-1 bg-blend-darken border-secondaryLight `}>

                        <PlusIcon color="lightGreen" className="cursor-pointer active:scale-90 ease-linear duration-75" />
                        <input type="text" placeholder="Type here" className="input input-bordered w-[90%]" />
                        <button className="btn btn-square btn-outline bg-primary">
                            <Send className="" />
                        </button>
                    </div>

                    <ChatArea />
                    <PersonsForChat />
                </div>
            </div>
        </ScreenWrapper>
    )
}

const PersonsForChat = () => {
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (<>
        {
            sideBarState.onLaptopScreen ?
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-primary dark:scrollbar-track-secondaryLight h-full w-[30%] bg-secondary">
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
                                className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-primary dark:scrollbar-track-secondaryLight overflow-x-auto h-full z-[60] w-full top-0 left-0 fixed bg-secondary">
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
                            <MenuIcon className="fixed top-4 right-4 z-[80] cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setIsOpen(true)} />
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
        className={`flex flex-col opacity-95 justify-center px-2 items-center scrollbar-hide overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-accent dark:scrollbar-track-transparent h-full border-r border-secondary rounded ${sideBarState.onLaptopScreen ? "w-[70%]" : "w-full"} gap-2 pt-40 relative `} >

        <div className="flex z-40 flex-col absolute top-44 left-0 w-full h-full">
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

            <div className="flex flex-col gap-2 pb-20 " >
                <Bubble ind={0} End text="Calm down Anakin." />

            </div>
        </div>


    </div>
}

const Bubble: React.FC<{ msgBy?: string, Start?: boolean, End?: boolean, text: string, ind: number }> = ({ msgBy, ind, Start, End, text }) => {
    return <div className={`chat ${Start && "chat-start"} ${End && "chat-end"}`} >
        <div className={`chat-bubble flex flex-col gap-1 max-w-[48rem] max-[850px]:max-w-[15rem] ${BubbleColor}`}>
            {ind === 0 && <p className="text-label font-mono font-bold  " >{msgBy}</p>}
            <p>{text} </p>
            <p className="text-right text-primary text-xs opacity-70" >17:53</p>
        </div>

    </div>
}

