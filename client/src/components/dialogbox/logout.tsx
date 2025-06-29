import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LogOutIcon } from "lucide-react"
import type { ReactNode } from "react"

export function LogoutBox({ TriggerJsx }: { TriggerJsx: ReactNode }) {

    return (
        <Dialog >
            <form>
                <DialogTrigger asChild>
                    {TriggerJsx}
                </DialogTrigger>
                <DialogContent className="max-w-60  flex flex-col gap-5 justify-center items-start">
                    <DialogHeader className="flex flex-col gap-5 mt-4" >
                        <DialogTitle>Are you sure you want to Log out ?</DialogTitle>
                        <LogOutIcon size={30} />
                    </DialogHeader>
                    <DialogFooter className="flex flex-col gap-2" >
                        <Button className="bg-primary text-primary-foreground" type="submit">Logout</Button>
                        <DialogClose asChild>
                            <Button className="bg-secondary text-secondary-foreground" type="button">cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
