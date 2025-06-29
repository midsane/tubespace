import type { ReactNode } from "react"
import { TopEditorCard } from "./topeditorcard"

export const RightContent = ({headerJSX}: {headerJSX: ReactNode}) => {
    return <div className="h-full w-full flex flex-col gap-10" >
        <div className=" h-[3%] w-full " >
            {headerJSX}
        </div>

        <div className="flex gap-5 flex-col h-[97%] overflow-y-scroll" >
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />
            <TopEditorCard />

        </div>
    </div>
}
