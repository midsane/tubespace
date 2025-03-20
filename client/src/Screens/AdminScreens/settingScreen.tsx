import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeDispatchType, storeStateType } from "../../store/store";

import { motion } from "framer-motion"

import { TabsWrappedLabel3 } from "../../components/tabs";
import { CircleUser, Edit, Folder, FolderLock, Save, SaveIcon, Shapes, Skull, X } from "lucide-react";
import { IOSSwitch } from "../../components/switches/switches";
import { Button, Chip } from "@mui/material";
import { modalActions } from "../../store/modal";
import { ProfileImageUploader } from "../../components/profileImageUpdater";
import { YouTube } from "@mui/icons-material";
import { useFetch } from "../../hooks/fetchHooks";
import { fetchYoutuberSettings } from "../../fetch/fetchSettings";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { youtuberActions } from "../../store/youtuberStore/youtuber.slice";
import { userInterface } from "../../types/youtuberTypes";
import { createPortal } from "react-dom";


export const SettingScreen = ({ type = 1 }: { type: number }) => {

    return (
        <ScreenWrapper preRouter={type === 1 ? "/y/" : "/c/"} links={type === 1 ? linkType.one : linkType.two} >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Settings" width={"100%"} paddingBottom="12px" borderRadius="0px" />
                <SettingsArea type={type} />
            </div>
        </ScreenWrapper>
    )
}

enum settingsFiledsType {
    username,
    password,
}

