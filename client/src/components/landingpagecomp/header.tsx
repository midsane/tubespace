import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { WebsiteLogo } from "../websitelogo/websitelogo"
import { useDispatch, useSelector } from "react-redux"
import { storeDispatchType, storeStateType } from "../../store/store"
import { CircleXIcon, MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { modalActions } from "../../store/modal"
import { LoginBox } from "./Auth"
import { IOSSwitch } from "../switches/switches"
import { DarkMode } from "@mui/icons-material"
import { checkLoggedIn } from "../../fetch/fetch"
import { ProfilePic } from "../ui/profilePic/profilePic"
import { userInterface, userRole } from "../../types/youtuberTypes"

import { youtuberActions } from "../../store/youtuberStore/youtuber.slice"
import { collaboratorActions } from "../../store/collaboratorStore/collaborator.slice"


export function Header({ color = "text-gray-300" }: { color?: string }) {
    const sidebarState = useSelector((state: storeStateType) => state.sidebar)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<null | userInterface>(null)
    const youtuberInfo = useSelector((state: storeStateType) => state.youtuberInfo)
    const collaboratorInfo = useSelector((state: storeStateType) => state.collaboratorInfo)
    const dispatch: storeDispatchType = useDispatch()

    useEffect(() => {
        const checkStatus = async () => {
            const status = await checkLoggedIn()

            if (status?.data?.success) {

                setLoggedIn(true)
                setUser(status.data.user)
                if (status.data.user?.role === "youtuber" && !youtuberInfo.user)
                    dispatch(youtuberActions.setUserInfo({ user: status.data.user }))
                else if (status.data.user?.role === "collaborator" && !collaboratorInfo.user)
                    dispatch(collaboratorActions.setUserInfo({ user: status.data.user }))
            }
            setLoading(false)

        }

        checkStatus()
    }, [])

    const handleClick = () => {

        dispatch(modalActions.openMoal({
            content: <LoginBox />,
            buttons: false,
            submitText: "Login",
            title: "",
        }))
    }
    return (
        <header className="fixed top-0 left-0 right-0 z-50  border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/50">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-3">
                        <WebsiteLogo />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-8">

                    <Link to="/home" className={`text-sm  ${color} hover:text-white transition-colors`}>
                        Home
                    </Link>
                    <Link to="#" className={`text-sm ${color} hover:text-white transition-colors`}>
                        About us
                    </Link>
                    <Link to="#" className={`text-sm ${color} hover:text-white transition-colors`}>
                        Pricing
                    </Link>
                    <Link to="#" className={`text-sm ${color} hover:text-white transition-colors`}>
                        Contact
                    </Link>
                </nav>


                {sidebarState.onLaptopScreen ?
                    <div className="flex gap-8 items-center">
                        <IOSSwitch color="error" size="medium" icon={<DarkMode />} />
                        {loggedIn && <ProfilePic role={user?.role === "youtuber" ? userRole.YOUTUBER : userRole.COLLABORATOR} imageSrc={user?.profilepic ?? undefined} userName={user?.username} />
                        }
                        {!loggedIn && !loading && <Button
                            onClick={handleClick}
                            size={`${sidebarState.onLaptopScreen ? "large" : "small"}`} variant="contained" >
                            Login
                        </Button>}
                        {!loggedIn && loading && <ProfilePic role={user?.role === "youtuber" ? userRole.YOUTUBER : userRole.COLLABORATOR} loading />}
                    </div>
                    :
                    <div className="flex gap-2 justify-center items-center">

                        <div className="flex gap-3 items-center">
                            <IOSSwitch color="error" size="medium" icon={<DarkMode />} />

                            {!loggedIn && loading && <ProfilePic role={user?.role === "youtuber" ? userRole.YOUTUBER : userRole.COLLABORATOR} loading />}
                            {!loggedIn && !loading && <Button
                                onClick={handleClick}
                                size={`${sidebarState.onLaptopScreen ? "large" : "small"}`} variant="contained" >
                                Login
                            </Button>}

                            {loggedIn && <ProfilePic role={user?.role === "youtuber" ? userRole.YOUTUBER : userRole.COLLABORATOR} imageSrc={user?.profilepic ?? undefined} userName={user?.username} />}

                        </div>
                        <MenuIcon onClick={() => setShowMenu(true)} size={30} className="cursor-pointer active:scale-90 ease-linear duration-75" />
                    </div>
                }
                <AnimatePresence>
                    {showMenu &&
                        <motion.div
                            initial={{ scaleY: 0, opacity: 0, y: -50 }}
                            animate={{ scaleY: 1, opacity: 1, y: 0 }}
                            exit={{ scaleY: 0, opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="w-screen flex flex-col justify-center items-center gap-10 h-[100dvh] bg-primary bg-opacity-95 fixed top-0 left-0 z-50 origin-top"
                        >
                            <CircleXIcon
                                className="cursor-pointer active:scale-90 ease-linear duration-75"
                                size={30}
                                onClick={() => setShowMenu(false)} />
                            <nav className="flex flex-col items-center italic font-extrabold text-xl  gap-7">
                                <Link to="/home" className={`ease-linear duration-75 text-sm  ${color} hover:scale-110 hover:text-accent transition-colors`}>
                                    Home
                                </Link>
                                <Link to="#" className={`ease-linear duration-75 text-sm ${color} hover:scale-110 hover:text-accent transition-colors`}>
                                    About us
                                </Link>
                                <Link to="#" className={`ease-linear duration-75 text-sm ${color} hover:scale-110 hover:text-accent transition-colors`}>
                                    Pricing
                                </Link>
                                <Link to="#" className={`ease-linear duration-75 text-sm ${color} hover:scale-110 hover:text-accent transition-colors`}>
                                    Contact
                                </Link>
                            </nav>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </header>
    )
}


