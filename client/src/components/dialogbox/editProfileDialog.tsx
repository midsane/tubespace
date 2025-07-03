import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProfileEditCard } from "../pagesUi/profilepageUI/editProfile"
import { EditIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useUserStore } from "@/store/user.store"

export function EditProfileDialog() {
    const name = useUserStore((state) => state.name)
    const bio = useUserStore((state) => state.bio)
    const link = useUserStore((state) => state.attachedLinks)
    const profileImgUrl = useUserStore((state) => state.profileImgUrl)
    const bannerImgUrl = useUserStore((state) => state.bannerImgUrl)

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className="flex text-chart-3 gap-2 w-full" >
                        <EditIcon />
                        <h1 className="max-[600px]:hidden" >Edit Profile</h1>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-[600px]:w-96  flex flex-col gap-5 justify-center items-start">
                    <ProfileEditCard />
                </DialogContent>
            </form>
        </Dialog>
    )
}