const GeneralSettings = ({ type, loading = false }: { type: number, loading?: boolean }) => {
    const dispatch: storeDispatchType = useDispatch()
    const userInfo = useSelector((state: storeStateType) => state.youtuberInfo)

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
                                    <input type="radio" name="radio-10" className="radio border border-label checked:bg-blue-500" defaultChecked />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <Chip size="small" color="secondary" label="private" variant="filled" icon={<Folder size={18} />} />
                                    <input type="radio" name="radio-10" className="radio border border-label checked:bg-red-500" defaultChecked />

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
                submitText: "Ok"
            }
        ))
    }

    return (<div className={`flex flex-col p-4 gap-8 sm:gap-10 sm:p-8 overflow-y-scroll overflow-x-hidden justify-start items-center rounded-2xl border border-secondaryLight w-full scroll-smooth scrollbar-thin dark:scrollbar-track-primary  dark:scrollbar-thumb-accent h-[95%] `}>
        <div className="flex flex-col gap-8 sm:gap-10 w-fit justify-center items-center" >
            <ProfileImageUploader imgUrl={userInfo.user?.profilepic} />
            <SettingsFields currentName={userInfo.user?.username} type={settingsFiledsType.username} label="username" />
            <SettingsFields currentName={"********"} type={settingsFiledsType.password} label="password" />
            <SettingsToggle label="Whatsapp" type={SettingsToggleType.Whatsapp} />
            <SettingsToggle label="Email" type={SettingsToggleType.Email} />

            <SettingsToggle label="Push Notification" type={SettingsToggleType.PushNotification} />
            <Button
                sx={{ paddingX: "0px !important" }}
                onClick={handleAccountPreferenceModal} color="primary" className="w-full" variant="outlined">
                <div className="w-full gap-2 sm:text-sm text-xs justify-center px-1 py-1 sm:py-2 flex items-center" >
                    <CircleUser size={20} />
                    <span>Account Preference</span>
                </div>
            </Button>
            {type === 1 &&
                <Button
                    sx={{ paddingX: "0px !important" }}
                    color="warning" className="w-full" variant="contained">
                    <div className="w-full gap-2 sm:text-sm text-xs justify-center px-1 py-1 sm:py-2 flex items-center" >
                        <YouTube />
                        <span>Link your Youtube Account</span>
                    </div>
                </Button>
            }
            <Button
                sx={{ paddingX: "0px !important" }}
                color="primary" className="w-full" variant="contained">
                <div className="w-full gap-2 sm:text-sm text-xs justify-center px-1 py-1 sm:py-2 flex items-center" >
                    <SaveIcon size={20} />
                    <span>Save all Changes</span>
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

export const SettingsFields: React.FC<{ currentName: string | null | undefined, type: settingsFiledsType, label: string }> = ({ type, label, currentName }) => {

    if (!currentName) return (<div
        className=" flex gap-1 flex-col">
        <p className="pl-2 opacity-70">{label}</p>
        <div className=" flex gap-2">

            <div className="flex skeleton justify-start px-2 py-1 sm:px-4 sm:py-2 items-center border border-secondaryLight rounded-lg max-[500px]:w-52 w-60" ></div>
            <button disabled onClick={() => setIsEditing(true)} className="btn skeleton max-[500px]:btn-sm btn-square text-red-500">
                <Edit size={18} />
            </button>
        </div>
    </div>
    )


    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingTxt, setEditingTxt] = useState<string>(currentName);
    const [txt, setTxt] = useState<string>(currentName);
    const [changePasswordDialog, setChangePasswordDialog] = useState<boolean>(false)

    const handleSave = () => {
        setTxt(editingTxt);
        setIsEditing(false)
    }

    const dontSave = () => {

        setEditingTxt(txt);
        setIsEditing(false);
    }



    const handleEdit = () => {
        if (type === settingsFiledsType.username) {
            setIsEditing(true)
            return;
        }

        setChangePasswordDialog(true)


    }
    return (<>
        {changePasswordDialog
            && <ChangePasswordDialog onClose={() => setChangePasswordDialog(false)} />
        }
        {
            isEditing ?
                type === settingsFiledsType.username ?
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
                            <button onClick={handleEdit} className="btn max-[500px]:btn-sm btn-square text-red-500">
                                <Edit size={18} />
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


const ChangePasswordDialog = ({ onClose }: { onClose: () => void }) => {

    const [verified, setVerified] = useState<boolean>(false)

    const verify = async () => {
        alert('verifying')
        //verify password 
        setVerified(true)
    }

    return (createPortal(<>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='z-[200] backdrop-blur-sm transition-opacity w-screen h-[100dvh] fixed top-0 left-0 bg-opacity-90'
        />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=" flex flex-col gap-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary border border-secondaryLight py-10 px-4 sm:px-8 rounded-lg z-[300] ">

            <div onClick={onClose} className='absolute max-[600px]:-rotate-90 top-1 active:scale-95 ease-linear duration-75 cursor-pointer hover:border rounded p-1 border-secondaryLight right-1 z-[500]'>
                <X />
            </div>

            <input placeholder="current password" className="p-2 rounded-lg border border-secondary" type="password" />
            <Button onClick={verify} style={{ opacity: !verified ? "0.4" : "1" }} variant="outlined" >Verify</Button>
            <input disabled={verified} style={{ opacity: !verified ? "0.4" : "1" }} placeholder="type new password" className="p-2 rounded-lg border border-secondary" type="password" />
            <input disabled={!verified} style={{ opacity: !verified ? "0.4" : "1" }} placeholder="re-type new password" className="p-2 rounded-lg border border-secondary" type="password" />
            <Button disabled={!verified} style={{ opacity: !verified ? "0.4" : "1" }} variant="outlined" >Change</Button>

        </motion.div>
    </>, document.getElementById('root') as HTMLElement))
}

const BillingSettings = () => {
    return (<div className={`flex flex-col gap-10 p-10 justify-start items-center rounded-2xl border border-secondaryLight h-[95%] w-full `}>

    </div>)
}

const SettingsArea = ({ type }: { type: number }) => {
    const navigate = useNavigate()
    const dispatch: storeDispatchType = useDispatch()
    const userInfo = useSelector((state: storeStateType) => state.youtuberInfo);
    const { username } = useParams();
    if (!username) {
        navigate("/404")
    }
    const fetchFnc = useCallback(() => fetchYoutuberSettings(username as string), [username])

    const {
        data: userInfoData,
        loading,
        error
    } = useFetch<userInterface>(fetchFnc)

    useEffect(() => {
        if (userInfoData) {
            dispatch(youtuberActions.setUserInfo({ user: userInfoData }))

        }
    }, [userInfoData])

    if (error) toast.error(error)

    const [value, setValue] = useState<string>('one');
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    let TabSection = <></>
    switch (value) {
        case "one":
            TabSection = <GeneralSettings loading={loading} type={type} />
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


