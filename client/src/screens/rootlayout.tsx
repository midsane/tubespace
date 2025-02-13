import { Outlet } from "react-router-dom"

export const RootLayout: React.FC = () => {
    return (
        <main className="min-h-screen bg-black liter-regular">
            <Outlet />
        </main>
    )
}

