import { Main } from '../../components/main'
import { linkType, ScreenWrapper } from '../../components/ScreenWrapper'

export function HomeScreen() {

    return (
        <ScreenWrapper links={linkType.one} preRouter="/"  >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <Main />
            </div>
        </ScreenWrapper>
    )
}




