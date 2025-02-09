import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice =  createSlice({
    name: "sidebar",
    initialState: {onLaptopScreen: true},
    reducers: {
        changeToMobile: (state) => {
            state.onLaptopScreen = false;
        },
        changeToLaptop: (state) => {
            state.onLaptopScreen = true;
        }
    }

})

export const sidebarActions = sidebarSlice.actions
export default sidebarSlice.reducer