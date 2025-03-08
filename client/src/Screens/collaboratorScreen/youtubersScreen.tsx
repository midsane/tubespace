import { useSelector } from "react-redux";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeStateType } from "../../store/store";
import { CommandSearch } from "../../components/searchBar/searchbar";


export const YoutuberScreen: React.FC = () => {
 
    return (
        <ScreenWrapper links={linkType.two} preRouter={"/c/"}  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Youtubers / WorkSpaces" width={"100%"} paddingBottom="12px" borderRadius="0px" />
                <YoutuberArea />
            </div>
        </ScreenWrapper>
    )
}

const YoutuberArea = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (<div className={`w-[90%] text-xs sm:text-sm justify-start pt-24 items-center h-full relative flex flex-col ${!onLaptopScreen ? "sm:w-[90%]" : "sm:w-[80%]"} `}>

        <CommandSearch placeholder="Search Workspaces..." />
        <div className="h-[90%] w-full border border-secondaryLight overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent rounded-xl grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  lg:place-content-start  place-items-center gap-10 p-5">
           
        </div>
    </div>)
}


