import { useSelector } from "react-redux";
import { storeStateType } from "../../store/store";
import { ReactNode } from "react";


export const CardWrapper: React.FC<{ children: ReactNode, extraTStyle: string }> = ({ children, extraTStyle }) => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <div className={`${extraTStyle} ${onLaptopScreen} w-56 h-36 sm:w-72 sm:h-48 flex-shrink-0 flex flex-col px-4 sm:px-9 gap-2 justify-center items-center rounded-xl border relative`} >
            {children}
        </div>
    )
}


