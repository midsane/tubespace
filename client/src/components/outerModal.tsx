import { AnimatePresence, motion } from "framer-motion"
import Modal from "./Modal"
import { useState } from "react";
import { createPortal } from "react-dom";


export const OuterModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    if(!isOpen){
        return <></>
    }
    return (createPortal(<AnimatePresence>
        {isOpen &&
            <motion.div
                className="fixed z-40 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
                initial={{ opacity: 0, y:-150 }}
                animate={{ opacity: 1, y:0}}
                exit={{ opacity: 0, y:150}}
                transition={{ duration: 0.5 }}
            >
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='modal'>
                    <input placeholder='whats your name' />
                </Modal>
            </motion.div>
        }
    </AnimatePresence>, document.body))
}