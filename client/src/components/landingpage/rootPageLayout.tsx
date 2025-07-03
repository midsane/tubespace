import React, { useEffect } from "react";
import { ModeToggle } from "../toggleTheme/toggletheme";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/user.store";
import { fallback_profileImg } from "@/constast";
import { UserRole, type AuthDataType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/httpfnc/auth";
import { Skeleton } from "../ui/skeleton";

export const RootPageLayout: React.FC = () => {
    const { data, isLoading, error } = useQuery<AuthDataType>({
        queryKey: ["check-auth"],
        queryFn: checkAuth,
        enabled: useUserStore.getState().email !== "",
        staleTime: 1000 * 60 * 10 // 10 minutes
    });
    const updateState = useUserStore((state) => state.updateState);
    useEffect(() => {
        if (data) {
            updateState(data);
        }
    }, [data]);

    const navigate = useNavigate()
    return (<main>
        <nav className="flex h-[8dvh] md:h-[10dvh] border text-sidebar-foreground border-sidebar-border z-50 
        fixed top-0 left-0 right-0  px-6 py-3  items-center justify-between" >
            <div className="flex gap-6 items-center" >
                <Link to="/" ><img className="h-8" src="favicon.png" /></Link>
                
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
        </section>
    </main>
    );
};

