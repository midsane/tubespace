
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { Check, CheckCheck, FileText, FileVideo, Image, MessageCircle, Paperclip, PlusIcon, Smile, Sticker, Users } from "lucide-react";

import { storeStateType } from "../../store/store";
import { motion } from "framer-motion";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";

import { useFetch } from "../../hooks/fetchHooks";
import { fetchMsgOfUser, fetchPersonList } from "../../fetch/fetchChat";
import { ChatEntry, MESSAGE_STATUS, PersonEntry } from "../../types/chatTypes";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SendButton from "../../components/buttons/sendButton"
import { useSocket } from "../../hooks/useSocket";
import { Tooltip } from "@mui/material";
import { SOCKET_EVENTS } from "../../types/socketEventsType";
import { v4 as uuidv4 } from 'uuid';

const BubbleColor = "bg-accent text-black"

export const ChatScreen = ({ linkType: lType }: { linkType: linkType }) => {

    const [chatMessages, setChatMessages] = useState<Map<number | string, ChatEntry>>(new Map<number | string, ChatEntry>());
    const { username } = useParams();
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    const [message, setMessage] = useState<string>("")

    const currentUsername = useSelector((state: storeStateType) => state.youtuberInfo).user?.username || useSelector((state: storeStateType) => state.collaboratorInfo).user?.username;

    const fetchFnc = useCallback(async () => {
        if (username)
            return await fetchMsgOfUser(username)
    }, [username])

    const { data: chatData, loading, error } = useFetch<any>(fetchFnc)

    useEffect(() => {
        if (chatData && chatData.dataToSend) {
            const chatState = new Map<number | string, ChatEntry>()
            for (const msg of chatData.msgData && chatData.msgData) {
                if ('chatId' in msg)
                    chatState.set(msg.chatId, msg);
            }
            if (chatState.size === 0) return;
            setChatMessages(chatState)
        }
    }, [chatData])

    const navigate = useNavigate()

    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        if (!socket.hasListeners(SOCKET_EVENTS.MESSAGE)) {
            socket.on(SOCKET_EVENTS.MESSAGE, (message: ChatEntry) => {

                setChatMessages(prev => {
                    const newState = new Map(prev);
                    newState.set(message.chatId, message);
                    return newState;
                })
            });

        }

        if (!socket.hasListeners(SOCKET_EVENTS.UPDATE_MESSAGE_STATUS)) {
            socket.on(SOCKET_EVENTS.UPDATE_MESSAGE_STATUS, (chatId: number) => {
                console.log("updating message status", chatId)
                setChatMessages(prev => {
                    const newState = new Map(prev);
                    const newMsg = newState.get(chatId);
                    if (!newMsg) return newState;
                    newMsg.status = MESSAGE_STATUS.READ;
                    newMsg.isRead = true;
                    newState.set(chatId, newMsg);
                    return newState;
                })
            })
        }

        if (!socket.hasListeners(SOCKET_EVENTS.MESSAGE_DELIVERED)) {
            socket.on(SOCKET_EVENTS.MESSAGE_DELIVERED, (response: { status: string, msg: ChatEntry, chatId: string }) => {

                if (response.status === 'ok') {

                    setChatMessages(prev => {
                        const newState = new Map(prev);

                        newState.delete(response.chatId);
                        if (!response.msg.chatId) return newState;
                        const newMsg = response.msg;
                        newMsg.status = MESSAGE_STATUS.DELIVERED;
                        newState.set(response.msg.chatId, newMsg);

                        return newState;
                    })
                }
                else {
                    const undeliveredMsg = chatMessages.get(response.chatId)?.message || ""
                    setChatMessages(prev => {
                        const newState = new Map(prev);
                        newState.delete(response.chatId);
                        return newState;
                    })
                    toast.error("This Message could not be delivered: " + undeliveredMsg);

                }
            })
        }

        if (!socket.hasListeners(SOCKET_EVENTS.MESSAGE_READ)) {
            socket.on(SOCKET_EVENTS.MESSAGE_READ, (response: { status: string, msg: ChatEntry }) => {

                if (response.status === 'ok') {

                    setChatMessages(prev => {
                        const newState = new Map(prev);
                        if (!response.msg.chatId) return newState;
                        const newMsg = response.msg;
                        newMsg.status = MESSAGE_STATUS.READ;
                        newMsg.isRead = true;
                        newState.set(response.msg.chatId, newMsg);

                        return newState;
                    })
                }

            })
        }


    }, [socket])


    const sendMessage = () => {

        if (message.trim() === "") {
            toast.error("Message cannot be empty")
            return
        }

        if (!socket || !currentUsername || !username) {
            toast.error("Socket not connected")
            return;
        }


        const uniqueId = uuidv4();
        console.log("chatid send to server:", uniqueId)
        socket.emit(SOCKET_EVENTS.MESSAGE, {
            toUserName: username,
            message,
            chatId: uniqueId,
        }, (response: { status: string, msg: string, chatId: string }) => {



            if (response.status === "ok") {
                console.log("message successfully sent to server");
                setChatMessages(prev => {
                    const newState = new Map(prev);
                    const newChatEntry = prev.get(response.chatId);
                    if (!newChatEntry) return newState
                    newChatEntry.status = MESSAGE_STATUS.SENT;
                    newState.set(response.chatId, newChatEntry);
                    console.log("newMsg:", newState.get(response.chatId))
                    return newState;
                })
            } else {
                toast.error("Message could not be sent");
            }
            console.log("response from server:", response);
            if (response.status === "fail") {
                toast.error("Message could not be sent");
                return;
            }
        });

        setChatMessages(prev => {
            const newState = new Map(prev);
            newState.set(uniqueId, {
                chatId: uniqueId,
                from: currentUsername,
                to: username,
                message,
                isRead: false,
                createdAt: new Date().toISOString(),
            });
            return newState;
        })

        setMessage("");
    }


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                sendMessage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sendMessage]);

    const [showAttachments, setShowAttachments] = useState(false)
    return (
        <ScreenWrapper links={lType} preRouter={lType === linkType.one ? "/y/" : "/c/"}>

            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]  max-[520px]:w-[85vw]"}`}>

                <div className="flex h-full justify-start relative items-center ">
                    <div className={`${onLaptopScreen ? "w-[70%]" : "w-full"} cursor-pointer h-16 absolute top-20 left-0 z-20 p-2 flex gap-5 justify-start items-center bg-primary border-b border-secondaryLight`} >
                        <img onClick={() => navigate(`/c/${username}/home`)} src={chatData?.dataToSend?.profilepic ?? "https://photosnow.org/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg"}
                            className="object-cover h-10 rounded-full aspect-square border border-label"
                        />

                        <div className="flex flex-col justify-start items-start">
                            <p className="font-bold" >{chatData?.dataToSend?.username}</p>
                            <p className="badge badge-ghost badge-sm">
                                Last online on 12th Feb, 2024.
                            </p>
                        </div>
                    </div>

                    <ScreeAreaTxt title="chat" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                    <div className={`${onLaptopScreen ? "w-[70%]" : "w-[98%]"} h-fit absolute left-0 bottom-0 z-50 px-2 flex gap-4 justify-between items-center border-b bg-primary py-1 bg-blend-darken border-secondaryLight `}>

                        <PlusIcon onClick={() => setShowAttachments(prev => !prev)} color="lightGreen" className="cursor-pointer active:scale-90 ease-linear duration-75" />

                        {showAttachments && <AttachMent setMessage={setMessage} />}
                        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-[90%]" />

                        <SendButton onClick={sendMessage} />
                    </div>

                    <ChatArea messages={chatMessages} />
                    <PersonsForChat />
                </div>
            </div>
        </ScreenWrapper>
    )
}


