import React, { useState } from "react";
import { ModeToggle } from "../toggleTheme/toggletheme";
import {  LoginBox } from "../dialogbox/loginbox";

export const LandingPage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    return (<main>
        <nav className="flex px-6 py-3 border-b border-sidebar-border items-center justify-between" >
            <li>logo</li>
            <li className="flex gap-4" >
                <ModeToggle />
                {loggedIn ? <div className="w-10 aspect-square rounded-full" >
                    profile</div> :
                   <LoginBox />
                }
            </li>
        </nav>

    </main>
    );
};

