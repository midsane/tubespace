import { RightContent as EditorRightContent } from "@/components/pagesUi/profilepageUI/rightcontent"
import { RightContent } from "@/components/pagesUi/tasksPageUI/rightContent"
import { LeftContent } from "@/components/pagesUi/tasksPageUI/leftContent"
import { PageWrapper } from "@/components/pagesWrapper/pagesWrapper"
import { CreateTaskSheet } from "@/components/dialogbox/createTaskSheet"
import { useScreenSizeStore } from "@/store/screenSizestate.store"
import { useUserStore } from "@/store/user.store"
import { UserRole } from "@/types/types"

export const TaskPage = () => {
    const mobileView = useScreenSizeStore((state) => state.mobileView)
    const role = useUserStore((state) => state.user.role)
    return (<PageWrapper
        headerText="Tasks"
        HeaderJSX={mobileView && role === UserRole.YOUTUBER ? <CreateTaskSheet /> : <></>}
        leftContent={<LeftContent />}
        rightContent={role === UserRole.YOUTUBER ? <RightContent /> : <EditorRightContent />}
    />)
}

