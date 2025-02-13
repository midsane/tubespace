import { useSelector } from "react-redux";
import { OuterModal } from "../components/outerModal";
import { Sidebar } from "../components/sidebar";
import { Save } from "lucide-react";
import { Assignment, CheckCircle, Pending } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { DraftVideosCardSection, DraftVideosCardSection2 } from "../components/homeTabSection/draftVideosCardSection";
import { CreateNewVideoCard, DraftVideosCard } from "../components/cards/draftVideosCard";


export const CreateScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: { sidebar: { onLaptopScreen: boolean } }) => state.sidebar).onLaptopScreen;
    return (
        <div className='w-screen h-screen flex justify-end' >
            <OuterModal />
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



const CreateArea = () => {
    return (<div className="w-[70%] justify-center items-center h-fit flex flex-col gap-2" >
        <IndicatorArea />
        <div className="bg-secondary flex flex-col gap-5 p-8 rounded-lg">
            <InputArea placeholder="title" />
            <DescriptionArea placeholder="description" />
            <ThumbnailArea />
        </div>
    </div>)
}





const IndicatorArea = () => {
    return (<ul className="timeline">
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

const ThumbnailArea = () => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <span>Select thumbnail</span>
            <div className="flex gap-2 justify-between">
                <input disabled={false} type="file"
                    className="file-input file-input-bordered file-input-info w-60 text-" />
                <InputButton />
            </div>
        </div>
    )
}

const InputArea = ({ placeholder }: { placeholder: string }) => {
    return (
        <><div className="flex gap-2 w-full justify-between " >
            <input type={placeholder} placeholder={placeholder} className="input input-bordered w-60" />
            <InputButton />
        </div>
        </>
    )
}


const InputButton = () => {
    return <div className="flex gap-1">
        <Tooltip title="save changes">
            <button className="btn btn-square btn-outline">
                <Save />
            </button>
        </Tooltip>
        <Tooltip title="assign it to someone" >
            <button className="btn btn-square btn-outline">
                <Assignment />
            </button>
        </Tooltip>
    </div>
}

const DescriptionArea = ({ placeholder }: { placeholder: string }) => {
    return (
        <><div className="flex gap-2" >
            <textarea className="textarea textarea-bordered w-60" placeholder={placeholder}></textarea>
            <InputButton />
        </div>
        </>
    )
}