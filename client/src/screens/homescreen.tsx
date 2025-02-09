import { Main } from '../components/main'
import { Sidebar } from '../components/sidebar'
import { OuterModal } from '../components/outerModal'

export function HomeScreen() {

    return (
        <div className='w-screen h-screen flex justify-end' >
            <OuterModal />
            <Sidebar />
            <Main />
        </div>
    )
}




