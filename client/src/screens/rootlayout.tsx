import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { storeDispatchType, storeStateType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../store/sidebar.slice";

export const RootLayout: React.FC = () => {

    const dispatch: storeDispatchType = useDispatch()
    const sideBarState = useSelector((state: storeStateType) => state.sidebar)
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 850 && sideBarState.onLaptopScreen){
                dispatch(sidebarActions.changeToMobile())
            }
            else if(window.innerWidth >= 850 && !sideBarState.onLaptopScreen){
                dispatch(sidebarActions.changeToLaptop())
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sideBarState]);
    return (
        <main className="min-h-screen bg-black liter-regular  ">
            <Outlet />
        </main>
    )
}

