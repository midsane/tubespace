
import { RightContent } from "@/components/pagesUi/tasksPageUI/rightContent"
import { LeftContent } from "@/components/pagesUi/tasksPageUI/leftContent"
import { PageWrapper } from "@/components/pagesWrapper/pagesWrapper"
import { CreateTaskDialog } from "@/components/dialogbox/createTaskDialog"
import { useScreenSizeStore } from "@/store/screenSizestate.store"

export const TaskPage = () => {
    const mobileView = useScreenSizeStore((state) => state.mobileView)
    return (<PageWrapper
        headerText="Tasks"
        HeaderJSX={mobileView ? <CreateTaskDialog /> : <></>}
        leftContent={<LeftContent />}
        rightContent={<RightContent />}
    />)
}

