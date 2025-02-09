import { createSlice } from "@reduxjs/toolkit";

const modalSlice =  createSlice({
    name: "modal",
    initialState: false,
    reducers: {
        changeState: (state,action) => {
            state = action.payload;
        }
    }

})

export const modalActions = modalSlice.actions
export default modalSlice.reducer