const AttachMent = ({ setMessage }: { setMessage: (prev: any) => void }) => {
    const [tab, setTab] = useState<number>(1)
    const addEmojiToMsg = (emoji: string) => {
        setMessage((prev: string) => prev + emoji);
    }
    return <div className="flex flex-col gap-2 w-32 h-48 sm:w-48 absolute z-50 p-5 bg-secondary rounded bottom-14 overflow-hidden" >
        <div className="flex gap-4 border border-secondaryLight p-1 rounded">
            <div
                onClick={() => setTab(1)}
                className={`cursor-pointer active:scale-90 ease-linear duration-75 pb-1 border-b ${tab === 1 ? "border-accent" : "hover:border-primary  border-transparent"}`} ><Smile /></div>
            <div
                onClick={() => setTab(2)}
                className={`cursor-pointer active:scale-90 ease-linear duration-75 pb-1 border-b ${tab === 2 ? "border-accent" : "hover:border-primary  border-transparent"}`} ><Paperclip /></div>
        </div>

        {tab === 1 ?
            <div className="flex flex-wrap gap-2 overflow-y-scroll py-1">
                {
                    ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '🥲', '🥲', '😊', '😊', '😊', '😇', '🙂', '🙃', '😉', '😌', '🥰', '😘', '😒', '🥳', '😭', '🫡', '😧', '😡', '🤧', '😓'
                    ].map((e, id) => <p
                        onClick={() => addEmojiToMsg(e)}
                        className="active:scale-95 duration-75 ease-linear cursor-pointer" key={id}>{e}</p>)
                }
            </div> :
            <div className="flex flex-wrap gap-2 py-1">
                {[FILE_SHARING_TYPE.image, FILE_SHARING_TYPE.video, FILE_SHARING_TYPE.document].map((e, id) => <FileSharingIcon fileSharingType={e} key={id} />)}
            </div>}

    </div>
}

