import { LeftContent } from "@/components/pagesUi/profilepageUI/leftcontent";
import { RightContent } from "@/components/pagesUi/profilepageUI/rightcontent";
import { SearchBar } from "@/components/pagesUi/profilepageUI/searchbar";
import { PageWrapper } from "@/components/pagesWrapper/pagesWrapper";

export const ProfilePage = () => {

    return (<PageWrapper
        HeaderJSX={<SearchBar />}
        headerText="Profile"
        leftContent={<LeftContent />}
        rightContent={<RightContent headerJSX={<> <h1>Top Editors </h1>
            <h1 className="opacity-70" >based on ratings an tasks completed</h1></>} />}
    />)
}






