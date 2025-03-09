import { useDispatch, useSelector } from "react-redux";
import { EditIcon, PlusCircle, Save, X } from "lucide-react";
import { Assignment, CancelOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { DraftVideosCardSection2 } from "../../components/homeTabSection/draftVideosCardSection";
import React, { useCallback, useEffect, useState } from "react";
import { BasicMenu } from "../../components/menus/basicmenu";
import { storeDispatchType, storeStateType } from "../../store/store";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { modalActions } from "../../store/modal";
import { CreateNewSample } from "../../components/modalCompnents/createNewSample";
import toast from "react-hot-toast";
import { youtuberDraftActions } from "../../store/youtuberStore/youtuberDraftVideos.slice";
import { addDraft, fetchDraftVideos, responseData, updatedDraft } from "../../fetch/fetchForYoutuber";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/fetchHooks";
import { DraftVideosInterface } from "../../types/youtuberTypes";


const getCurrentDraftInfo = (id: number, draftArr: DraftVideosInterface[]) => {
    return draftArr.find(draft => draft.draftVideoId === id)
}

export const CreateScreen: React.FC = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    const { draftName } = useParams()
    const dispatch: storeDispatchType = useDispatch()
    const fetchFnc = useCallback(() => fetchDraftVideos(draftName), [draftName])
    const draftArr = useSelector((state: storeStateType) => state.youtuberDraft)
    const { data: draftInfo, error, loading } = useFetch<DraftVideosInterface[]>(fetchFnc)

    useEffect(() => {
        if (draftInfo) {
            console.log(draftInfo)
            console.log("now dispatching")
            dispatch(youtuberDraftActions.updateDraftDetails(draftInfo[0]))
        }
    }
        , [draftInfo])

    if (error) toast.error(error)

    console.log("re rendered");


    return (
        <ScreenWrapper links={linkType.one} preRouter={"/y/"}  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Create" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />

                <CreateArea draftInfo={draftInfo ? getCurrentDraftInfo(draftInfo[0].draftVideoId, draftArr) || draftInfo[0] : null} loading={loading} />
                <DraftVideosCardSection2 />
            </div>
        </ScreenWrapper>
    )
}

enum MenuType {
    "title",
    "description",
    "thumbnail",
    "video",
    "close"
}

const CreateAreaLoader = () => {
    return (
        <div className="flex gap-2" >
            <div className="w-48 max-[400px]:w-36 max-[400px]:h-7 sm:w-64 skeleton bg-primary rounded h-9 sm:h-12" ></div>
            <div className="w-9 sm:w-12 h-9 sm:h-12 max-[400px]:h-7 max-[400px]:w-7 skeleton bg-primary rounded"></div>
            <div className="w-9 sm:w-12 h-9 sm:h-12 max-[400px]:h-7 max-[400px]:w-7 skeleton bg-primary rounded"></div>
        </div>

    )
}

const CreateArea = ({ loading, draftInfo }: { loading: boolean, draftInfo: DraftVideosInterface | null }) => {
    const [showMenu, setShowMenu] = useState<MenuType>(MenuType.close)
    return (<div className="w-[90%] sm:w-[70%] text-xs sm:text-sm justify-center items-center h-[80%] relative flex flex-col gap-2 sm:gap-2 " >

        <HeadSection loading={loading} title={draftInfo ? draftInfo.DraftTitle : ""} />

        <div className="bg-secondary mt-28 shadow-inner shadow-secondary border border-secondaryLight flex flex-col gap-8 p-5 sm:p-8 rounded-lg">
            {loading ?
                <div className="flex flex-col gap-6 sm:gap-8" >
                    <CreateAreaLoader />
                    <CreateAreaLoader />
                    <div className="flex flex-col gap-3">
                        <div className="skeleton bg-primary rounded h-4 w-20 sm:w-36" ></div>
                        <CreateAreaLoader />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="skeleton bg-primary rounded h-4 w-20 sm:w-36" ></div>
                        <CreateAreaLoader />
                    </div>

                </div>
                :
                <>
                    <InputArea draftId={draftInfo && draftInfo?.draftVideoId} title={draftInfo?.ytTitle as string} showMenu={showMenu} setShowMenu={setShowMenu} placeholder="title" />
                    <DescriptionArea description={draftInfo?.ytDescription as string} showMenu={showMenu} setShowMenu={setShowMenu} placeholder="description" />
                    <FilePicker label="Select a Thumbnail" showMenu={showMenu} setShowMenu={setShowMenu} />

                    <FilePicker label="Select a Video" showMenu={showMenu} setShowMenu={setShowMenu} />
                </>
            }
        </div>
    </div>)
}

