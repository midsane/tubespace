
import { RightContent } from "@/components/pagesUi/tasksPageUI/rightContent"
import { LeftContent } from "@/components/pagesUi/tasksPageUI/leftContent"
import { PageWrapper } from "@/components/pagesWrapper/pagesWrapper"
import { CreateTaskSheet } from "@/components/dialogbox/createTaskSheet"
import { useScreenSizeStore } from "@/store/screenSizestate.store"

export const TaskPage = () => {
    const mobileView = useScreenSizeStore((state) => state.mobileView)

    return (<PageWrapper
        headerText="Tasks"
        HeaderJSX={mobileView ? <CreateTaskSheet /> : <></>}
        leftContent={<LeftContent />}
        rightContent={<RightContent />}
    />)
}

