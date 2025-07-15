import React, { useEffect } from "react";
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

export const RootPageLayout: React.FC = () => {
    const location = useLocation();

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
    return (<main className="" >
        <nav className="flex h-[8dvh] md:h-[10dvh] border-3 text-sidebar-foreground border-sidebar-border z-50 
        fixed top-2 left-1/2 -translate-x-1/2 py-1 w-[80%] items-center justify-around
        rounded-4xl bg-sidebar
        " >
            <div className="flex items-center" >
                <Link to="/" ><img className="h-8" src={logo} /></Link>
            </div>
            <div className="flex gap-10 items-center" >
                <a href="/#features" onClick={handleClick} >Features</a>
                <Link to="/pricing" >Pricing</Link>
                <Link to="/working" >How it works</Link>
            </div>

            <li className="flex gap-4 items-center" >
                <ModeToggle />
                {!isLoading ?
                    data ?
                        <img
                            onClick={() => navigate(`/${data.role === UserRole.EDITOR ? "c" : "y"}/profile/${data.name}`)}
                            className="w-10 rounded-full border border-border aspect-square object-cover "
                            src={data.profileImgUrl || fallback_profileImg}
                        />
                        :
                        <Button onClick={() => navigate("/auth")} variant="outline">Signup</Button>
                    :
                    <Skeleton className="w-10 rounded-full border border-border aspect-square object-cover" />
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

