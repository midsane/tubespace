import { useSelector } from "react-redux";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WebsiteLogo } from "./websitelogo/websitelogo";
import React, { ReactNode } from "react";
import { storeStateType } from "../store/store";

interface sidebarInterface {
    links: (string | JSX.Element)[][],
    preRouter?: string,
    loading: boolean
}

export const Sidebar: React.FC<sidebarInterface> = ({
    loading,
    links,
    preRouter = "/" }) => {

    const onLaptopScreen = useSelector((state: any) => state.sidebar.onLaptopScreen);
    return (<>
        {onLaptopScreen ?
            <div
                className={`border max-[1021px]:text-sm flex justify-center border-secondaryLight gap-4  text-slate-300 rounded-r-3xl h-[100dvh] w-[18vw]`}>

                <div className="w-fit sm:px-4 lg:px-10 xl:px-12  h-full flex flex-col" >
                    <div className="flex flex-col h-fit gap-4 pl-0 py-10">
                        <Link to="/" className="flex items-center gap-3">
                            <WebsiteLogo />
                        </Link>
                    </div>

                    <div className="flex flex-col py-20 gap-4">
                        {links?.map((icon, ind) =>
                            <IconParent
                                loading={loading}
                                showTxt={true}
                                preRoute={preRouter}
                                label={icon[0] as string}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>

                    <div className="flex flex-col gap-2">
                        {[["Settings", <Settings />], ["Logout", <Logout />]].map((icon, ind) =>
                            <IconParent
                                loading={loading}
                                showTxt={true}
                                label={icon[0] as string}
                                preRoute={preRouter}
                                key={ind}>
                                {icon[1]}
                            </IconParent>)}
                    </div>
                </div>
            </div>
            :
            <div
                className={`flex flex-col  items-center justify-between pb-4 border border-secondaryLight bg-black text-slate-300 rounded-r-3xl h-[100dvh] max-[520px]:w-[15vw] w-[10vw]`}>

                <div className="flex flex-col gap-1 px-0 pt-9 pb-10 ">
                    <Link to="/" className="sm:pl-2 lg:pl-6">
                        <WebsiteLogo noText />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 pb-16 w-full ">
                    {links?.map((icon, ind) =>
                        <IconParent
                            loading={loading}
                            preRoute={preRouter}
                            label={icon[0] as string}
                            key={ind}>
                            {icon[1]}
                        </IconParent>)}
                </div>
                <div className="flex flex-col gap-3 pt-44 w-full ">
                    {[
                        ["Settings", <Settings />], ["Logout", <Logout />]
                    ].map((icon, ind) =>
                        <IconParent
                            loading={loading}
                            preRoute={preRouter}
                            label={icon[0] as string}
                            key={ind}>
                            {icon[1]}
                        </IconParent>)}
                </div>
            </div>
        }
    </>
    )
}


interface IconParentInterface {
    children: ReactNode,
    preRoute?: string,
    label: string,
    showTxt?: boolean,
    loading: boolean
}

const IconParent: React.FC<IconParentInterface> =
    ({
        children,
        label,
        showTxt = false,
        preRoute = "/",
        loading

    }) => {
        if (label.toLowerCase() === "logout") {
            preRoute = "/"
        }

        const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar.onLaptopScreen);
        const route = window.location.pathname.toLowerCase();
        const navigate = useNavigate()


        return (
            <span

                onClick={() => { if (!loading) navigate(preRoute + label) }}

                className={`flex gap-4 w-full ${!loading && "hover:bg-secondary cursor-pointer"} ${route.slice(1, route.length) === label.toLowerCase() ? "text-opacity-100 text-accent" : "text-opacity-50 text-label"} ${!onLaptopScreen ? "justify-center w-fit px-0" : "px-2"}  ease-linear duration-75  items-center  active:scale-95  py-1 rounded`}>

                <div
                    className={`cursor-pointer ${loading && "skeleton w-7 h-7 sm:w-10 sm:h-10 rounded"} `} >
                    {!loading && children}
                </div>
                {showTxt && <p className={`${loading && "skeleton rounded h-5 w-20"}`} >{!loading && label}</p>}

            </span>
        )
    }

