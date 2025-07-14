import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/sidebar/sidebar";

import { useScreenSizeStore } from "@/store/screenSizestate.store";
import { useUploadVideo } from "@/store/uploadVideo.store";
import { useEffect } from "react";

export const RootLayout: React.FC = () => {
    const mobileView = useScreenSizeStore((state) => state.mobileView);
    const resetUploadVideoTaskId = useUploadVideo((state) => state.resetState)
    useEffect(() => {
        resetUploadVideoTaskId();
    }, [resetUploadVideoTaskId]);

    
    return (
        <main className={`flex ${mobileView && "flex-col-reverse"} h-screen w-screen bg-background text-foreground `}>
            <Sidebar />
            <Outlet />
        </main>
    )
}