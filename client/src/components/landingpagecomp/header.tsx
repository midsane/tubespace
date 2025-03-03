import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { WebsiteLogo } from "../websitelogo/websitelogo"
import { useDispatch, useSelector } from "react-redux"
import { storeDispatchType, storeStateType } from "../../store/store"
import { CircleXIcon, MenuIcon } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { modalActions } from "../../store/modal"
import { LoginBox } from "./Auth"


export function Header({ color = "text-gray-300" }: { color?: string }) {
    const sidebarState = useSelector((state: storeStateType) => state.sidebar)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const dispatch: storeDispatchType = useDispatch()
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
                    <Button
                        onClick={handleClick}
                        size={`${sidebarState.onLaptopScreen ? "large" : "small"}`} variant="contained" >
                        Login
                    </Button>
                    :
                    <div className="flex gap-2 justify-center items-center">
                        <Button
                            onClick={handleClick}
                            size={`${sidebarState.onLaptopScreen ? "large" : "small"}`} variant="contained" >
                            Login
                        </Button>
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
                            <nav className="flex flex-col items-center gap-7">

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
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </header>
    )
}