enum FILE_SHARING_TYPE {
    image = "image",
    video = "video",
    document = "document",
}

const FileSharingIcon = ({ fileSharingType }: { fileSharingType: FILE_SHARING_TYPE }) => {
    let icon = <></>
    switch (fileSharingType) {
        case FILE_SHARING_TYPE.image:
            icon = <Image />
            break;
        case FILE_SHARING_TYPE.video:
            icon = <FileVideo />
            break;
        case FILE_SHARING_TYPE.document:
            icon = <FileText />
            break;
        default:
            icon = <></>
    }
    return (<Tooltip arrow title={fileSharingType}>
        <div className="p-1 bg-secondaryLight active:scale-95 duration-75 ease-linear rounded-lg cursor-pointer" >
            {icon}
        </div>
    </Tooltip>)
}

const PersonsForChat = () => {
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data: chatPersonsList, loading, error } = useFetch<PersonEntry[]>(fetchPersonList)

    const { username } = useParams()
    const navigate = useNavigate()
    const currentUser = useSelector((state: storeStateType) => state.youtuberInfo).user || useSelector((state: storeStateType) => state.collaboratorInfo).user

    return (<>
        {
            sideBarState.onLaptopScreen ?
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-primary dark:scrollbar-track-secondaryLight h-full w-[30%] bg-secondary">
                    <table className="table">
                        <thead>
                            <th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={currentUser?.profilepic ?? "https://res.cloudinary.com/midcloud/image/upload/v1744820917/m8wnm0onk68qqwpvsqsz.jpg"}
                                                    alt="user profile pic" />
                                            </div>
                                        </div>
                                        <div className="font-bold text-sm">{currentUser?.username}</div>
                                    </div>
                                </td>



                            </th>
                        </thead>
                        <div className="flex px-10 py-2 gap-2">

                            <MessageCircle />
                            <Users />
                        </div>
                        <tbody>
                            {chatPersonsList && chatPersonsList.map((u, i) =>

                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className={`${u.username === username ? "bg-primary" : "hover:bg-secondaryLight"} cursor-pointer relative ease-linear duration-75`}
                                    onClick={() => navigate(`../chat/${u.username}`)}
                                    key={i}
                                >
                                    <td>
                                        <div className="pl-4 flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={u.profilepic ?? "https://res.cloudinary.com/midcloud/image/upload/v1744820917/m8wnm0onk68qqwpvsqsz.jpg"}
                                                        alt="user profile pic"
                                                    />
                                                </div>
                                            </div>
                                            <div className="font-bold">{u.username}</div>
                                        </div>
                                    </td>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.2, scale: 1 }}
                                        transition={{ duration: 0.7 }}
                                        className="absolute inset-0 rounded-full bg-gradient-radial from-primary via-secondaryLight to-transparent"
                                    />
                                </motion.tr>
                            )
                            }

                        </tbody>


                    </table>
                </div> :
                <>
                    {/* <AnimatePresence>
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
                                        {chatPersonsList && chatPersonsList.map((u, i) =>

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
                    } */}
                </>
        }
    </>

    )
}

