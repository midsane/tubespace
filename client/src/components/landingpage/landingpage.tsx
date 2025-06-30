import React, { useEffect } from "react";
import { ModeToggle } from "../toggleTheme/toggletheme";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/user.store";
import { fallback_profileImg } from "@/constast";
import { UserRole, type AuthDataType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/httpfnc/auth";
import { Skeleton } from "../ui/skeleton";

export const LandingPage: React.FC = () => {
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
    return (<main className="h-dvh" >
        <nav className="flex h-[10%] px-6 py-3 border-b border-sidebar-border items-center justify-between" >
            <li>logo</li>
            <li className="flex gap-4" >
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
        <section className="flex justify-center h-[90%] items-center">
            <Outlet />
        </section>
    </main>
    );
};

