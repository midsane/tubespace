import React, { useState } from "react";
import { ModeToggle } from "../toggleTheme/toggletheme";

export const LandingPage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    return (<main>
        <nav className="flex px-6 py-3 border-b border-white/20 items-center justify-between" >
            <li>logo</li>
            <li className="flex gap-4" >
                <ModeToggle />
                {loggedIn ? <div className="w-10 aspect-square rounded-full bg-red-200" >
                    profile</div> :
                    <button className="border border-white/20 px-4 py-1 rounded cursor-pointer active:scale-95 ease-in duration-75" >login</button>
                }
            </li>
        </nav>
    </main>
    );
};

