import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProfileEditCard } from "../pagesUi/profilepageUI/editProfile"
import { useState } from "react"
import { DragAndDropVideo } from "../dragAndDrop/dragAndDrop"
import { Button } from "../ui/button"
import { Upload, UploadIcon } from "lucide-react"


export function UploadEditedVideoDialog({ TriggerJsx }: { TriggerJsx: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleOpenChange = (value: boolean) => {
        if (!submitting) {
            setOpen(value)
        }
    }
    return (
        <Dialog open={open} onOpenChange={handleOpenChange} >
            <form>
                <DialogTrigger asChild>
                    {TriggerJsx}
                </DialogTrigger>
                <DialogContent className="max-[600px]:w-96  flex flex-col gap-5 justify-center items-center">
                    <DragAndDropVideo />
                </DialogContent>
            </form>
        </Dialog>
    )
}


