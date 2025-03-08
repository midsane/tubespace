import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeDispatchType, storeStateType } from "../../store/store";

import { TabsWrappedLabel3 } from "../../components/tabs";
import { CircleUser, Edit, Folder, FolderLock, Save, Shapes, Skull, X } from "lucide-react";
import { IOSSwitch } from "../../components/switches/switches";
import { Button, Chip } from "@mui/material";
import { modalActions } from "../../store/modal";
import { ProfileImageUploader } from "../../components/profileImageUpdater";


export const SettingScreen: React.FC = () => {
  
    return (
        <ScreenWrapper preRouter={"/y/"} links={linkType.one} >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Settings" width={"100%"} paddingBottom="12px" borderRadius="0px" />
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

    const saveAccountPreferenceChanges = () => {
        dispatch(modalActions.closeModal())
    }

    const handleAccountPreferenceModal = () => {
        dispatch(modalActions.openMoal(
            {
                content: <div className="flex w-full flex-col h-full gap-8">
                    <div className="flex flex-col gap-2">

                        <div className="w-full h-fit p-3" >
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <Chip size={"small"} color="primary" label="public" variant="filled" icon={<FolderLock size={18} />} />
                                    <input type="radio" name="radio-10" className="radio border border-secondaryLight checked:bg-blue-500" defaultChecked />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <Chip size="small" color="secondary" label="private" variant="filled" icon={<Folder size={18} />} />
                                    <input type="radio" name="radio-10" className="radio border border-secondaryLight checked:bg-red-500" defaultChecked />

                                </label>
                            </div>
                        </div>
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
                buttons: true,
                handleSubmit: saveAccountPreferenceChanges,
                submitText: "Save Changes"
            }
        ))
    }

    return (<div className={`flex flex-col p-4 gap-8 sm:gap-10 sm:p-8 overflow-y-scroll overflow-x-hidden justify-start items-center rounded-2xl border border-secondaryLight w-full scroll-smooth scrollbar-thin dark:scrollbar-track-primary  dark:scrollbar-thumb-accent h-[95%] `}>
        <div className="flex flex-col gap-8 sm:gap-10 w-fit justify-center items-center" >
            <ProfileImageUploader imgUrl="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/9997313/Devilman_Crybaby_Queeen_Bee_Clip_02.jpg?quality=90&strip=all&crop=7.8125%2C0%2C84.375%2C100&w=1080" />
            <SettingsFields type={settingsFiledsType.username} label="username" />
            <SettingsFields type={settingsFiledsType.username} label="password" />
            <SettingsToggle label="Whatsapp" type={SettingsToggleType.Whatsapp} />
            <SettingsToggle label="Email" type={SettingsToggleType.Email} />

            <SettingsToggle label="Push Notification" type={SettingsToggleType.PushNotification} />
            <Button onClick={handleAccountPreferenceModal} color="primary" className="w-full" variant="outlined">
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
                <div
                    className=" flex gap-1 flex-col">
                    <p className="pl-2 opacity-70">{label}</p>
                    <div className="relative flex gap-2">
                        <div className="bg-secondary rounded-lg flex max-[500px]:w-52 w-60" >
                            <input type="text" value={isEditing ? editingTxt : txt} onChange={(e) => setEditingTxt(e.target.value)} placeholder={'username'} className="input max-[500px]:input-sm 
                            bg-transparent w-[90%] focus:outline-none focus:border-none" />

                            <button onClick={dontSave} className="btn bg-transparent hover:bg-secondaryLight max-[500px]:btn-sm btn-circle ease-linear duration-75">
                                <X className="text-red-500" size={18} />
                            </button>
                        </div>
                        <button onClick={handleSave} className="btn max-[500px]:btn-sm btn-square">
                            <Save className="text-green-500" size={18} />
                        </button>

                    </div>

                </div>
                :
                <div
                    className=" flex gap-1 flex-col">
                    <p className="pl-2 opacity-70">{label}</p>
                    <div className=" flex gap-2">

                        <div className="flex justify-start px-2 py-1 sm:px-4 sm:py-2 items-center border border-secondaryLight rounded-lg max-[500px]:w-52 w-60" >{txt}</div>
                        <button onClick={() => setIsEditing(true)} className="btn max-[500px]:btn-sm btn-square text-red-500">
                            <Edit size={18} />
                        </button>
                    </div>
                </div>

        }
    </>)
}

const BillingSettings = () => {
    return (<div className={`flex flex-col gap-10 p-10 justify-start items-center rounded-2xl border border-secondaryLight h-[95%] w-full `}>

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
            {TabSection}
        </div>
    </div>)
}


