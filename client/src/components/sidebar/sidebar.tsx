import { Bell, LogOutIcon, MessageCircle, StickyNote, UserRoundPen, } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import logoImage from "/favicon.png"
import { useLocation, useNavigate } from "react-router-dom"
import { useScreenSizeStore } from "@/store/screenSizestate"
import { LogoutBox } from "../dialogbox/logout"


export const Sidebar = () => {
    const { mobileView, changeMobileView } = useScreenSizeStore()
    const [ICON_SIZE, setIconSize] = useState<number>(25);
    const [logoSize, setLogoSize] = useState<number>(40);
    const UppersidebarItems = [
        {
            text: "Tubespace",
            icon: <img src={logoImage} height={logoSize} width={logoSize} />
        },
        {
            text: "Profile",
            icon: <UserRoundPen size={ICON_SIZE} />
        },
        {
            text: "Tasks",
            icon: <StickyNote size={ICON_SIZE} />
        },
        {
            text: "Messages",
            icon: <MessageCircle size={ICON_SIZE} />
        },
        {
            text: "Notifications",
            icon: <Bell size={ICON_SIZE} />
        },

    ]

    const LowersidebarItems = [
        {
            text: "Logout",
            icon: <LogOutIcon size={ICON_SIZE} />
        },
    ]

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1100) {
                changeMobileView(true);
                setIconSize(20);
                setLogoSize(35);
            }
            else if (window.innerWidth < 400) {
                changeMobileView(true);
                setIconSize(18);
                setLogoSize(30);
            }
            else {
                changeMobileView(false);
                setIconSize(25);
                setLogoSize(40);
            }

        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (<nav className={`flex flex-col h-full w-fit pb-2 ${mobileView ? "sm:px-1 pt-4" : "pt-1 px-4  xl:px-6"} rounded-br-2xl  rounded-tr-2xl border border-sidebar-border justify-between bg-popover text-popover-foreground`} >
        <ul className="flex justify-center flex-col gap-4 p-2" >
            {UppersidebarItems.map(item => <NavItem mobileView={mobileView} key={item.text} {...item} />)}
        </ul>

        <ul className="flex justify-center flex-col gap-4 p-2" >
            {LowersidebarItems.map(item => <NavItem mobileView={mobileView} key={item.text} {...item} />)}
        </ul>

    </nav>)
}

const NavItem = ({ mobileView, text, icon }: { mobileView: boolean, text: string, icon: ReactNode }) => {
    const navRoute = useLocation().pathname.split('/')[1].toLowerCase()
    const navigation = useNavigate()
    const selected = navRoute === text.toLowerCase();
    const handleNavigate = () => {
        const redirectRoute = text.toLowerCase() === "tubespace" ? "/" : text.toLowerCase()
        navigation(redirectRoute)
    }

    const JSX = <span
        className={`${selected ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border"
            : "border-transparent text-foreground"} items-center border rounded-sm flex py-2 cursor-pointer ${text === "Tubespace" ?
                `mb-6 gap-2 ${!mobileView ? "pl-3 pr-2" : ""}` : `gap-4 ${mobileView ? "px-2" : "px-5"} hover:border-sidebar-border `}" `} >
        <span>{icon}</span>
        {!mobileView && <h2 className={`${text === "Tubespace" && "mt-1 ml-1"}`} >{text}</h2>}

    </span>

    if (text.toLowerCase() === "logout")
        return <LogoutBox TriggerJsx={JSX} />

    return (<span
        onClick={handleNavigate}
        className={`${selected ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border"
            : "border-transparent text-foreground"} items-center border rounded-sm flex py-2 cursor-pointer ${text === "Tubespace" ?
                `mb-6 gap-2 ${!mobileView ? "pl-3 pr-2" : ""}` : `gap-4 ${mobileView ? "px-2" : "px-5"} hover:border-sidebar-border `}" `} >
        <span>{icon}</span>
        {!mobileView && <h2 className={`${text === "Tubespace" && "mt-1 ml-1"}`} >{text}</h2>}

    </span>)
}