const CreateDraftBtn = () => {
    const dispatch: storeDispatchType = useDispatch()


    const createDrafts = async (draftName: string, workspaceId: number) => {
        if (draftName?.trim() === "") {
            toast.error("input cannot be empty!");
            return;
        }
        const resData = await addDraft(draftName, workspaceId)
        if (resData.success) {
            toast.success(resData.message)
            console.log(resData.data)
            dispatch(youtuberDraftActions.addDraft(resData.data))
        }

        else toast.error(resData.message)
        dispatch(modalActions.closeModal())
    }


    const createNewSampleFnc = () => {
        dispatch(modalActions.openMoal({
            title: "Create new Sample",
            content: <CreateNewSample type={2} fn={createDrafts} />
        }))
    }

    return (<span className="w-fit h-fit p-2 rounded-lg border-2 active:scale-90 ease-linear duration-75 cursor-pointer  border-secondary"  >
        <Tooltip title="create a new sample video" placement="top" arrow >
            <span onClick={createNewSampleFnc} className="flex gap-2 justify-center items-center ">
                <PlusCircle size={20} className="" />
                <p className="text-center text-sm sm:text-lg" >Create</p>
            </span>
        </Tooltip>
    </span>)

}


const VideoArea = () => {
    return (<div className="w-[60%] max-[420px]:h-16 h-24">
        <div className="bg-primary w-full h-full rounded-xl"></div>
    </div>)
}

const HeadSection: React.FC<{ title: string, loading: boolean }> = ({ title, loading }) => {
    return <div className=" border items-center border-secondaryLight absolute top-0 left-0 rounded-lg px-4 pt-4 pb-1 flex justify-between w-full">
        {loading ?
            <div className="w-24 sm:w-60 h-8 skeleton rounded" ></div>
            : <h1 className="text-sm sm:text-xl" >{title}</h1>}
        <CreateDraftBtn />
    </div>
}

const FilePicker: React.FC<{
    label: string
    showMenu: MenuType,
    setShowMenu: (prevState: MenuType) => void
}> = ({ showMenu, setShowMenu, label }) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [submitted, setSubmitted] = useState<boolean>(true);

    const saveFnc = async (text: string) => {
        return
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="opacity-80">{label}</span>
            {!submitted && <div className="max-[420px]:flex-col flex gap-2 justify-between">
                <input disabled={false} type="file"
                    className="file-input max-[500px]:file-input-sm file-input-bordered file-input-md file-input-info max-[500px]:w-52 w-60 text-" />
                <InputButton
                    editableTxt={inputValue}
                    setEditableTxt={setInputValue}
                    saveFnc={saveFnc}
                    initialTextValue={""}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    menuType={MenuType.thumbnail}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu} />
            </div>}
            {submitted && <div className="flex gap-10 items-center">
                <VideoArea />
                <span onClick={() => setSubmitted(false)} className="opacity-75 hover:opacity-100 active:scale-95 duration-75 ease-linear cursor-pointer" >
                    <CancelOutlined fontSize="small" />
                </span>
            </div>}
        </div>
    )
}

const InputArea: React.FC<{
    title: string,
    placeholder: string,
    showMenu: MenuType,
    draftId: number | null,
    setShowMenu: (prevState: MenuType) => void,
}> = ({ showMenu, title, setShowMenu, placeholder, draftId }) => {

    const dispatch: storeDispatchType = useDispatch()

    const saveFnc = async (txt: string) => {
        if (draftId) {
            const resData: responseData = await updatedDraft(draftId, { ytTitle: txt })
            if (resData.success) {
                toast.success(resData.message)
                dispatch(youtuberDraftActions.updateDraftDetails({ draftVideoId: draftId, ytTitle: txt }))
            }
            else toast.error(resData.message)
        }
        return;

    }

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(title)
    let derivedMenutype: MenuType = MenuType.close
    switch (placeholder) {
        case "title":
            derivedMenutype = MenuType.title
            break;
        case "description":
            derivedMenutype = MenuType.description
            break;

    }
    return (
        <><div className="flex max-[420px]:flex-col gap-2 w-full justify-between " >
            {isEditing && <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type={placeholder} placeholder={placeholder} className="input max-[500px]:input-sm input-bordered max-[500px]:w-52 w-60" />}

            {!isEditing && <div className="border border-primary text-label flex justify-center items-center rounded-lg max-[500px]:w-52 w-60" >{inputValue?.trim() === "" || !inputValue ? "not provided" : inputValue}</div>}
            <InputButton
                saveFnc={saveFnc}
                editableTxt={inputValue}
                setEditableTxt={setInputValue}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                menuType={derivedMenutype}
                initialTextValue={title}
                showMenu={showMenu}
                setShowMenu={setShowMenu} />
        </div>
        </>
    )
}


