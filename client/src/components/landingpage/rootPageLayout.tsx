import React, { memo, useCallback, useEffect, useState } from "react";
import { ModeToggle } from "../toggleTheme/toggletheme";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/user.store";
import { fallback_profileImg, logo } from "@/constast";
import { UserRole, type AuthDataType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/httpfnc/auth";
import { Skeleton } from "../ui/skeleton";
import { Toaster } from "@/components/ui/sonner"
import { MorphedMenu } from "../menu/menu";
import { GradientText } from "../text-animation/text-animations";

export const RootPageLayout: React.FC = () => {
    const location = useLocation();
    const [openMenu, _setOpenMenu] = useState(false);
    const setOpenMenu = useCallback((val: boolean) => _setOpenMenu(val), [])
    const { data, isLoading } = useQuery<AuthDataType>({
        queryKey: ["check-auth"],
        queryFn: checkAuth,
        enabled: useUserStore.getState().user.email !== "",
    });
    const updateState = useUserStore((state) => state.updateState);
    useEffect(() => {
        if (data) {
            updateState(data);
        }
    }, [data]);

    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (location.pathname === "/") {
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        }
        else {
            navigate("/", { state: { scrollToId: "features" } });
        }
    }

    useEffect(() => {
        const scrollToId = location.state?.scrollToId;

        if (scrollToId) {
            const el = document.getElementById(scrollToId);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
            navigate(location.pathname, { replace: true, state: null });

        }
    }, [location]);


    return (<main >
        <nav className="flex h-[8dvh] md:h-[10dvh] border text-sidebar-foreground border-sidebar-border z-50 
        fixed top-2 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[80%] items-center justify-between
        rounded-4xl bg-sidebar px-10 
        " >
            <div className="flex gap-2 items-center justify-start">
                <AnimatePresence>{openMenu && <MenuSheet setOpenMenu={setOpenMenu} />}</AnimatePresence>
                <div className="hidden sm:block" >
                    <Link to="/" ><img className="h-8" src={logo} /></Link>
                </div>
                <div className="sm:hidden flex gap-2 items-center relative">
                    <span className="opacity-0">asdf</span>
                    <img className="h-8 opacity-0" src={logo} />
                    <div

                        className="w-fit h-full fixed top-0 flex gap-2 items-center left-10 z-[310]">
                        <span
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault();


                            }}
                        ><MorphedMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
                        </span>
                        <Link to="/" ><img className="h-8" src={logo} /></Link>
                    </div>
                </div>

                <div className="sm:flex hidden gap-10 items-center w-fit" >
                    <a href="/#features" onClick={handleClick} >Features</a>
                    <Link to="/pricing" >Pricing</Link>
                    <Link to="/working" >How it works</Link>
                </div>

            </div>
            <li className="flex gap-3 items-center" >
                <ModeToggle />
                {!isLoading ?
                    data ?
                        <img
                            onClick={() => navigate(`/${data.role === UserRole.EDITOR ? "c" : "y"}/profile/${data.name}`)}
                            className="w-9 sm:w-10 rounded-full border border-border aspect-square object-cover "
                            src={data.profileImgUrl || fallback_profileImg}
                        />
                        :
                        <Button onClick={() => navigate("/auth")} variant="outline">Signup</Button>
                    :
                    <Skeleton className="w-9 sm:w-10 rounded-full border border-border aspect-square object-cover" />
                }
            </li>

        </nav>
        <section className="flex justify-center items-center">
            <Outlet />
            <Toaster closeButton richColors position="top-center" />
        </section>
    </main>
    );
};

import { AnimatePresence, motion } from "framer-motion";

export const MenuSheet = memo(({ setOpenMenu }: { setOpenMenu: (val: boolean) => void }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        setOpenMenu(false);
    }

    const handleClickFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (location.pathname === "/") {
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            setOpenMenu(false);
        }
        else {
            setOpenMenu(false);
            navigate("/", { state: { scrollToId: "features" } });
        }
    }
    return (<motion.aside
        initial={{ x: "-50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-50%", opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed z-[300] -top-5 right-0 w-fit px-10 " >
        <div className="flex flex-col gap-6 items-center 
        justify-start rounded-2xl border border-border py-28 h-fit w-screen bg-sidebar text-foreground">

            <Link onClick={handleClick} to="/"><GradientText size="small" text="Tubespace" /></Link>
            <nav className="flex flex-col gap-4">
                <a onClick={handleClickFeatures} className="text-lg" >Features</a>
                <Link onClick={handleClick} to="/pricing" className="text-lg" >Pricing</Link>
                <Link onClick={handleClick} to="/working" className="text-lg" >How it works</Link>
            </nav>
        </div>
    </motion.aside>)
})