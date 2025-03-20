import { storeStateType, storeDispatchType } from '../store/store';
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { modalActions } from '../store/modal';
import { Button } from '@mui/material';
import { X } from 'lucide-react';


export const Modal = () => {
    const modalState = useSelector((state: storeStateType) => state.modal)
    const dispatch: storeDispatchType = useDispatch()

    const onClose = () => {
        dispatch(modalActions.closeModal())
    }


    if (!modalState.isOpen) return null

    return createPortal(
        <AnimatePresence>
            {modalState.isOpen && (
                <>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='z-[200] backdrop-blur-sm transition-opacity w-screen h-[100dvh] fixed top-0 left-0 bg-opacity-90'
                    />

                    {modalState.fullScreen ?
                        <motion.div
                            initial={{ opacity: 0, y: -150 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 150 }}
                            transition={{ duration: 0.5 }}
                            className='h-screen w-screen  bg-primary bg-opacity-85 flex justify-center items-center  fixed top-0 left-0 z-[300]'
                        >

                            <div onClick={onClose} className='absolute max-[600px]:-rotate-90 top-5 active:scale-95 ease-linear duration-75 cursor-pointer hover:border-accent border rounded p-2 border-secondaryLight right-5 z-[500]'>
                                <X />
                            </div>
                            {modalState.content}

                        </motion.div>
                        :
                        <motion.div
                            initial={{ opacity: 0, y: -150 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 150 }}
                            transition={{ duration: 0.5 }}
                            className="fixed max-[400px]:text-xs text-sm sm:text-lg z-[300] bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
                        >
                            <div className="fixed bottom-1/2 z-20 min-w-72 sm:min-w-[500px] right-1/2 p-10 translate-x-1/2 translate-y-1/2">
                                <div
                                    className="px-5 sm:px-10 py-8 flex flex-col gap-8 rounded-3xl bg-black border border-zinc-700"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between pt-5 items-center relative">
                                        <h2 className="w-full">{modalState.title}</h2>

                                        <div onClick={onClose} className='absolute max-[600px]:-rotate-90 top-0 active:scale-95 ease-linear duration-75 cursor-pointer hover:border rounded p-1 border-secondaryLight right-0 z-[500]'>
                                            <X />
                                        </div>
                                    </div>
                                    <div className="rounded-lg">{modalState.content}</div>
                                    {modalState.buttons &&
                                        <div className="flex w-full justify-center items-center gap-4">
                                            <Button onClick={onClose} variant="outlined" >Cancel</Button>
                                            <Button onClick={modalState.handleSubmit} variant="contained" >{modalState.submitText}</Button>
                                        </div>
                                    }
                                </div>
                            </div>


                        </motion.div>}
                </>
            )}
        </AnimatePresence>,
        document.getElementById('root') as HTMLElement
    );
};


