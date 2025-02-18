import { storeStateType, storeDispatchType } from '../store/store';
import { UtensilsCrossed, Utensils } from 'lucide-react';
import { motion } from "framer-motion"
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { modalActions } from '../store/modal';

export const Modal = () => {
    const modalState = useSelector((state: storeStateType) => state.modal)
    const dispatch: storeDispatchType = useDispatch()
    const [cancelHover, setCancelHover] = useState(false)

    if (!modalState.isOpen) return <></>

    const onClose = () => {
        dispatch(modalActions.closeModal())
    }

    return (createPortal(

        <motion.div
            initial={{ opacity: 0, y: -150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ duration: 0.5 }}
            className="fixed z-40 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
        >
            <BackDrop />
            <div
                className="fixed bottom-1/2 z-20 right-1/2 p-10 translate-x-1/2 translate-y-1/2 " >
                <div className="px-10 py-8 flex flex-col gap-4 rounded-3xl bg-neutral-900 border border-zinc-700" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center relative">
                        <h2>{modalState.title}</h2>

                        <motion.button
                            className='p-3 rounded-full absolute right-0 z-20 bg-black'
                            onClick={onClose}
                            onMouseEnter={() => setCancelHover(true)}
                            onMouseLeave={() => setCancelHover(false)}

                        >
                            {!cancelHover ?
                                <ModalSvgButton onClose={onClose} color="bg-accent" key={cancelHover ? 1 : 0} Svg={<Utensils size={20} color='#ADD8E6' />} />
                                :
                                <ModalSvgButton onClose={onClose} color="bg-red-400" key={cancelHover ? 1 : 0} Svg={<UtensilsCrossed color="#FF6347" />} />
                            }
                        </motion.button>
                    </div>
                    <div className="p-10 bg-black rounded-lg">
                        {modalState.content}
                    </div>
                </div>
            </div>
        </motion.div>
        , document.body)
    );
};




interface ModalSvgButtonProps {
    Svg: React.ReactNode,
    color: String,
    onClose: () => void;
}

const ModalSvgButton: React.FC<ModalSvgButtonProps> = ({ Svg, color, onClose }) => {
    return (<div
        onClick={onClose}
        className='absolute hover:scale-105 ease-linear duration-75 active:scale-75 top-0 w-fit p-2 translate-x-[-8px] translate-y-[-8px] aspect-square rounded-full  flex justify-center items-center left-0 z-20 '>
        <div className='opacity-0' > <Utensils size={20} color='#ADD8E6' /> </div>
        <div

            className='absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 z-40 rounded-full bg-black' >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
            >
                {Svg}
            </motion.div>
        </div>
        <motion.div
            initial={{ rotate: 0, opacity: 1, y: 4 }}
            animate={{ rotate: 200, opacity: 0, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`w-1/2 h-2 absolute left-1/2 z-0 origin-left ${color} bottom-1/2 translate-y-1/2`}></motion.div>
    </div>)
}

const BackDrop = () => {

    return (createPortal(<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}

        className='bg-black z-20 w-screen h-screen fixed top-0 left-0 bg-opacity-80' ></motion.div>,
        document.body))
}