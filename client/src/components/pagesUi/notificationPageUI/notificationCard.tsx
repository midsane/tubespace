import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useState } from "react"
import { FullTextDialogView } from "../common/fullTextDialogView"

const CHAR_LIMIT = 200;

export const NotificationCard = ({ time, title, description, read: isRead, userPfp, userId }:
    ({ time: number, title?: string, description?: string, read: boolean, userPfp?: string, userId?: number, })) => {

    const [read, setRead] = useState<boolean>(isRead);

    const handleCheck = (checked: boolean) => {
        setRead(checked)
    }

    const isDescriptionLong = description && description.length > CHAR_LIMIT;
    const truncatedDescription = isDescriptionLong ? description.slice(0, CHAR_LIMIT) + "..." : description;

    return (<Card className="w-[90%] text-popover-foreground">
        <CardHeader className="flex flex-col gap-3" >
            <div className="flex gap-2 items-end">
                {userPfp && <img src={userPfp} alt="user profile" className="object-cover border border-popover-foreground w-10 h-10 rounded-full" />}
                <span className="text-popover-foreground font-medium">{userId}</span>
            </div>
            {title?.trim() !== "" && <CardTitle>{title}</CardTitle>}
            {description?.trim() !== "" && <CardDescription className="flex text-popover-foreground flex-col gap-1" >
                <p>{truncatedDescription}</p>
                {isDescriptionLong && <FullTextDialogView text={description} />}
            </CardDescription>}
        </CardHeader>
        <CardFooter className="flex sm:flex-row-reverse flex-col sm:items-stretch items-end gap-2" >
            <div className="w-full justify-end flex " >
                <div className="flex gap-2 items-center">
                    {!read && <div className="flex flex-row-reverse text-chart-3 items-center gap-3">
                        <Label className="opacity-80" htmlFor="terms">mark as read</Label>
                        <Checkbox onCheckedChange={handleCheck} className="data-[state=checked]:border-chart-3 
                         data-[state=checked]:bg-chart-3  dark:data-[state=checked]:bg-chart-3
                         data-[state=checked]:text-background " id="terms" />
                    </div>}
                    {read && <Check className="text-chart-1" />}
                </div>
            </div>
            <div className="text-xs opacity-60 whitespace-nowrap" >
                {new Date(time).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </div>
        </CardFooter>
    </Card>)
}
