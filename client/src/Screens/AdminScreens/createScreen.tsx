import { useDispatch, useSelector } from "react-redux";
import { EditIcon, Expand, FileIcon, PlusCircle, Save, Trash, X } from "lucide-react";
import { Assignment } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { DraftVideosCardSection2 } from "../../components/homeTabSection/draftVideosCardSection";
import React, { useEffect, useState } from "react";
import { BasicMenu } from "../../components/menus/basicmenu";
import { storeDispatchType, storeStateType } from "../../store/store";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { modalActions } from "../../store/modal";
import { CreateNewSample } from "../../components/modalCompnents/createNewSample";
import toast from "react-hot-toast";
import { youtuberDraftActions } from "../../store/youtuberStore/youtuberDraftVideos.slice";
import { addDraft, fetchCreateScreenData, responseData, updatedDraft, updatedDraftFile } from "../../fetch/fetchForYoutuber";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/fetchHooks";
import { DraftVideosInterface, userInterface } from "../../types/youtuberTypes";
import { youtuberActions } from "../../store/youtuberStore/youtuber.slice";
import { Uploadbutton } from "../../components/buttons/uploadbutton";
import { VideoPlayer } from "../../components/videoPlayer/videoplayer";



const getCurrentDraftInfo = (draftTitle: string, draftArr: DraftVideosInterface[]) => {
    return draftArr.find(draft => draft.DraftTitle === draftTitle) || null
}

