import { Avatar } from "@mui/material"
import { ReactNode, useState, useRef, useEffect } from "react"
import { HomeIcon, LogOutIcon, SettingsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { userRole } from "../../../types/youtuberTypes"

export enum ProfileSize {
    small = "small",
    medium = "medium",
    large = "large"
}

export const ProfilePic = ({
    size = ProfileSize.medium,
    role,
    imageSrc,
    userName,
    loading = false,
}: { imageSrc?: string, userName?: string, loading?: boolean, role?: userRole, size?: ProfileSize }) => {

    let sxH: string, pH: string

    const menuRef = useRef<HTMLDivElement>(null)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, [showMenu])

    switch (size) {
        case ProfileSize.small:
            sxH = "2";
            pH = "7";
            break;

        case ProfileSize.medium:
            sxH = "3";
            pH = "10";
            break;
        case ProfileSize.large:
            sxH = "5";
            pH = "24";
            break;
        default:
            sxH = "4";
            pH = "14";
            break;
    }

    return (<div className="">
        {imageSrc ?
            <Avatar
                className={`w-${pH} w-10 group-hover:opacity-55 h-${pH}`}
                src={imageSrc}
                sx={{ width: `${sxH}rem`, height: `${sxH}rem` }}
            /> :
            <>
                <div className="relative">
                    <div
                        onClick={(e) => {
                            if (loading) return
                            e.stopPropagation()
                            setShowMenu(prev => !prev)
                        }}
                        className={`hover:opacity-100  ${size === ProfileSize.small ? "text-xs border" : "text-sm border-2"} cursor-pointer border-secondaryLight flex justify-center items-center opacity-85 ${loading && "skeleton"} `}
                        style={{ width: `${sxH}rem`, height: `${sxH}rem`, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }}>
                        {!loading && userName?.charAt(0).toUpperCase()}
                    </div>
                    {role &&
                        <AnimatePresence>
                            {showMenu && <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                ref={menuRef} className="absolute bottom-100 right-[10%]">
                                <ul className="menu border-2 shadow-sm shadow-secondary border-primary bg-base-200 rounded-box w-32 gap-2 ">
                                    <List role={role} username={userName} link="home" paraTxt="Home" Icon={<HomeIcon size={18} />} />
                                    <List role={role} username={userName} link="settings" paraTxt="Settings" Icon={<SettingsIcon size={18} />} />
                                    <List role={role} username={userName} link="logout" paraTxt="Logout" Icon={<LogOutIcon size={18} />} />

                                </ul>
                            </motion.div>}
                        </AnimatePresence>}
                </div>
            </>
        }
    </div>)
}



const List = ({ role, paraTxt, Icon, username, link }: { paraTxt: string, link: string, Icon: ReactNode, username: string | undefined, role: userRole }) => {
    const navigate = useNavigate()
    const prefix = role === userRole.YOUTUBER ? "y" : "c"
    let finalLink = `${prefix}/${username}/${link}`;
    if (link.toLowerCase() === "logout") finalLink = "/logout"
    return (
        <div onClick={() => navigate(finalLink)} className="flex px-w w-full py-1 p-2 rounded-md justify-between hover:bg-secondaryLight cursor-pointer ease-linear duration-75 opacity-70">
            <p>{paraTxt}</p>
            {Icon}
        </div>
    )
}
