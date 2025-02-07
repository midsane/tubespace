import { Outlet } from "react-router-dom"
import { Header } from "../components/landingpagecomp/header"

export const RootLayout: React.FC = ({children}) => {
    return (
        <main className="min-h-screen bg-black liter-regular">
            <Header />
            <Outlet>
                {children}
            </Outlet>
        </main>
    )
}
