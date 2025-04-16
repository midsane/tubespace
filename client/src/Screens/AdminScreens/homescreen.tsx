import { redirect, useParams } from 'react-router-dom'
import { Main } from '../../components/main'
import { linkType, ScreenWrapper } from '../../components/ScreenWrapper'
import { useSelector } from 'react-redux';
import { storeStateType } from '../../store/store';
import { RefreshLogin } from '../RefreshLogin';

export function HomeScreen() {
    const { username } = useParams();
    const CUD = useSelector((state: storeStateType) => state.youtuberInfo).user
    const currentUsername = CUD?.username;
    const userRole = useSelector((state: storeStateType) => state.userRole).role
    console.log('currentUsername: ', currentUsername)
    console.log('userRole: ', userRole)
    console.log('username: ', username)
    const currentUser = currentUsername === username && username ? true : false;
    if (!currentUsername && !userRole) return <RefreshLogin />
    if (username)
        return (
            <ScreenWrapper links={linkType.one} preRouter={"/y/"}  >
                <div className="flex h-full relative justify-center bg-black items-center ">
                    <Main username={username} otherUser={!currentUser} />
                </div>
            </ScreenWrapper>
        )
    else redirect("/404")

}




