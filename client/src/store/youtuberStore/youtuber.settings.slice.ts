import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInterface } from "../../types/youtuberTypes";


const initialState: Partial<userInterface> = {}

const settingsSlice = createSlice({
    name: "setttingsSlice",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Partial<userInterface>>) => {
            Object.assign(state, action.payload)
        },

        updateData: (state, action: PayloadAction<Partial<userInterface>>) => {
            const newState = { ...state, ...action.payload }
            Object.assign(state, newState)
        },
    },


})

export const settingSliceActions = settingsSlice.actions
export default settingsSlice.reducer
