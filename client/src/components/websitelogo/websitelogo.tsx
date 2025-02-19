import { useSelector } from "react-redux"
import { storeStateType } from "../../store/store"
import favicon from "/favicon.png"
export const WebsiteLogo: React.FC<{ noText?: boolean }> = ({ noText = false }) => {
    const sidebarState = useSelector((state: storeStateType) => state.sidebar)
    return <span className="flex gap-2 cursor-pointer justify-center items-center flex-col sm:flex-row">
        <img width={35} className="" src={favicon} />
        {!noText && sidebarState.onLaptopScreen && <p className="text-gray-200">TubeSpace</p>}
    </span>
}