import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface ModalActionsInterface {
    content: ReactNode | null,
    title: string | null,
    buttons?: boolean,
    handleSubmit?: () => void
}

interface ModalStateInterface extends ModalActionsInterface {
    isOpen: boolean,
}

const initialState: ModalStateInterface = {
    isOpen: false,
    content: null,
    title: null,
    buttons: false,
    handleSubmit: () => {}
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openMoal: (state, action: PayloadAction<ModalActionsInterface>) => {
            state.isOpen = true
            state.content = action.payload.content;
            state.title = action.payload.title;
            state.buttons = action.payload.buttons || false;
            if (action.payload.handleSubmit)
                state.handleSubmit = action.payload.handleSubmit
            else state.handleSubmit = () => {}

        },

        closeModal: (state) => {
            state.isOpen = false
            state.content = null;
            state.title = null;
            state.handleSubmit = () => {};
            state.buttons = false;
        }
    }

})

export const modalActions = modalSlice.actions
export default modalSlice.reducer
