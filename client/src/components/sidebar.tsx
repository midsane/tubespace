import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import GroupsIcon from '@mui/icons-material/Groups';

import { AddCircleOutline, Chat, Logout } from "@mui/icons-material";
import { Home, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WebsiteLogo } from "./websitelogo/websitelogo";
import { ReactNode } from "react";

export const Sidebar = () => {
    const onLaptopScreen = useSelector((state: any) => state.sidebar.onLaptopScreen);
    return (<>
        <AnimatePresence>
            {onLaptopScreen ?
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col border max-[1021px]:text-sm border-secondaryLight gap-4 bg-black text-slate-300 rounded-r-3xl h-[100dvh] w-[18vw]`}>

                    <div className="flex flex-col h-fit gap-4 pt-10 max-[1021px]:px-5 px-10">
                        <Link to="/" className="flex items-center gap-3">
                            <WebsiteLogo />
                        </Link>
                    </div>


                    <div className="flex flex-col py-20 gap-4 px-10 max-[1021px]:px-5">
                        {[["Home", <Home />], ["Create", <AddCircleOutline />], ["office", <GroupsIcon />], ["Chat", <Chat />]].map((icon, ind) =>
                            <IconParent
                                showTxt={true}
                                label={icon[0] as string}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>

                    <div className="flex flex-col gap-2 p-10 max-[1021px]:px-5">
                        {[["Settings", <Settings />], ["Logout", <Logout />]].map((icon, ind) =>
                            <IconParent
                                showTxt={true}
                                label={icon[0] as string}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>
                </motion.div>
                :
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col  items-center justify-between pb-4 border border-secondaryLight bg-black text-slate-300 rounded-r-3xl h-[100dvh] max-[520px]:w-[15vw] w-[10vw]`}>

                    <div className="flex flex-col gap-1 pt-9 pb-10 ">
                        <Link to="/">
                            <WebsiteLogo noText />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1 pb-16 ">
                        {[["Home", <Home />], ["Create", <AddCircleOutline />], ["Office", <GroupsIcon />], ["Chat", <Chat />]].map((icon, ind) =>
                            <IconParent
                                label={icon[0] as string}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>
                    <div className="flex flex-col gap-1 pt-44 ">
                        {[["Settings", <Settings />], ["Logout", <Logout />]].map((icon, ind) =>
                            <IconParent
                                label={icon[0] as string}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    </>
    )
}


const IconParent: React.FC<{ children: ReactNode, label: string, showTxt?: boolean }> = ({ children, label, showTxt = false }) => {
    const route = window.location.pathname.toLowerCase();
    const navigate = useNavigate()
    return <span onClick={() => navigate("/" + label)} className={`flex gap-4 cursor-pointer hover:bg-secondary ${route.slice(1, route.length) === label.toLowerCase() ? "text-opacity-100 text-accent" : "text-opacity-50 text-label"} ease-linear duration-75 active:scale-95 p-2 rounded`}>
        <div className="cursor-pointer" >{children}</div>
        {showTxt && <p>{label}</p>}
    </span>
}
