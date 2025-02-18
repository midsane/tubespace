import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface ModalActionsInterface {
    content: ReactNode | null,
    title: string | null
}

interface ModalStateInterface extends ModalActionsInterface {
    isOpen: boolean,
}

const initialState: ModalStateInterface = {
    isOpen: false,
    content: null,
    title: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openMoal: (state, action: PayloadAction<ModalActionsInterface>) => {
            state.isOpen = true
            state.content = action.payload.content;
            state.title = action.payload.title;

        },

        closeModal: (state) => {
            state.isOpen = false
            state.content = null;
            state.title = null
        }
    }

})

export const modalActions = modalSlice.actions
export default modalSlice.reducer
