import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const thirdPersonSlice = createSlice({
    name: "thirdperson",
    initialState: {val: false},
    reducers: {
        setVal: (state, action: PayloadAction<boolean>) => {
            state.val = action.payload
        },  
    }

})

export const thirdPersonActions = thirdPersonSlice.actions
export default thirdPersonSlice.reducer