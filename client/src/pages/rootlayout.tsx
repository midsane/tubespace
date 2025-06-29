import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/sidebar/sidebar";

//we will use sonnar toast and shadcn dialog box

export const RootLayout: React.FC = () => {
    return (
        <main className="flex h-dvh w-dvw bg-background text-foreground ">
            <Sidebar />
            <Outlet />
        </main>
    )
}