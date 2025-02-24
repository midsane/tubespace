import { useSelector } from "react-redux";
import React, { useState } from "react";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ScreeAreaTxt } from "../components/screenAreaTxt";
import { storeStateType } from "../store/store";

import { TabsWrappedLabel3 } from "../components/tabs";
import { Edit, Save } from "lucide-react";




export const SettingScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapper>
            <div className="flex h-full relative justify-center bg-black items-center ">

                <ScreeAreaTxt border title="Settings" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <SettingsArea />
            </div>
        </ScreenWrapper>
    )
}

const GeneralSettings = () => {
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("adi");
    return (<div className={`flex flex-col gap-10 p-10 justify-start items-center rounded-2xl border border-secondaryLight h-[90%] w-[95%] sm:w-[90%] `}>
        <div className="flex gap-2 w-full  " >

            {isEditingUsername ?
                <>

                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={'username'} className="input max-[500px]:input-sm input-bordered max-[500px]:w-52 w-60" />
                    <button className="btn max-[500px]:btn-sm btn-square btn-outline">
                        <Save onClick={() => setIsEditingUsername(false)} size={18} />
                    </button>
                </>
                :
                <>
                    <div className="flex justify-start px-2 py-1 sm:px-4 sm:py-2 items-center border border-secondaryLight rounded-lg max-[500px]:w-52 w-60" >{username}</div>
                    <button className="btn max-[500px]:btn-sm btn-square btn-outline">
                        <Edit onClick={() => setIsEditingUsername(true)} size={18} />
                    </button>
                </>

            }
        </div>

    </div>)
}
const BillingSettings = () => {
    return (<div className={`flex flex-col gap-10 p-10 justify-start items-center rounded-2xl border border-secondaryLight h-[90%] w-[95%] sm:w-[90%] `}>

    </div>)
}


const SettingsArea = () => {

    const [value, setValue] = useState<string>('one');
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    let TabSection = <></>
    switch (value) {
        case "one":
            TabSection = <GeneralSettings />
            break;
        case "two":
            TabSection = <BillingSettings />
            break;
    }


    return (<div className={`w-[90%] gap-2 text-xs sm:text-sm  justify-start pt-24 items-center h-full relative flex flex-col  sm:gap-2 ${!onLaptopScreen ? "sm:w-[90%]" : "sm:w-[80%]"} `} >
        <TabsWrappedLabel3 value={value} setValue={setValue} />

        <div className=" h-[90%] flex w-full flex-col justify-center items-center">
            <div className="w-full items-center flex justify-between py-6 px-4 h-fit">

            </div>
            {TabSection}
        </div>
    </div>)
}


