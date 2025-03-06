import { useRef } from "react"
// import { storeDispatchType } from "../../store/store"
// import { useDispatch } from "react-redux"
// import { youtuberDraftActions } from "../../store/youtuberStore/youtuberDraftVideos.slice"
import { Button } from "@mui/material"


export const CreateNewSample = () => {
    // const dispatch: storeDispatchType = useDispatch()

    const newDraftTitleTxt = useRef<HTMLInputElement>(null)

    const handleCreateSampleForFirstTime = () => {

        
        // dispatch(draftSampleActions.addDrafts({
        //     DraftName: newDraftTitleTxt.current!.value,
        //     title: "",
        //     description: "",
        //     _id: uuidv4(),
        //     thumbnail: null,
        //     video: null
        // }))
        // dispatch(modalActions.closeModal())
    }

    return (
        <div className="flex gap-2" >
            <input ref={newDraftTitleTxt} className="px-2 py-1 rounded" placeholder="enter name for new sample" />
            <Button onClick={handleCreateSampleForFirstTime} variant="outlined" >create</Button>
        </div>
    )
}