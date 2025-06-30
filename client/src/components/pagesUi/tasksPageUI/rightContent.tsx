import { CreateTaskDialog } from "@/components/dialogbox/createTaskDialog"

export const RightContent = () => {
    return <div className="h-full w-full flex flex-col gap-10" >
        <div className=" h-[3%] w-full " >
            <h1>Assign Work and upload videos to youtube with one click!</h1>
        </div>
        <div className="flex gap-5 mt-1 w-fit  flex-col h-[97%] " >
            <CreateTaskDialog/>
        </div>
    </div>
}