export const CreateScreen: React.FC = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;


    const { draftName } = useParams()
    if (!draftName) return <h1>Invalid Draft Name</h1>
    const dispatch: storeDispatchType = useDispatch()

    const draftArr = useSelector((state: storeStateType) => state.youtuberDraft)
    const { data: createScreenData, error, loading } = useFetch<userInterface>(fetchCreateScreenData)

    useEffect(() => {
        if (createScreenData) {
            console.log(createScreenData)
            const ytInfo = createScreenData.Youtuber;
            if (!ytInfo) return;
            const { draftVideos, ...remFields } = ytInfo;
            const updateFields = { draftVideos: null, ...remFields }

            const userInfo = {
                Youtuber: updateFields,
                ...createScreenData,
            }

            if (!draftVideos) return;
            dispatch(youtuberActions.setUserInfo({ user: userInfo }))
            dispatch(youtuberDraftActions.setDraft(draftVideos))

        }
    }, [createScreenData])

    if (error) toast.error(error)

    return (
        <ScreenWrapper links={linkType.one} preRouter={"/y/"}  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Create" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />

                <CreateArea draftInfo={getCurrentDraftInfo(draftName, draftArr)} loading={loading} />
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

        <div className="bg-secondary mt-28 overflow-y-scroll overflow-x-hidden shadow-inner shadow-secondary border border-secondaryLight flex flex-col gap-8 p-5 sm:p-8 rounded-lg">
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
                    <InputArea
                        draftId={draftInfo && draftInfo?.draftVideoId}
                        title={draftInfo?.ytTitle as string}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        placeholder="title" />

                    <DescriptionArea
                        draftId={draftInfo && draftInfo?.draftVideoId}
                        description={draftInfo?.ytDescription as string}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        placeholder="description" />

                    <FilePicker
                        draftId={draftInfo && draftInfo?.draftVideoId}
                        placeholder="thumbnail"
                        file={draftInfo?.ytThumbnailLink as string}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />

                    <FilePicker
                        menuOpen="up"
                        placeholder="video"
                        draftId={draftInfo && draftInfo?.draftVideoId}
                        file={draftInfo?.ytVideoLink as string}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />
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


const VideoArea = ({ file, placeholder }: { file: string, placeholder: string }) => {
    const dispatch: storeDispatchType = useDispatch();
    const handleExpand = () => {
        dispatch(modalActions.openMoal({
            fullScreen: true,
            title: placeholder,
            content: <div className="flex flex-col gap-5 justify-center items-center">
                {placeholder === "video" ?
                    <VideoPlayer videoUrl={file} />
                    :
                    <img
                        src={file} className="max-w-full max-h-[70dvh] rounded" />}
            </div>,
        }))
    }
    console.log(file)
    return (<div className="w-[60%] max-w-56 max-[420px]:max-w-52 max-[420px]:max-h-30 max-[420px]:w-full  h-24">
        <div className="bg-primary max-[420px]:py-2 relative flex justify-center items-center w-full h-full rounded-xl">
            {file?.trim() === "" || !file ? "not provided" : <>
                {placeholder === "video" ?
                    <video controls className="h-full w-full object-contain" src={file} /> :
                    <img className="h-full w-full object-contain" src={file} />}
                <Expand onClick={handleExpand} className="cursor-pointer border border-label border-opacity-45 hover:bg-secondary rounded p-2 absolute top-2 right-2 text-label bg-secondaryLight active:scale-95 ease-linear duration-75" size={30} />
                <Trash
                    className="cursor-pointer border border-label border-opacity-45 hover:bg-secondary rounded p-2 absolute bottom-2 right-2 text-red-600 bg-secondaryLight active:scale-95 ease-linear duration-75" size={30}
                />
            </>}
        </div>
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

const formatSize = (sizeinByte: number) => {
    const sizeInKb = sizeinByte / 1024;
    const sizeInMb = sizeInKb / 1024;
    if (sizeInMb > 1) return sizeInMb.toFixed(2) + " MB"
    return sizeInKb.toFixed(2) + " KB"
}

const FilePicker: React.FC<{
    menuOpen?: string,
    draftId: number | null,
    file: string,
    placeholder: string,
    showMenu: MenuType,
    setShowMenu: (prevState: MenuType) => void
}> = ({ showMenu, setShowMenu, draftId, placeholder, file, menuOpen = "down" }) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(file)
    const [editableFile, setEditableFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const dispatch: storeDispatchType = useDispatch()

    let derivedMenutype: MenuType = MenuType.close

    switch (placeholder) {
        case "thumbnail":
            derivedMenutype = MenuType.thumbnail
            break;
        case "video":
            derivedMenutype = MenuType.video
            break;

    }


    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setEditableFile(selectedFile);
            const fileUrl = URL.createObjectURL(selectedFile);
            setImageUrl(fileUrl);
        }
    };


    const handleUpload = async () => {

        if (editableFile && draftId) {
            const formData = new FormData();
            if (placeholder === "video") formData.append("video", editableFile);
            else formData.append("thumbnail", editableFile);

            formData.append("draftVideoId", draftId.toString());
            const resData = await updatedDraftFile(formData)

            if (placeholder === "video") {
                if (resData.success) {
                    dispatch(youtuberDraftActions.updateDraftDetails({ draftVideoId: draftId, ytVideoLink: resData.data.ytVideoLink }))
                    return resData.message
                }
                else {
                    throw new Error(resData.message)
                }

            }

            else {
                if (resData.success) {
                    dispatch(youtuberDraftActions.updateDraftDetails({ draftVideoId: draftId, ytThumbnailLink: resData.data.ytThumbnailLink }))
                    return resData.message
                }
                else {
                    throw new Error(resData.message)
                }
            }


        }
        else {
            throw new Error("no file selected!")
        }
    }



    const saveFnc = async (txt: string) => {
        if (draftId) {
            if (editableFile) {
                dispatch(modalActions.openMoal(
                    {
                        title: "uploading " + placeholder,
                        content: <div className="flex flex-col gap-5">
                            {placeholder === "video" ?
                                <video
                                    src={imageUrl ? imageUrl : ""} controls className="max-w-44 sm:max-w-64" />
                                :
                                <img
                                    src={imageUrl ? imageUrl : ""} alt={editableFile.name} className="max-w-44 sm:max-w-64" />

                            }
                            <div>
                                <p>{editableFile.name}</p>
                                <p>{formatSize(editableFile.size)}</p>

                            </div>
                            <Uploadbutton fn={handleUpload} />
                        </div>,
                    }
                ))
            }
        }
        return;

    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="opacity-80 max-[420px]:ml-1">{placeholder}</span>
            {isEditing && <div className="max-[420px]:flex-col flex gap-2 justify-between">

                <div
                    className="max-[500px]:w-52 border max-[420px]:py-2 relative border-primary hover:bg-secondaryLight rounded-lg w-60 text-sm "
                >
                    {!editableFile &&
                        <div className="flex gap-4 h-full px-2 items-center cursor-pointer" >
                            <FileIcon size={18} />
                            <p>no file selected !</p>
                        </div>}

                    {editableFile &&
                        <div className="flex gap-4 h-full px-2  items-center cursor-pointer" >
                            <FileIcon size={18} />
                            <p>{editableFile.name}</p>
                        </div>}
                    <input
                        onChange={handleFileChange}
                        disabled={false} type="file"
                        className="file-input max-[500px]:file-input-sm file-input-bordered file-input-md file-input-info max text-sm max-[500px]:w-52 opacity-0 w-60 absolute top-0 left-0 cursor-pointer" />
                </div>
                <InputButton
                    menuOpen={menuOpen}
                    editableTxt={inputValue}
                    setEditableTxt={setInputValue}
                    saveFnc={saveFnc}
                    initialTextValue={""}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    menuType={derivedMenutype}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu} />
            </div>}
            {!isEditing && <div className="flex max-[420px]:flex-col gap-10 max-[420px]:items-start max-[420px]:gap-2 items-center justify-between">
                <VideoArea placeholder={placeholder} file={file} />
                <InputButton
                    menuOpen={menuOpen}
                    editableTxt={inputValue}
                    setEditableTxt={setInputValue}
                    saveFnc={saveFnc}
                    initialTextValue={""}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    menuType={derivedMenutype}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu} />
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
            if (title === txt) {
                toast.error("first change the input!")
                return;
            }
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

        <div className="flex flex-col gap-2">
            <span className="opacity-80 max-[420px]:ml-1">{placeholder}</span>
            <div className="flex max-[420px]:flex-col gap-2 w-full justify-between " >

                {isEditing && <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type={placeholder} placeholder={placeholder} className="input max-[500px]:input-sm input-bordered max-[500px]:w-52 w-60" />}

                {!isEditing && <div className="border max-[420px]:py-2 bg-primary border-primary text-label flex justify-between px-2 items-center rounded-lg max-[500px]:w-52 w-60" >
                    <div className="w-[80">{inputValue?.trim() === "" || !inputValue ? "not provided" : inputValue}</div>
                    <Expand className="cursor-pointer text-accent active:scale-95 ease-linear duration-75" size={18} />
                </div>}
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
        </div>
    )
}


