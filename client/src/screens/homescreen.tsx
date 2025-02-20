import { Main } from '../components/main'
import { Sidebar } from '../components/sidebar'

export function HomeScreen() {

    return (
        <div className='w-screen h-screen flex justify-end max-[850px]:text-xs ' >
            <Sidebar />
            <Main />
        </div>
    )
}




