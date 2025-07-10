import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FullTextDialogView } from "../common/fullTextDialogView"
import { UserRole, type TaskDataType } from "@/types/types";
import { Paperclip, UploadCloudIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { noPfpImg } from "@/constast";
import { UploadEditedVideoDialog } from "@/components/dialogbox/uploadEditedVideoDialog";
import { useOpenTaskUpdate } from "@/store/updateTaskSheet";
import { CreateTaskSheet } from "@/components/dialogbox/createTaskSheet";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


const CHAR_LIMIT = 80;

type TaskCardProps = Partial<TaskDataType> & {
    loading?: boolean;
}

export const TaskCard = (
    {
        loading = false,
        id,
        taskTitle,
        deadline,
        workDescription,
        attachments,
        isCompleted = false,
        editor,
        youtuber
    }: TaskCardProps) => {

    if (!id) {
        console.error("Task ID is undefined or null");
        return <></>
    }

    const setTaskId = useOpenTaskUpdate.getState().setTaskId;

    const taskPage = youtuber ? UserRole.EDITOR : UserRole.YOUTUBER;
    const pfp = editor?.profileImgUrl || youtuber?.profileImgUrl || noPfpImg;
    const isDescriptionLong = workDescription && workDescription.length > CHAR_LIMIT;
    const truncatedDescription = isDescriptionLong ? workDescription.slice(0, CHAR_LIMIT) + "..." : workDescription;


    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Card className="w-[90%] text-popover-foreground relative">
            <CardHeader className="flex flex-col gap-3" >
                <div className="flex gap-2 items-end w-full">
                    {!loading && pfp && <img src={pfp} alt="user profile" className="object-cover border border-popover-foreground w-8 sm:w-10 aspect-square rounded-full" />}
                    {loading && <Skeleton className="w-8 sm:w-10 aspect-square border rounded-full" />}
                    <span className="text-popover-foreground font-medium flex flex-col w-full ">
                        {!loading && <p className="text-xs opacity-80" >{taskPage === UserRole.EDITOR ? "assigned by" : "assigned to"}</p>}
                        {loading && <Skeleton className="w-1/2 h-6 sm:h-8" />}

                        {!loading && <h3>{taskPage === UserRole.EDITOR ? youtuber?.name : editor?.name}</h3>}

                    </span>
                </div>
                {!loading && taskTitle?.trim() !== "" && <CardTitle>{taskTitle}</CardTitle>}
                {loading && <CardTitle className="w-full" ><Skeleton className="w-1/2 h-3" /></CardTitle>}
                {workDescription?.trim() !== "" && <CardDescription className="flex text-popover-foreground w-full flex-col gap-1" >
                    {!loading && <p>{truncatedDescription}</p>}
                    {!loading && isDescriptionLong && <FullTextDialogView text={workDescription} />}
                    {loading && <CardTitle><Skeleton className="w-full h-5" /></CardTitle>}
                </CardDescription>}
            </CardHeader>
            <CardFooter className="flex flex-col items-end gap-2 sm:gap-4" >
                <div className="text-xs w-full whitespace-nowrap text-chart-3" >
                    <h3>{taskPage === UserRole.EDITOR ?
                        <div className="w-full">{attachments && attachments.length > 0 ?
                            <div className="flex items-center sm:items-end justify-between w-full" >
                                {!loading && <div className="p-1 hover:opacity-100 active:scale-90 ease-in duration-75
                            rounded-sm opacity-80 text-chart-4 border-2" >
                                    <UploadEditedVideoDialog
                                        taskId={id}
                                        TriggerJsx={<UploadCloudIcon size={20} />} />
                                </div>}
                                {loading && <Skeleton />}
                                {!loading && <PreviewAttachment
                                    dialogOpen={dialogOpen}
                                    setDialogOpen={setDialogOpen}
                                    selectedFiles={attachments || []} />}
                            </div> :
                            <div className="flex items-center sm:items-end justify-between w-full" >
                                {!loading && <div className="p-1 hover:opacity-100 active:scale-90 ease-in duration-75
                            rounded-sm opacity-80 text-chart-4 border-2" >
                                    <UploadEditedVideoDialog
                                        taskId={id}
                                        TriggerJsx={<UploadCloudIcon size={20} />} />
                                </div>}
                                {loading && <Skeleton />}
                                {!loading && <p className="opacity-60 text-sm" >no attachments</p>}
                            </div>
                        }</div>
                        :
                        <>
                            {!loading && <CreateTaskSheet
                                type={2}
                                TriggerJsx={<div
                                    onClick={() => setTaskId(id)}
                                    className="p-1 w-fit hover:opacity-100 active:scale-90 ease-in duration-75
                            rounded-sm opacity-80 text-chart-4 border-2" >
                                    <PreviewAttachment
                                        dialogOpen={dialogOpen}
                                        setDialogOpen={setDialogOpen}
                                        selectedFiles={attachments || []} />

                                </div>} />
                            }
                            {loading && <Skeleton className="h-6 w-6 rounded-sm" />}
                        </>}</h3>
                </div>

                <Separator />
                {!loading && <div className="text-xs opacity-60 whitespace-nowrap" >
                    {!isCompleted && deadline ? new Date(deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        year: "numeric",
                        minute: "2-digit"
                    }) : "Completed"}
                </div>}
                {loading && <Skeleton className="h-2 w-1/3" />}
            </CardFooter>
        </Card>
    )
}


const PreviewAttachment = ({
    dialogOpen, setDialogOpen,
    selectedFiles
}:
    {
        dialogOpen: boolean, setDialogOpen: (open: boolean) => void,
        selectedFiles: string[]
    }) => {

    return (<>
        {
            selectedFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" type="button">
                                <Paperclip className="opacity-60" size={20} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                            <Carousel className="w-full mt-10 sm:mt-0 relative max-w-full">
                                <CarouselContent>
                                    {selectedFiles.map((url, idx) => {
                                        const isVideo = url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
                                        const previewUrl = url;
                                        return (
                                            <CarouselItem key={idx} className="flex flex-col items-center gap-2">
                                                <div className="relative flex justify-center items-center w-full">
                                                    {isVideo ? (
                                                        <video src={previewUrl} controls className="max-h-[70vh] w-auto rounded-lg" />
                                                    ) : (
                                                        <img src={previewUrl} className="max-h-[70vh] w-auto rounded-lg" />
                                                    )}
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
                            </Carousel>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }</>)

}