import { useEffect, useRef, useState } from "react"
import { Button, } from "@mui/material"
import { Plus } from "lucide-react"
import { Workspaces } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { storeDispatchType, storeStateType } from "../../store/store"
import toast from "react-hot-toast"
import { createWorkspaceFetch } from "../../fetch/fetchForYoutuber"
import { modalActions } from "../../store/modal"
import { workspaceInterface } from "../../types/youtuberTypes"


const getFilteredWorkspaces = (workspacesArr: workspaceInterface[], searchTxt: string) => {
    return workspacesArr.filter(w => w.name.toLowerCase().includes(searchTxt.toLowerCase()))
}

export const CreateNewSample = <T extends (...args: any) => any>({ fn, type = 1 }: { fn: T, type?: number }) => {
    const newDraftTitleTxt = useRef<HTMLInputElement>(null)

    const dispatch: storeDispatchType = useDispatch()
    const workspaces = useSelector((state: storeStateType) => state.youtuberWorkSpaces)

    const [workspacesArr, setWorkspacesArr] = useState<workspaceInterface[]>(workspaces)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [wrkInfo, setWrkInfo] = useState<null | { id: number, name: string }>(null)

    const [searchTxt, setSearchTxt] = useState<string>("")

    const createWorkspace = async (workspaceName: string) => {
        if (workspaceName?.trim() === "") {
            toast.error("input cannot be empty!");
            return;
        }
        const resData = await createWorkspaceFetch(workspaceName)
        if (resData.success)
            toast.success(resData.message)
        else toast.error(resData.message)
        dispatch(modalActions.closeModal())
    }

    const createNewWorkspace = () => {

        dispatch(modalActions.openMoal({
            title: "Create new workspace",
            content: <CreateNewSample fn={createWorkspace} />
        }))
    }

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTxt(e.target.value)
        setWorkspacesArr(getFilteredWorkspaces(workspaces, e.target.value))
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menuRef = document.getElementById("menudiv-for-draft");
            if (menuRef && !menuRef.contains(event.target as Node)) {
                setShowMenu(false);
                setSearchTxt("")
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    useEffect(() => {
        if(!showMenu) return;
        setWorkspacesArr(workspaces)
    }, [showMenu])



    return (
        <div className="flex gap-2" >
            {type === 1 ?
                <>

                    <input ref={newDraftTitleTxt} className="px-2 py-1 rounded" placeholder="enter name for new sample" />
                    <Button onClick={() => fn(newDraftTitleTxt.current?.value)} variant="outlined" >create</Button></> :

                <div className="flex flex-col gap-5 w-full justify-center items-start">

                    <div id="menudiv-for-draft" className="dropdown relative h-10 flex gap-2 dropdown-start">
                        <div onClick={()=> setShowMenu(true)} role="button" className="btn w-44 sm:w-64 h-10">{wrkInfo ? wrkInfo.name : "Select a Workspace ⬇️"}</div>
                        {showMenu &&
                            <ul tabIndex={0} className="absolute top-0 left-0 bg-base-100 rounded-md z-1 w-44 sm:w-64 mt-14 p-2 shadow-sm pt-10">
                                <div className="absolute top-2 left-2 bg-secondary items-center px-2 right-2 flex justify-between">
                                    <input
                                        value={searchTxt}
                                        placeholder="search"
                                        onChange={inputOnChange}
                                        className=" focus:outline-none rounded bg-transparent w-full ded py-1 px-2" />
                                    <span >➡️</span>
                                </div>

                                <div className=" bg py-4 px-2 flex flex-col " >
                                    {workspacesArr && workspacesArr?.map(w => <li
                                        className="border-b border-primary hover:bg-primary px-2 py-1 rounded cursor-pointer"
                                        onClick={() => {
                                            setWrkInfo({ id: w.workspaceid, name: w.name })
                                            setShowMenu(false)
                                            setSearchTxt("")
                                        }}
                                        key={w.workspaceid} ><a>
                                            {w.name}
                                        </a></li>)}
                                </div>

                            </ul>
                        }
                        <Button className="h-12" onClick={createNewWorkspace}
                            color="success"
                            variant="outlined" ><Plus /><Workspaces /></Button>
                    </div>
                    <div className="w-1 h-1 bg-transparent"></div>
                    <div className="flex justify-between w-full gap-2">
                        <input ref={newDraftTitleTxt} className="px-2 py-1 rounded h-10 w-44 sm:w-64" placeholder="enter name for new sample" />
                        <Button onClick={() => fn(newDraftTitleTxt.current?.value, wrkInfo?.id)} variant="outlined" >create</Button>
                    </div>

                </div>
            }
        </div>
    )
}