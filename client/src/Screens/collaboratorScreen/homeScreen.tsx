import { MainCol } from "../../components/main";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";

export function HomeScreenCol() {

    return (
        <ScreenWrapper links={linkType.two} preRouter={"/c/"}  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <MainCol />
            </div>
        </ScreenWrapper>
    )
}




