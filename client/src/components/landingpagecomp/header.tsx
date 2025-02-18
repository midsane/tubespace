import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { WebsiteLogo } from "../websitelogo/websitelogo"

export function Header({color = "text-gray-300"}: {color?: string}) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/50">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-3">
                       <WebsiteLogo />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                   
                    <Link to="/home" className={`text-sm  ${color} hover:text-white transition-colors`}>
                        Home
                    </Link>
                    <Link to="#" className={`text-sm ${color} hover:text-white transition-colors`}>
                        About us
                    </Link>
                    <Link to="#" className={`text-sm ${color} hover:text-white transition-colors`}>
                        Pricing
                    </Link>
                    <Link to="#" className={`text-sm ${color} hover:text-white transition-colors`}>
                        Contact
                    </Link>
                </nav>
                <Button variant="contained" >
                    Login
                </Button>
            </div>
        </header>
    )
}