const DescriptionArea: React.FC<{
    placeholder: string,
    showMenu: MenuType,
    description: string,
    draftId: number | null,
    setShowMenu: (prevState: MenuType) => void,
}> = ({
    showMenu,
    setShowMenu,
    placeholder,
    description,
    draftId
}) => {

        const [descriptionVal, setDescriptionVal] = useState<string>(description)
        const [isEditing, setIsEditing] = useState<boolean>(false)
        const dispatch: storeDispatchType = useDispatch()

        const saveFnc = async (txt: string) => {
            if (draftId) {
                if (description === txt) {
                    toast.error("first change the input!")
                    return;
                }
                const resData: responseData = await updatedDraft(draftId, { ytDescription: txt })
                if (resData.success) {
                    toast.success(resData.message)
                    dispatch(youtuberDraftActions.updateDraftDetails({ draftVideoId: draftId, ytDescription: txt }))
                }
                else toast.error(resData.message)
            }
            return;

        }
        return (
            <div className="flex flex-col gap-2">
                <span className="opacity-80 max-[420px]:ml-1">{placeholder}</span>
                <div className="flex max-[420px]:flex-col gap-2 justify-between" >
                    {!isEditing && <div className="border max-[420px]:py-2 bg-primary border-primary text-label flex justify-between items-center rounded-lg max-[500px]:w-52 w-60 px-2" >
                        <div className="w-[80">
                            {descriptionVal?.trim() === "" || !descriptionVal ? "not provided" : descriptionVal}
                        </div>
                        <Expand className="cursor-pointer text-accent active:scale-95 ease-linear duration-75" size={18} />

                    </div>}
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
            </div>
        )
    }

const InputButton: React.FC<{
    menuOpen?: string,
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
    menuOpen,
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


        return <div className="flex gap-2 max-[420px]:gap-2 relative ">
            {isEditing &&
                <>
                    <Tooltip title="save changes" arrow>
                        <button onClick={onClickingSave} disabled={loading} className="btn hover:border-primary border-secondaryLight max-[500px]:btn-sm btn-square ">
                            <Save color="green" size={18} />
                        </button>
                    </Tooltip>

                    <Tooltip title="cancel" arrow>
                        <button
                            disabled={loading}
                            onClick={() => {
                                setIsEditing(false);
                                setEditableTxt(initialTextValue);
                            }} className={`border active:scale-95 max-[420px]:-translate-y-[55%] border-secondaryLight rounded-full p-2 absolute top-1/2 -translate-y-1/2 -left-12 flex max-[420px]:-top-6 max-[420px]:left-[85%] bg-transparent hover:bg-secondaryLight ease-linear duration-75`}>
                            <X className="text-red-500" size={14} />
                        </button>
                    </Tooltip>
                </>
            }
            {
                !isEditing &&
                <Tooltip title="edit" arrow>
                    <button onClick={() => setIsEditing(true)} className="btn hover:border-primary max-[500px]:btn-sm btn-square border-secondaryLight">
                        <EditIcon color="orange" size={18} />
                    </button>
                </Tooltip>
            }
            <Tooltip title="assign it to someone" placement="top" arrow >
                <span className="relative">
                    <button
                        disabled={loading}
                        onClick={() => setShowMenu(menuType)} className="btn border hover:border-primary border-secondaryLight max-[500px]:btn-sm btn-square ">
                        <Assignment color="primary" fontSize="small" />
                    </button>
                    {showMenu === menuType && <span className={`absolute z-20 menuDiv  ${menuOpen === "up" ? "max-[420px]:left-1/2 max-[420px]:bottom-[60%] left-[-400%] bottom-1/2" : "max-[420px]:left-1/2 max-[420px]:top-2 left-[-400%] top-5"}`}><BasicMenu /></span>}
                </span>
            </Tooltip>
        </div>
    }