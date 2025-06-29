
import { RightContent } from "@/components/pagesUi/profilepageUI/rightcontent"
import { LeftContent } from "@/components/pagesUi/tasksPageUI/leftContent"
import { PageWrapper } from "@/components/pagesWrapper/pagesWrapper"

export const TaskPage = () => {
    return (<PageWrapper
        headerText="Tasks"
        leftContent={<LeftContent />}
        rightContent={<RightContent headerJSX={<><h1>Top Editors </h1>
            <h1 className="opacity-70" >DM Youtbers to get more work!</h1></>} />}
    />)
}

