import { redirect, useParams } from "react-router-dom";
import { MainCol } from "../../components/main";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { storeStateType } from "../../store/store";
import { useSelector } from "react-redux";
import { RefreshLogin } from "../RefreshLogin";

export function HomeScreenCol() {

    const { username } = useParams();
    const CUD = useSelector((state: storeStateType) => state.collaboratorInfo).user
    const currentUsername = CUD?.username;
    const userRole = useSelector((state: storeStateType) => state.userRole).role

    const currentUser = currentUsername === username && username ? true : false;
    console.log("currentUsername: ", currentUsername)
    console.log("userRole: ", userRole)
    console.log("username: ", username)
    console.log('currentUser: ', currentUser)

    if (!currentUsername && !userRole) return <RefreshLogin />
    if (username)
        return (
            <ScreenWrapper links={linkType.one} preRouter={"/y/"}  >
                <div className="flex h-full relative justify-center bg-black items-center ">
                    <MainCol username={username} otherUser={!currentUser} />
                </div>
            </ScreenWrapper>
        )
    else redirect("/404")
}




