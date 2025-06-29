import { Button } from "@/components/ui/button"
import { LinkIcon, MessageCircleIcon, StickyNote } from "lucide-react"
import { FullTextDialogView } from "../common/fullTextDialogView";

const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam at obcaecati vel enim minima nostrum consectetur, minus, consequuntur asperiores, error molestias iure ullam. Eius facere repellat sunt porro rerum illo!"
const CHAR_LIMIT = 200;

export const LeftContent = () => {

    const isDescriptionLong = description && description.length > CHAR_LIMIT;
    const truncatedDescription = isDescriptionLong ? description.slice(0, CHAR_LIMIT) + "..." : description;

    return <div className="h-full w-full" >
        <div className="w-full relative rounded-lg">
            <img
                className="w-full border-b border-border object-cover"
                src="https://t3.ftcdn.net/jpg/08/76/40/48/360_F_876404886_rm2lt2JPXb1VNLP14tWBEQSiJqQTSySe.jpg">
            </img>
            <div className="absolute h-fit -bottom-0 translate-y-1/2 left-5  flex gap-2 items-center" >
                <img
                    className="h-24 rounded-full border border-border aspect-square object-cover "
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s"
                />
                <div className="mt-8 flex w-full" >
                    <h1>username</h1>
                </div>
            </div>

            <div className="absolute h-fit -bottom-1 translate-y-[100%] right-5  flex gap-2 items-center" >

                <Button className="flex gap-2 w-full" >
                    <MessageCircleIcon />
                    <h1>chat</h1>
                </Button>
            </div>

        </div>

        <div className="w-[95%] m-auto flex flex-col gap-2 rounded-xl mt-14 py-5 px-10 bg-popover text-popover-foreground ">
            {truncatedDescription}
            <FullTextDialogView text={description} />
        </div>
        <br />

        <div className="px-10  flex flex-col gap-2">
            <div className="flex gap-2 opacity-80 items-center">
                <LinkIcon size={15} />
                <p>No Attached Link</p>
            </div>

            <div className="flex gap-2 opacity-80 items-center">
                <StickyNote size={15} />
                <p>Task Completed: 15</p>
            </div>

        </div>
    </div>
}