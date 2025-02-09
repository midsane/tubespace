import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal"
import sidebarReducer from "./sidebar.slice"

const store = configureStore({
    reducer: {
        modal: modalReducer,
        sidebar: sidebarReducer
    }
})

export { store }