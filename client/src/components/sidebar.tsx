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
                    className={`flex flex-col border max-[1021px]:text-sm border-secondaryLight gap-4 bg-black text-slate-300 rounded-r-3xl h-screen w-[18vw]`}>

                    <div className="flex flex-col h-fit gap-4 pt-10 max-[1021px]:px-5 px-10">
                        <Link to="/" className="flex items-center gap-3">
                            <WebsiteLogo />
                        </Link>
                    </div>


                    <div className="flex flex-col py-20 gap-4 px-10 max-[1021px]:px-5">
                        {[["Home", <Home />], ["Create", <AddCircleOutline />], ["Collab", <GroupsIcon />], ["Chat", <Chat />]].map((icon, ind) =>
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
                    className={`flex flex-col min-w-16 items-center justify-between pb-28 border border-secondaryLight bg-black text-slate-300 rounded-r-3xl h-screen w-[10vw]`}>

                    <div className="flex flex-col gap-1 py-10 ">
                        <WebsiteLogo noText />
                    </div>
                    <div className="flex flex-col gap-1 py-10 ">
                        {[["Home", <Home />], ["Create", <AddCircleOutline />], ["Collab", <GroupsIcon />], ["Chat", <Chat />]].map((icon, ind) =>
                            <IconParent
                                label={icon[0] as string}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>
                    <div className="flex flex-col gap-1 py-10 ">
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
    const navigate = useNavigate()
    return <span onClick={() => navigate("/" + label)} className="flex gap-4 text-slate-300 cursor-pointer hover:bg-secondary ease-linear duration-75 active:scale-95 p-2 rounded">
        <div className="cursor-pointer" >{children}</div>
        {showTxt && <p>{label}</p>}
    </span>
}
