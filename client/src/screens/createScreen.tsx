import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { PlusCircle, Save, Trash } from "lucide-react";
import { Assignment, CancelOutlined, CheckCircle, Pending } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { DraftVideosCardSection2 } from "../components/homeTabSection/draftVideosCardSection";
import React, { useEffect, useState } from "react";
import { BasicMenu } from "../components/menus/basicmenu";
import { storeDispatchType } from "../store/store";
import { modalActions } from "../store/modal";
import { CreateNewSample } from "../components/modalCompnents/createNewSample";


export const CreateScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    return (
        <div className='w-screen h-screen flex justify-end' >
            <Sidebar />
            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
                <div className="flex h-full justify-center bg-black items-center ">
                    <CreateArea />
                    <DraftVideosCardSection2 />
                </div>
            </div>
        </div>
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
    return (<div className="w-[70%] justify-center items-center h-fit flex flex-col gap-2 pt-2" >
        <HeadSection title="sample video" />
        <CreateDraftBtn />
        <IndicatorArea />
        <div className="bg-secondary flex flex-col gap-8 p-8 rounded-lg">
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

    return (<span className="absolute top-20 left-80 w-fit h-fit p-2 rounded-lg border-3 active:scale-90 ease-linear duration-75 cursor-pointer border border-secondary"  >
        <Tooltip title="create a new sample video" placement="top" arrow >
            <span onClick={createNewSample} className="flex gap-2">
                <PlusCircle className="" />
                <p>Create..</p>
            </span>
        </Tooltip>
    </span>)

}


const VideoArea = () => {
    return (<div className="w-[60%] h-24">
        <div className="bg-primary w-full h-full rounded-xl"></div>
    </div>)
}

const HeadSection: React.FC<{ title: string }> = ({ title }) => {
    return <div className="bg-secondary p-1 rounded-lg px-4 flex justify-between w-1/2">
        <h1 className="text-lg" >{title}</h1>
        <Trash color="red" className="cursor-pointer active:scale-90 ease-linear duration-75" />
    </div>
}


const IndicatorArea = () => {
    return (<ul className="timeline text-sm">
        <li>
            <div className="timeline-start">25 Feb, 2024</div>
            <div className="timeline-middle">
                <CheckCircle color="primary" fontSize="small" />
            </div>
            <div className="timeline-end timeline-box">Title</div>
            <hr className="bg-accent" />
        </li>
        <li>
            <hr className="bg-accent " />

            <div className="timeline-start">26 Feb, 2024</div>
            <div className="timeline-middle">
                <CheckCircle color="primary" fontSize="small" />
            </div>
            <div className="timeline-end timeline-box">description</div>
            <hr />
        </li>
        <li>
            <hr />
            <div className="timeline-start"></div>
            <div className="timeline-middle">
                <Pending fontSize="small" />
            </div>
            <div className="timeline-end timeline-box">thumbnail</div>
            <hr />
        </li>
        <li>
            <hr />
            <div className="timeline-start"></div>
            <div className="timeline-middle">
                <Pending fontSize="small" />
            </div>
            <div className="timeline-end timeline-box">Video</div>
        </li>

    </ul>)
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
            {!submitted && <div className="flex gap-2 justify-between">
                <input disabled={false} type="file"
                    className="file-input file-input-bordered file-input-md file-input-info w-60 text-" />
                <InputButton menuType={MenuType.thumbnail} showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>}
            {submitted && <div className="flex gap-10 items-center">
                <VideoArea />
                <span onClick={() => setSubmitted(false)} className="opacity-75 hover:opacity-100 active:scale-95 duration-75 ease-linear cursor-pointer" >
                    <CancelOutlined fontSize="large" />
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
        <><div className="flex gap-2 w-full justify-between " >
            <input type={placeholder} placeholder={placeholder} className="input  input-bordered w-60" />
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
        <><div className="flex gap-2" >
            <textarea className="textarea textarea-bordered w-60 input-md" placeholder={placeholder}></textarea>
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

    return <div className="flex gap-1">
        <Tooltip title="save changes" arrow>
            <button className="btn btn-square btn-outline">
                <Save size={18} />
            </button>
        </Tooltip>
        <Tooltip title="assign it to someone" placement="top" arrow >
            <span className="relative">
                <button onClick={() => setShowMenu(menuType)} className="btn btn-square btn-outline">
                    <Assignment fontSize="small" />
                </button>
                {showMenu === menuType && <span className="absolute left-1/2 z-20 menuDiv" ><BasicMenu /></span>}
            </span>
        </Tooltip>
    </div>
}