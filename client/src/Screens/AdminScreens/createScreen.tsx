import { useDispatch, useSelector } from "react-redux";
import { PlusCircle, Save } from "lucide-react";
import { Assignment, CancelOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { DraftVideosCardSection2 } from "../../components/homeTabSection/draftVideosCardSection";
import React, { useEffect, useState } from "react";
import { BasicMenu } from "../../components/menus/basicmenu";
import { storeDispatchType, storeStateType } from "../../store/store";
import { modalActions } from "../../store/modal";
import { CreateNewSample } from "../../components/modalCompnents/createNewSample";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";


export const CreateScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapper links={linkType.one} preRouter="/"  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt title="Create" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <CreateArea />
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

const CreateArea = () => {
    const [showMenu, setShowMenu] = useState<MenuType>(MenuType.close)
    return (<div className="w-[90%] sm:w-[70%] text-xs sm:text-sm justify-center items-center h-full relative flex flex-col gap-2 sm:gap-2 " >

        <HeadSection title="sample video" />
        <div className="bg-secondary shadow-inner shadow-secondary border border-secondaryLight flex flex-col gap-8 p-5 sm:p-8 rounded-lg">
            <InputArea showMenu={showMenu} setShowMenu={setShowMenu} placeholder="title" />
            <DescriptionArea showMenu={showMenu} setShowMenu={setShowMenu} placeholder="description" />
            <FilePicker label="Select a Thumbnail" showMenu={showMenu} setShowMenu={setShowMenu} />

            <FilePicker label="Select a Video" showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
    </div>)
}

const CreateDraftBtn = () => {
    const dispatch: storeDispatchType = useDispatch()
    const createNewSample = () => {
        dispatch(modalActions.openMoal({
            title: "Create new Sample", content: <CreateNewSample />
        }))
    }

    return (<span className="w-fit h-fit p-2 rounded-lg border-3 active:scale-90 ease-linear duration-75 cursor-pointer border border-secondary"  >
        <Tooltip title="create a new sample video" placement="top" arrow >
            <span onClick={createNewSample} className="flex gap-2">
                <PlusCircle className="" />
                <p>Create..</p>
            </span>
        </Tooltip>
    </span>)

}


const VideoArea = () => {
    return (<div className="w-[60%] max-[420px]:h-16 h-24">
        <div className="bg-primary w-full h-full rounded-xl"></div>
    </div>)
}

const HeadSection: React.FC<{ title: string }> = ({ title }) => {
    return <div className=" border-b items-center border-secondaryLight absolute top-0 left-0 rounded-lg px-4 pt-5 flex justify-between w-full">
        <h1 className="text-2xl" >{title}</h1>
        <CreateDraftBtn />
    </div>
}

const FilePicker: React.FC<{
    label: string
    showMenu: MenuType,
    setShowMenu: (prevState: MenuType) => void
}> = ({ showMenu, setShowMenu, label }) => {

    const [submitted, setSubmitted] = useState<boolean>(true);
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="opacity-80">{label}</span>
            {!submitted && <div className="max-[420px]:flex-col flex gap-2 justify-between">
                <input disabled={false} type="file"
                    className="file-input max-[500px]:file-input-sm file-input-bordered file-input-md file-input-info max-[500px]:w-52 w-60 text-" />
                <InputButton menuType={MenuType.thumbnail} showMenu={showMenu} setShowMenu={setShowMenu} />
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
    placeholder: string,
    showMenu: MenuType,
    setShowMenu: (prevState: MenuType) => void,
}> = ({ showMenu, setShowMenu, placeholder }) => {

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
            <input type={placeholder} placeholder={placeholder} className="input max-[500px]:input-sm input-bordered max-[500px]:w-52 w-60" />
            <InputButton menuType={derivedMenutype} showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        </>
    )
}


const DescriptionArea: React.FC<{
    placeholder: string,
    showMenu: MenuType,
    setShowMenu: (prevState: MenuType) => void,
}> = ({ showMenu, setShowMenu, placeholder }) => {
    return (
        <><div className="flex max-[420px]:flex-col gap-2" >
            <textarea className="textarea textarea-bordered w-60 max-[500px]:w-52 max-[500px]:input-xs scrollbar-none input-md" placeholder={placeholder}></textarea>
            <InputButton menuType={MenuType.description} showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        </>
    )
}

const InputButton: React.FC<{
    menuType: MenuType,
    showMenu: MenuType,
    setShowMenu: (prevState: MenuType) => void
}> = ({ showMenu, setShowMenu, menuType }) => {

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

    return <div className="flex gap-1 max-[420px]:gap-2">
        <Tooltip title="save changes" arrow>
            <button className="btn max-[500px]:btn-sm btn-square btn-outline">
                <Save size={18} />
            </button>
        </Tooltip>
        <Tooltip title="assign it to someone" placement="top" arrow >
            <span className="relative">
                <button onClick={() => setShowMenu(menuType)} className="btn max-[500px]:btn-sm btn-square btn-outline">
                    <Assignment fontSize="small" />
                </button>
                {showMenu === menuType && <span className="absolute max-[420px]:left-1/2 max-[420px]:top-2 left-[-400%] top-5 z-20 menuDiv" ><BasicMenu /></span>}
            </span>
        </Tooltip>
    </div>
}