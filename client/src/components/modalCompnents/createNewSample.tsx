import { useCallback, useEffect, useRef, useState } from "react"
import { Button, } from "@mui/material"
import { Plus } from "lucide-react"
import { Workspaces } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { storeDispatchType } from "../../store/store"
import toast from "react-hot-toast"
import { createWorkspaceFetch, fetchRelevantWorkspaces } from "../../fetch/fetchForYoutuber"
import { modalActions } from "../../store/modal"
import { useFetch } from "../../hooks/fetchHooks"
import { workspaceInterface } from "../../types/youtuberTypes"


const TIME_GAP = 500


export const CreateNewSample = <T extends (...args: any) => any>({ fn, type = 1 }: { fn: T, type?: number }) => {
    const newDraftTitleTxt = useRef<HTMLInputElement>(null)
    const [fetchCnt, setFetchCnt] = useState<number>(0)
    const [
        searchTxtWithTime,
        setSearchTxtWithTime
    ] = useState<{ txt: string, time: Date }>({ txt: "", time: new Date() })

    const fetchWorkspaces = useCallback(() => fetchRelevantWorkspaces(searchTxtWithTime.txt), [fetchCnt]);
    const {
        data: workspacesArr,
        error,
        loading
    } = useFetch<workspaceInterface[]>(fetchWorkspaces)

    useEffect(() => {
        const currentTime = new Date()
        if(currentTime.getTime() - searchTxtWithTime.time.getTime() > TIME_GAP){
            setFetchCnt(fetchCnt + 1)
        }
    }, [searchTxtWithTime])


    const dispatch: storeDispatchType = useDispatch()

    const [wrkInfo, setWrkInfo] = useState<null | { id: number, name: string }>(null)

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
        const currentTime = new Date()
        setSearchTxtWithTime({ txt: e.target.value, time: currentTime })
       
    }

    return (
        <div className="flex gap-2" >
            {type === 1 ?
                <>
                    <input ref={newDraftTitleTxt} className="px-2 py-1 rounded" placeholder="enter name for new sample" />
                    <Button onClick={() => fn(newDraftTitleTxt.current?.value)} variant="outlined" >create</Button></> :

                <div className="flex flex-col gap-5 w-full justify-center items-start">
                    <div className="dropdown h-10 flex gap-2 dropdown-start">
                        <div tabIndex={0} role="button" className="btn w-44 sm:w-64 h-10">{wrkInfo ? wrkInfo.name : "Select a Workspace ⬇️"}</div>
                        <ul tabIndex={0} className="dropdown-content menu relative bg-base-100 rounded-md z-1 w-44 sm:w-64 mt-14 p-2 shadow-sm pt-10">
                            {workspacesArr && workspacesArr.length === 0 ? <li>No workspaces found</li>
                                :
                                <div className="absolute top-2 left-2 bg-secondary items-center px-2 right-2 flex justify-between">
                                    <input
                                        value={searchTxtWithTime.txt}
                                        onChange={inputOnChange}
                                        className=" focus:outline-none rounded bg-transparent w-full ded py-1 px-2" />
                                    <span className="cursor-pointer active:scale-95 ease-linear duration-75" >➡️</span>
                                </div>
                            }

                            {loading && <li>Loading...</li>}
                            {error && <li>{error}</li>}
                            {!loading && workspacesArr && workspacesArr?.map(w => <li
                                onClick={() => setWrkInfo({ id: w.workspaceid, name: w.name })}
                                key={w.workspaceid} ><a>
                                    {w.name}
                                </a></li>)}

                        </ul>
                        <Button className="h-12" onClick={createNewWorkspace}
                            color="success"
                            variant="outlined" ><Plus /><Workspaces /></Button>
                    </div>
                    <div className="flex justify-between w-full gap-2">
                        <input ref={newDraftTitleTxt} className="px-2 py-1 rounded h-10 w-44 sm:w-64" placeholder="enter name for new sample" />
                        <Button onClick={() => fn(newDraftTitleTxt.current?.value, wrkInfo?.id)} variant="outlined" >create</Button>
                    </div>

                </div>
            }
        </div>
    )
}