const ChatArea = ({ messages }: { messages: Map<number | string, ChatEntry> }) => {
    const { username } = useParams()
    const socket = useSocket();
    const chatAreaRef = useRef<HTMLDivElement>(null)
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages])

    const MessageList = [];
    for (const [_, value] of messages.entries()) {
        MessageList.push(value);
    }

    const newMessages = MessageList.filter((msg) => msg.status === MESSAGE_STATUS.DELIVERED && msg.from === username);
    console.log("newMessages");
    console.log(newMessages)
    useEffect(() => {
        if (newMessages.length === 0) return;
        if (!socket) return;
        socket.emit(SOCKET_EVENTS.UPDATE_MESSAGE_STATUS, newMessages)

    }, [newMessages, socket])

    const sortedMessages = MessageList.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return <div
        ref={chatAreaRef}
        className={`flex flex-col  opacity-95 justify-center px-2 items-center scrollbar-hide overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-accent dark:scrollbar-track-transparent h-full border-r border-secondary rounded ${sideBarState.onLaptopScreen ? "w-[70%]" : "w-full"} gap-2 relative `} >

        <div className="flex z-40 flex-col absolute top-44 left-0 w-full h-fit">
            <div className="flex flex-col gap-2 px-1 sm:px-5 w-full pb-28" >
                {sortedMessages.
                    map((msg, ind) =>
                        <Bubble
                            status={msg.status ?? null}
                            msgBy={msg.from}
                            text={msg.message}
                            key={ind}
                            createdAt={msg.createdAt} />
                    )
                }
            </div>

        </div>


    </div>
}

function formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}


const Bubble: React.FC<{
    msgBy?: string,
    text: string,
    createdAt: string,
    status: MESSAGE_STATUS | null
}> = ({ msgBy, text, createdAt, status }) => {

    const { username } = useParams()
    return <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`chat ${username === msgBy ? "chat-start" : "chat-end"} `} >
        <div className={`chat-bubble flex flex-col gap-1 min-w-28 sm:min-w-32 max-w-[48rem] max-h-[300px] max-[850px]:max-w-[15rem] ${BubbleColor}`}>
            <p className=" text-ellipsis text-pretty" >{text} </p>
            <div className="flex justify-between items-end" >
                <p className="text-right text-primary text-xs opacity-70" >{formatTime(createdAt)}</p>
                {username !== msgBy && <MsgStatusComp status={status} />}

            </div>
        </div>

    </motion.div>
}

const MsgStatusComp = ({ status }: { status: MESSAGE_STATUS | null }) => {
    let MsgStatus = <></>
    switch (status) {
        case MESSAGE_STATUS.UNSENT:
            MsgStatus = <Sticker size={15} />
            break;
        case MESSAGE_STATUS.SENT:
            MsgStatus = <Check size={15} />
            break;
        case MESSAGE_STATUS.DELIVERED:
            MsgStatus = <CheckCheck size={15} />
            break;
        case MESSAGE_STATUS.READ:
            MsgStatus = <CheckCheck color="blue" size={15} />
            break;
        default:
            MsgStatus = <Sticker size={15} />
            break;
    }


    return (
        <Tooltip arrow title={status}>
            {MsgStatus}
        </Tooltip>
    )
}

