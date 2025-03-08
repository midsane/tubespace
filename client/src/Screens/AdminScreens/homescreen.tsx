import { useLocation } from 'react-router-dom'
import { Main } from '../../components/main'
import { linkType, ScreenWrapper } from '../../components/ScreenWrapper'

export function HomeScreen() {
    const location = useLocation();
    console.log(location);

    return (
        <ScreenWrapper links={linkType.one} preRouter={"/y/"}  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <Main />
            </div>
        </ScreenWrapper>
    )
}




