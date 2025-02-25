import { MainCol } from '../../components/main'
import { SidebarCol } from '../../components/sidebar'

export function HomeScreenCol() {

    return (
        <div className='w-screen h-[100dvh] flex justify-end max-[850px]:text-xs ' >
            <SidebarCol />
            <MainCol />
        </div>
    )
}




