import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FullTextDialogView } from "../common/fullTextDialogView"


const CHAR_LIMIT = 80;


export const TaskCard = ({ id, title, assignedByPfp, assignedToPfp, assignedBy, assignedTo, deadline, description, attachment, completed = false }:
    ({
        id: number, title: string, assignedBy?: string, assignedTo?: string, assignedByPfp?: string,
        assignedToPfp?: string, deadline: number, description: string, attachment: string, completed?: boolean
    })) => {

        console.log(assignedByPfp, assignedToPfp, assignedBy, assignedTo, title, description, deadline, attachment, completed, id);
    const isDescriptionLong = description && description.length > CHAR_LIMIT;
    const truncatedDescription = isDescriptionLong ? description.slice(0, CHAR_LIMIT) + "..." : description;

    return (<Card className="w-[90%] text-popover-foreground">
        <CardHeader className="flex flex-col gap-3" >
            <div className="flex gap-2 items-end">
                {assignedByPfp && <img src={assignedByPfp} alt="user profile" className="object-cover border border-popover-foreground w-10 h-10 rounded-full" />}
                <span className="text-popover-foreground font-medium">{assignedBy}</span>
            </div>
            {title?.trim() !== "" && <CardTitle>{title}</CardTitle>}
            {description?.trim() !== "" && <CardDescription className="flex text-popover-foreground flex-col gap-1" >
                <p>{truncatedDescription}</p>
                {isDescriptionLong && <FullTextDialogView text={description} />}
            </CardDescription>}
        </CardHeader>
        <CardFooter className="flex sm:flex-row-reverse flex-col sm:items-stretch items-end gap-2" >

            <div className="text-xs opacity-60 whitespace-nowrap" >
                {!completed ? new Date(deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }) : "Completed"}
            </div>
        </CardFooter>
    </Card>)
}
