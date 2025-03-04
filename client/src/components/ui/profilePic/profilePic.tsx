import { Avatar } from "@mui/material"
import { ReactNode, useState, useRef, useEffect } from "react"
import { HomeIcon, LogOutIcon, SettingsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

export const ProfilePic = ({ imageSrc, userName, loading = false }: { imageSrc?: string, userName?: string, loading?: boolean }) => {

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


    return (<div className="">
        {imageSrc ?
            <Avatar
                className="w-20 group-hover:opacity-55 h-20"
                src={imageSrc}
                sx={{ width: "4rem", height: "4rem" }}
            /> :
            <>
                <div className="relative">
                    <div
                        onClick={(e) => {
                            if (loading) return
                            e.stopPropagation()
                            setShowMenu(prev => !prev)
                        }}
                        className={`hover:opacity-100  cursor-pointer border-2 border-secondaryLight flex justify-center items-center opacity-85 ${loading && "skeleton"} `}
                        style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }}>
                        {!loading && userName?.charAt(0).toUpperCase()}
                    </div>
                    <AnimatePresence>
                        {showMenu && <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            ref={menuRef} className="absolute bottom-100 right-[10%]">
                            <ul className="menu border-2 shadow-sm shadow-secondary border-primary bg-base-200 rounded-box w-32 gap-2 ">
                                <List link="home" paraTxt="Home" Icon={<HomeIcon size={18} />} />
                                <List link="settings" paraTxt="Settings" Icon={<SettingsIcon size={18} />} />
                                <List link="logout" paraTxt="Logout" Icon={<LogOutIcon size={18} />} />

                            </ul>
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </>
        }
    </div>)
}

const List = ({ paraTxt, Icon, link }: { paraTxt: string, Icon: ReactNode, link: string }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(link)} className="flex px-w w-full py-1 p-2 rounded-md justify-between hover:bg-secondaryLight cursor-pointer ease-linear duration-75 opacity-70">
            <p>{paraTxt}</p>
            {Icon}
        </div>
    )
}
