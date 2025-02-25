import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeDispatchType, storeStateType } from "../../store/store";

import { TabsWrappedLabel3 } from "../../components/tabs";
import { CircleUser, Edit, Save, Shapes, Skull, X } from "lucide-react";
import { motion } from "framer-motion"
import { IOSSwitch } from "../../components/switches/switches";
import { Button } from "@mui/material";
import { modalActions } from "../../store/modal";
import { ProfileImageUploader } from "../../components/profileImageUpdater";


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

enum settingsFiledsType {
    username,
    password,
}

const GeneralSettings = () => {
    const dispatch: storeDispatchType = useDispatch()

    const deleteAccount = () => {

    }

    const deactivateAccount = () => {
    }

    const handleAccountPreferenceModal = () => {
        dispatch(modalActions.openMoal(
            {
                content: <div className="flex w-full flex-col h-full gap-10">
                    <div className="flex flex-col gap-2">
                        <Button onClick={deactivateAccount} color="warning" className="w-full" variant="outlined">
                            <div className="w-full gap-2 justify-start px-1 py-1 sm:py-2 flex items-center" >
                                <Shapes size={20} />
                                <span>Deactivate Account</span>
                            </div>

                        </Button>
                        <p className="w-72 opacity-70 sm:w-96" >Deactivating your account will not show you profile in colloaborator/Youtuber's list</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button onClick={deleteAccount} color="error" className="w-full" variant="outlined">
                            <div className="w-full gap-2 justify-start px-1 py-1 sm:py-2 flex items-center" >
                                <Skull size={20} />
                                <span>Delete Account</span>
                            </div>
                        </Button>
                        <p className="w-72 opacity-70 sm:w-96" >Deleting your account will completely remove all your profile data.</p>
                    </div>


                </div>,
                title: "Account Preference",
            }
        ))
    }

    return (<div className={`flex flex-col p-8 gap-8 sm:gap-10 sm:p-10 overflow-y-scroll overflow-x-hidden justify-start items-center rounded-2xl border border-secondaryLight h-[90%] w-[95%] sm:w-[90%] scroll-smooth scrollbar-thin dark:scrollbar-track-primary  dark:scrollbar-thumb-accent `}>
        <div className="flex flex-col gap-8 sm:gap-10 w-fit justify-center items-center" >
            <ProfileImageUploader imgUrl="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/9997313/Devilman_Crybaby_Queeen_Bee_Clip_02.jpg?quality=90&strip=all&crop=7.8125%2C0%2C84.375%2C100&w=1080" />
            <SettingsFields type={settingsFiledsType.username} label="username" />
            <SettingsFields type={settingsFiledsType.username} label="password" />
            <SettingsToggle label="Whatsapp" type={SettingsToggleType.Whatsapp} />
            <SettingsToggle label="Email" type={SettingsToggleType.Email} />

            <SettingsToggle label="Push Notification" type={SettingsToggleType.PushNotification} />
            <Button onClick={handleAccountPreferenceModal} color="warning" className="w-full" variant="outlined">
                <div className="w-full gap-2 justify-center px-1 py-1 sm:py-2 flex items-center" >
                    <CircleUser size={20} />
                    <span>Account Preference</span>
                </div>
            </Button>
        </div>

    </div>)
}


enum SettingsToggleType {
    Whatsapp,
    Email,
    SMS,
    PushNotification
}


const SettingsToggle: React.FC<{ label: string, type?: SettingsToggleType }> = ({ label }) => {

    return (
        <div className="justify-between flex gap-1 w-full items-center">
            <p className="pl-2 opacity-70">{label}</p>
            <IOSSwitch color="warning" defaultChecked />
        </div>
    )
}


const SettingsFields: React.FC<{ type: settingsFiledsType, label: string }> = ({ type, label }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingTxt, setEditingTxt] = useState<string>("");
    const [txt, setTxt] = useState<string>("");

    useEffect(() => {
        switch (type) {
            case settingsFiledsType.username:
                setTxt("adi");
                setEditingTxt('adi');
                break;
            case settingsFiledsType.password:
                setTxt('92e@kdjf');
                setEditingTxt('92e@kdjf');
                break;
        }
    }, [])

    const handleSave = () => {
        setTxt(editingTxt);
        setIsEditing(false)
    }

    const dontSave = () => {

        setEditingTxt(txt);
        setIsEditing(false);
    }
    return (<>
        {
            isEditing ?
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0 }}
                    className=" flex gap-1 flex-col">
                    <p className="pl-2 opacity-70">{label}</p>
                    <div className="relative flex gap-2">
                        <input type="text" value={isEditing ? editingTxt : txt} onChange={(e) => setEditingTxt(e.target.value)} placeholder={'username'} className="input max-[500px]:input-sm input-bordered max-[500px]:w-52 w-60" />
                        <button onClick={handleSave} className="btn max-[500px]:btn-sm btn-square">
                            <Save className="text-green-500" size={18} />
                        </button>
                        <button onClick={dontSave} className="btn absolute top-0 right-[-60px] max-[500px]:btn-sm btn-square">
                            <X className="text-red-500" size={18} />
                        </button>
                    </div>

                </motion.div>
                :
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0 }}
                    className=" flex gap-1 flex-col">
                    <p className="pl-2 opacity-70">{label}</p>
                    <div className=" flex gap-2">

                        <div className="flex justify-start px-2 py-1 sm:px-4 sm:py-2 items-center border border-secondaryLight rounded-lg max-[500px]:w-52 w-60" >{txt}</div>
                        <button onClick={() => setIsEditing(true)} className="btn max-[500px]:btn-sm btn-square text-red-500">
                            <Edit size={18} />
                        </button>
                    </div>
                </motion.div>

        }
    </>)
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


    return (<div className={`w-[90%] text-xs sm:text-sm  justify-start pt-24 items-center h-full relative flex flex-col ${!onLaptopScreen ? "sm:w-[90%]" : "sm:w-[80%]"} `} >
        <TabsWrappedLabel3 value={value} setValue={setValue} />

        <div className=" h-[90%] flex w-full flex-col justify-center items-center">
            <div className="w-full items-center flex justify-between py-6 px-4 h-fit">

            </div>
            {TabSection}
        </div>
    </div>)
}


