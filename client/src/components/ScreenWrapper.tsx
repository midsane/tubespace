import { useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar'
import { storeStateType } from '../store/store';
import React, { ReactNode } from 'react';

export const ScreenWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;

    return (
        <div className='w-screen h-[100dvh] flex justify-end max-[850px]:text-xs ' >
            <Sidebar />
            <div className={`h-full text-slate-300 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]  max-[520px]:w-[85vw]"}`}>
                {children}
            </div>
        </div>
    )
}




