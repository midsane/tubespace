import { collaboratorInterface } from "../../types/youtuberTypes";
import { CollaBoratorCard } from "../cards/collaboratorCard";
import { forwardRef } from "react";

interface propInterface {
    workspaceName?: string | undefined,
    workspaceId?: number | undefined,
    collaboratorInfo: collaboratorInterface[] | null | undefined
}


export const CollaboratorCardSectionWrap = forwardRef<HTMLDivElement, propInterface>(({ collaboratorInfo: collaboratorArr }, ref) => {

    console.log(collaboratorArr)

    return (
        <div ref={ref} className={`flex flex-col gap-10 p-10 justify-start items-center  overflow-x-hidden overflow-y-scroll rounded-2xl scroll-smooth border border-secondaryLight h-[90%] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent  w-[95%] sm:w-[90%] `}>

            {collaboratorArr && collaboratorArr.map(co => <CollaBoratorCard {
                ...co}
                extraTStyle="cursor-pointer hover:opacity-100 opacity-90 bg-secondary border-white/10 duration-75 ease-linear "
                key={co.collaboratorId} />)}
        </div>
    )
})