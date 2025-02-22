import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ReactNode, useRef } from "react";
import { storeStateType } from '../../store/store';
import { useSelector } from 'react-redux';

export const CardSection: React.FC<{ children: ReactNode }> = ({ children }) => {
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;

    const handleLeftSlide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollLeft -= onLaptopScreen? 400: 300;
        }
    }

    const handleRightSlide = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollLeft += onLaptopScreen? 400: 300;
        }
    }

  
    return (
        <div ref={scrollDivRef} className="w-[80%] max-[400px]:w-[90%] sm:w-[90%] border-x-2 border-secondary max-[400px]:border-0 overflow-x-scroll scroll-smooth  flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-start max-[400px]:overflow-hidden justify-start bg-black h-fit sm:h-[80%] items-center scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100  dark:scrollbar-thumb-accent dark:scrollbar-track-transparent gap-10 pl-10 pr-10 py-10 max-[400px]:pl-2  max-[400px]:py-8 " >

            <div onClick={handleRightSlide} className="absolute max-[400px]:hidden bg-secondaryLight bottom-1/2 translate-y-1/2 right-1 sm:right-2 z-20 border border-primary rounded-full p-1 cursor-pointer active:scale-90 ease-linear duration-75 " >
                <KeyboardArrowRightIcon fontSize='small' />
            </div>
            <div onClick={handleLeftSlide} className="absolute max-[400px]:hidden bottom-1/2 translate-y-1/2 left-0 sm:left-2 z-10 cursor-pointer border-primary bg-secondaryLight border rounded-full p-1 active:scale-90 duration-75 ease-linear" >
                <KeyboardArrowLeftIcon fontSize='small' />
            </div>

          
            {children}
        </div>
    )
}