const DescriptionArea: React.FC<{
    placeholder: string,
    showMenu: MenuType,
    description: string,
    setShowMenu: (prevState: MenuType) => void,
}> = ({ showMenu, setShowMenu, placeholder, description }) => {

    const [descriptionVal, setDescriptionVal] = useState<string>(description)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const saveFnc = async (text: string) => {
        return
    }
    return (
        <><div className="flex max-[420px]:flex-col gap-2" >
            {!isEditing && <div className="border border-primary text-label flex justify-center items-center rounded-lg max-[500px]:w-52 w-60" >{descriptionVal?.trim() === "" || !descriptionVal ? "not provided" : descriptionVal}</div>}
            {
                isEditing &&
                <textarea value={descriptionVal} onChange={(e) => setDescriptionVal(e.target.value)} className="textarea textarea-bordered w-60 max-[500px]:w-52 max-[500px]:input-xs scrollbar-none input-md" placeholder={placeholder}></textarea>
            }
            <InputButton
                editableTxt={descriptionVal}
                setEditableTxt={setDescriptionVal}
                isEditing={isEditing}
                saveFnc={saveFnc}
                initialTextValue={description}
                setIsEditing={setIsEditing}
                menuType={MenuType.description}
                showMenu={showMenu}
                setShowMenu={setShowMenu} />
        </div>
        </>
    )
}

const InputButton: React.FC<{
    menuType: MenuType,
    showMenu: MenuType,
    isEditing: boolean,
    editableTxt: string,
    initialTextValue: string,
    setEditableTxt: (prevState: string) => void,
    saveFnc: (...args: any) => Promise<void>,
    setIsEditing: (prevState: boolean) => void,
    setShowMenu: (prevState: MenuType) => void
}> = ({
    showMenu,
    setShowMenu,
    menuType,
    isEditing,
    setIsEditing,
    saveFnc,
    editableTxt,
    initialTextValue,
    setEditableTxt }) => {

        const [loading, setLoading] = useState<boolean>(false)

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const ref = document.querySelector('.menuDiv');
                if (ref && ref.contains(event.target as Node)) {
                    return;
                }
                if (showMenu !== MenuType.close) {
                    setShowMenu(MenuType.close);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showMenu]);

        const onClickingSave = async () => {
            setLoading(true)
            await saveFnc(editableTxt)
            setIsEditing(false)
            setLoading(false)
        }

        return <div className="flex gap-1 max-[420px]:gap-2 relative ">
            {isEditing &&
                <>
                    <Tooltip title="save changes" arrow>
                        <button onClick={onClickingSave} disabled={loading} className="btn border-primary hover:bg-primary max-[500px]:btn-sm btn-square ">
                            <Save color="green" size={18} />
                        </button>
                    </Tooltip>

                    <Tooltip title="cancel" arrow>
                        <button
                            disabled={loading}
                            onClick={() => {
                                setIsEditing(false);
                                setEditableTxt(initialTextValue);
                            }} className="border active:scale-95 border-secondaryLight rounded-full p-2 absolute top-1/2 -translate-y-1/2 -left-12 bg-transparent hover:bg-secondaryLight ease-linear duration-75">
                            <X className="text-red-500" size={14} />
                        </button>
                    </Tooltip>
                </>
            }
            {
                !isEditing &&
                <Tooltip title="edit" arrow>
                    <button onClick={() => setIsEditing(true)} className="btn border-primary max-[500px]:btn-sm btn-square hover:bg-primary">
                        <EditIcon color="orange" size={18} />
                    </button>
                </Tooltip>
            }
            <Tooltip title="assign it to someone" placement="top" arrow >
                <span className="relative">
                    <button
                        disabled={loading}
                        onClick={() => setShowMenu(menuType)} className="btn border border-primary max-[500px]:btn-sm btn-square ">
                        <Assignment color="primary" fontSize="small" />
                    </button>
                    {showMenu === menuType && <span className="absolute max-[420px]:left-1/2 max-[420px]:top-2 left-[-400%] top-5 z-20 menuDiv" ><BasicMenu /></span>}
                </span>
            </Tooltip>
        </div>
    }