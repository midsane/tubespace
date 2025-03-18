import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal"
import sidebarReducer from "./sidebar.slice"
import youtuberReducer from "./youtuberStore/youtuber.slice"
import youtuberAssignedTaskReducer from "./youtuberStore/youtuberAssignedTask.slice"
import youtuberWorkSpacesReducer from "./youtuberStore/youtuberWorspaces.slice"
import thirdPersonReducer from "./thirdperson.slice"

import userRoleReducer from "./role.slice"

import collaboratorReducer from "./collaboratorStore/collaborator.slice"

import youtuberDraftReducer from "./youtuberStore/youtuberDraftVideos.slice"
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        sidebar: sidebarReducer,
        youtuberInfo: youtuberReducer,
        youtuberAssignedTask: youtuberAssignedTaskReducer,
        youtuberWorkSpaces: youtuberWorkSpacesReducer,
        youtuberDraft: youtuberDraftReducer,
        thirdPerson: thirdPersonReducer,
        collaboratorInfo: collaboratorReducer,
        userRole: userRoleReducer
    }
})

export type storeStateType = ReturnType<typeof store.getState>
export type storeDispatchType = typeof store.dispatch