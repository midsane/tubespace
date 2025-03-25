import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeDispatchType, storeStateType } from "../../store/store";

import { motion } from "framer-motion"

import { TabsWrappedLabel3 } from "../../components/tabs";
import { CircleUser, Edit, Eye, EyeOff, Folder, FolderLock, Save, SaveIcon, Shapes, Skull, X } from "lucide-react";
import { IOSSwitch } from "../../components/switches/switches";
import { Button, Chip } from "@mui/material";
import { modalActions } from "../../store/modal";
import { ProfileImageUploader } from "../../components/profileImageUpdater";
import { YouTube } from "@mui/icons-material";
import { useFetch } from "../../hooks/fetchHooks";
import { fetchYoutuberSettings, updateYoutuberSettings } from "../../fetch/fetchSettings";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { youtuberActions } from "../../store/youtuberStore/youtuber.slice";
import { ACCOUNT_TYPE, userInterface } from "../../types/youtuberTypes";
import { createPortal } from "react-dom";
import { verifyPasswordFetch } from "../../fetch/fetch";
import { responseData } from "../../fetch/fetchForYoutuber";


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
    console.log(loading)
    const dispatch: storeDispatchType = useDispatch()
    const userInfo = useSelector((state: storeStateType) => state.youtuberInfo)
    const accType = userInfo.user?.Youtuber?.accountType
    const [saving, setSaving] = useState<boolean>(false)
    const [newPassWord, setNewPassWord] = useState<string>("");

    const [newProfilepicFile, setNewProfilepicFile] = useState<File | null>(null)

    const deleteAccount = () => {

    }

    const deactivateAccount = () => {
    }

    const toggleAccountType = (label: ACCOUNT_TYPE) => {
        if (label === ACCOUNT_TYPE.PRIVATE)
            dispatch(youtuberActions.updateYoutuberInfo({ accountType: ACCOUNT_TYPE.PRIVATE }))
        else if (label === ACCOUNT_TYPE.PUBLIC)
            dispatch(youtuberActions.updateYoutuberInfo({ accountType: ACCOUNT_TYPE.PUBLIC }))
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

    const saveAllChanges = async () => {
        if (saving) return;
        toast.success("Saving all changes...")
        if (userInfo?.user) {
            setSaving(true)
            const fd = new FormData();
            if (newProfilepicFile)
                fd.append("profilepic", newProfilepicFile as File);
            fd.append("username", userInfo.user.username as string);
            if (newPassWord !== "")
                fd.append("password", newPassWord);
            fd.append("whatsAppNotifcation", String(userInfo.user?.Youtuber?.whatsAppNotifcation ? true : false));
            fd.append("emailNotifcation", String(userInfo.user?.Youtuber?.emailNotifcation ? true : false));
            fd.append("pushNotifcation", String(userInfo.user?.Youtuber?.pushNotifcation ? true : false));
            fd.append("accountType", userInfo.user?.Youtuber?.accountType as string);

            const resData: responseData = await updateYoutuberSettings(fd);
            if (resData.success) {
                toast.success(resData.message)
            }
            else {
                toast.error(resData.message)
            }
            setSaving(false);
        } else {
            toast.error("User information is missing.");
        }
    }

    return (<div className={`flex flex-col p-4 gap-8 sm:gap-10 sm:p-8 overflow-y-scroll overflow-x-hidden justify-start items-center rounded-2xl border border-secondaryLight w-full scroll-smooth scrollbar-thin dark:scrollbar-track-primary  dark:scrollbar-thumb-accent h-[95%] `}>
        <div className="flex flex-col gap-8 sm:gap-10 w-fit justify-center items-center" >
            <ProfileImageUploader key={userInfo.user?.profilepic} setNewProfilepicFile={setNewProfilepicFile} accountType={userInfo.user?.Youtuber?.accountType} imgUrl={userInfo.user?.profilepic} />
            <SettingsFields currentName={userInfo.user?.username} type={settingsFiledsType.username} label="username" />
            <SettingsFields setNewPassword={setNewPassWord} currentName={userInfo.user?.username} type={settingsFiledsType.password} label="password" />
            <SettingsToggle value={userInfo.user?.Youtuber?.whatsAppNotifcation} label="Whatsapp" type={SettingsToggleType.Whatsapp} />
            <SettingsToggle value={userInfo.user?.Youtuber?.emailNotifcation} label="Email" type={SettingsToggleType.Email} />

            <SettingsToggle value={userInfo.user?.Youtuber?.pushNotifcation} label="Push Notification" type={SettingsToggleType.PushNotification} />

            <div className="flex w-full flex-col">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <Chip size={"small"} color="primary" label="public" variant="filled" icon={<FolderLock size={18} />} />
                        <input
                            onClick={() => toggleAccountType(ACCOUNT_TYPE.PUBLIC)}
                            type="radio" name="radio-10" className="radio border border-label checked:bg-blue-500" checked={accType === ACCOUNT_TYPE.PUBLIC} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <Chip size="small" color="secondary" label="private" variant="filled" icon={<Folder size={18} />} />
                        <input
                            onClick={() => toggleAccountType(ACCOUNT_TYPE.PRIVATE)}
                            type="radio" name="radio-10" className="radio border border-label checked:bg-red-500" checked={accType === ACCOUNT_TYPE.PRIVATE} />

                    </label>
                </div>
            </div>
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
                onClick={saveAllChanges}
                sx={{ paddingX: "0px !important" }}
                color="primary" className={`w-full ${saving && "opacity-55"} `} variant="contained">
                <div className="w-full gap-2 sm:text-sm text-xs justify-center px-1 py-1 sm:py-2 flex items-center" >
                    <SaveIcon size={20} />
                    <span>{saving ? "Saving all Changes..." : "Save all Changes"}</span>
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

const SettingsToggle: React.FC<{ value: boolean | undefined, label: string, type?: SettingsToggleType }> = ({ label, value }) => {

    const dispatch: storeDispatchType = useDispatch()
    const toggle = () => {

        if (label === "Whatsapp")
            dispatch(youtuberActions.updateYoutuberInfo({ whatsAppNotifcation: !value }))
        else if (label === "Email")
            dispatch(youtuberActions.updateYoutuberInfo({ emailNotifcation: !value }))
        else if (label === "Push Notification")
            dispatch(youtuberActions.updateYoutuberInfo({ pushNotifcation: !value }))

    }


    return (
        <div className="justify-between flex gap-1 w-full items-center">
            <p className="pl-2 opacity-70">{label}</p>
            {value === undefined ? <div className="w-11 h-6 rounded-xl skeleton" ></div> :
                <IOSSwitch color="warning" onClick={toggle} checked={value} />
            }

        </div>
    )
}

export const SettingsFields: React.FC<{ setNewPassword?: (...args: any) => void, currentName: string | null | undefined, type: settingsFiledsType, label: string }> = ({ type, label, currentName, setNewPassword }) => {

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
    const [editingTxt, setEditingTxt] = useState<string>(type === settingsFiledsType.password ? "*******" : currentName);
    const [txt, setTxt] = useState<string>(type === settingsFiledsType.password ? "******" : currentName);
    const [changePasswordDialog, setChangePasswordDialog] = useState<boolean>(false)
    const dispatch: storeDispatchType = useDispatch()

    const handleSave = () => {
        setTxt(editingTxt);
        dispatch(youtuberActions.updateUserInfo({ username: editingTxt }))
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
            && <ChangePasswordDialog setNewPassWord={setNewPassword as (...args: any) => void} onClose={() => setChangePasswordDialog(false)} />
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

                            <div className="flex justify-start  px-2 py-1 sm:px-4 sm:py-2 items-center border border-secondaryLight rounded-lg text-center max-[500px]:w-52 w-60" >{txt}</div>
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


const ChangePasswordDialog = ({ onClose, setNewPassWord }: { onClose: () => void, setNewPassWord: (...args: any) => void }) => {

    const [verified, setVerified] = useState<boolean>(false)

    const verify = async (inputTxt: string, fnc1: any, fn2: any) => {
        if (inputTxt?.trim() === "") {
            toast.error("input cant be empty!");
            return;
        }
        fn2();
        const resData: responseData = await verifyPasswordFetch(inputTxt);
        if (resData.success) {
            toast.success(resData.message);
            setVerified(true)
        }
        else {
            toast.error(resData.message)
        }
        fnc1();
    }

    const changePassword = (inputTxt1: string, inputTxt2: string) => {
        if (!verified) {
            toast.error("first verify your password!")
            return;
        }
        if (inputTxt1?.trim() === "") {
            toast.error("input cant be empty!");
            return;
        }
        if (inputTxt1 !== inputTxt2) {
            toast.error("You have re-typed wrong password");
            return;
        }

        setNewPassWord(inputTxt1);
        toast.success("Now close the Dialog and click on Save all Changes to save the password.")

    }

    return (createPortal(<>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='z-[200] backdrop-blur-sm transition-opacity w-screen h-[100dvh] fixed top-0 left-0 '
        />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=" flex flex-col gap-7 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary border-2 border-secondaryLight py-10 px-4 sm:px-8 rounded-lg z-[300] ">

            <div onClick={onClose} className='absolute max-[600px]:-rotate-90 top-1 active:scale-95 ease-linear duration-75 cursor-pointer hover:border rounded p-1 border-secondaryLight right-1 z-[500]'>
                <X />
            </div>

            <PasswordInputBtn type={1} buttonPlaceHolder="verify" buttonHighlight={!verified} onClick={verify} placeholder="current password" />
            <PasswordInputBtn type={2} buttonPlaceHolder="change password" buttonHighlight={verified} onClick={changePassword} placeholder="new Password" placeholder1="confirm password" />


        </motion.div>
    </>, document.getElementById('root') as HTMLElement))
}


const PasswordInputBtn = ({
    placeholder1,
    placeholder,
    type,
    buttonPlaceHolder,
    onClick,
    buttonHighlight = false }:
    {
        placeholder1?: string,
        buttonPlaceHolder: string,
        type: number,
        placeholder: string,
        buttonHighlight?: boolean,
        onClick: (...args: any) => void
    }) => {
    const [hide1, setHide1] = useState<boolean>(true)
    const [hide2, setHide2] = useState<boolean>(true);
    const [inputTxt, setInputTxt] = useState<string>("");
    const [inputTxt1, setInputTxt1] = useState<string>("");
    const [verifying, setVerifying] = useState<boolean>(false);


    return (<div className="flex flex-col gap-2" >
        <div className="flex p-2 gap-2 rounded-lg border-2 border-secondaryLight justify-center items-center" >
            <input
                value={inputTxt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTxt(e.target.value)}
                placeholder={placeholder} className="bg-transparent focus:outline-none" type={hide1 ? "password" : "text"} />
            <span className="opacity-80 text-label hover:opacity-100 cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setHide1(prev => !prev)} >
                {hide1 ? <EyeOff /> : <Eye />}
            </span>
        </div>
        {type == 2 && <div className="flex p-2 gap-2 rounded-lg border-2 border-secondaryLight justify-center items-center" >
            <input
                value={inputTxt1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTxt1(e.target.value)}
                placeholder={placeholder1} className="bg-transparent focus:outline-none" type={hide2 ? "password" : "text"} />
            <span className="opacity-80 text-label hover:opacity-100 cursor-pointer active:scale-90 ease-linear duration-75" onClick={() => setHide2(prev => !prev)} >
                {hide2 ? <EyeOff /> : <Eye />}
            </span>
        </div>}
        {type === 1 ?
            <Button onClick={() => onClick(inputTxt, () => setVerifying(false), () => setVerifying(true))} disabled={verifying} variant={buttonHighlight ? "contained" : "outlined"} >{verifying ? "Loadinng..." : buttonPlaceHolder}</Button>
            :
            <Button onClick={() => onClick(inputTxt, inputTxt1)} variant={buttonHighlight ? "contained" : "outlined"} >{buttonPlaceHolder}</Button>
        }
    </div>
    )
}


const BillingSettings = () => {
    return (<div className={`flex flex-col gap-10 p-10 justify-start items-center rounded-2xl border border-secondaryLight h-[95%] w-full `}>

    </div>)
}

const SettingsArea = ({ type }: { type: number }) => {
    const navigate = useNavigate()
    const dispatch: storeDispatchType = useDispatch()

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


