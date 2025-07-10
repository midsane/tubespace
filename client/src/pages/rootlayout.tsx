import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/sidebar/sidebar";

import { Toaster } from "@/components/ui/sonner"

export const RootLayout: React.FC = () => {
    return (
        <main className="flex h-dvh w-dvw bg-background text-foreground ">
            <Sidebar />
            <Outlet />
            <Toaster closeButton richColors  position="top-center" />
        </main>
    )
}