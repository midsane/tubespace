import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal"
import sidebarReducer from "./sidebar.slice"
import draftReducer from "./Draftvideo.slice"
import youtuberReducer from "./youtuberStore/youtuber.slice"

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        sidebar: sidebarReducer,
        draft: draftReducer,
        youtuberInfo: youtuberReducer
    }
})

export type storeStateType = ReturnType<typeof store.getState>
export type storeDispatchType = typeof store.dispatch