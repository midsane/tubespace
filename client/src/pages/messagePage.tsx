import { PageWrapper } from "@/components/pagesWrapper/pagesWrapper"

export const MessagesPage = () => {
    return (<PageWrapper
        headerText="Messages"
        leftContent={<LeftContent />}
        rightContent={<RightContent />}
    />)
}

const LeftContent = () => {
    return <div className="h-full w-full " >s</div>
}

const RightContent = () => {
    return <div className="h-full w-full " >lore</div>
}