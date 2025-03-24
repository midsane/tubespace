import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal"
import sidebarReducer from "./sidebar.slice"
import youtuberReducer from "./youtuberStore/youtuber.slice"
import youtuberAssignedTaskReducer from "./youtuberStore/youtuberAssignedTask.slice"
import youtuberWorkSpacesReducer from "./youtuberStore/youtuberWorspaces.slice"
import youtuberSettingsReducer from "./youtuberStore/youtuber.settings.slice"
import thirdPersonReducer from "./thirdperson.slice"

import userRoleReducer from "./role.slice"

import otherUserYoutuberReducer from "./otherUser/youtuber/otherUserYoutuber.slice"
import OtherUsercollaboratorReducer from "./otherUser/collaborator/otherUserCollaborator.slice"
import collaboratorReducer from "./collaboratorStore/collaborator.slice"

import youtuberDraftReducer from "./youtuberStore/youtuberDraftVideos.slice"

import {
    otherUserYoutberAssignedTaskReducer,
    otherUserYoutuberDraftReducer,
    otherUserYoutuberWorkspaceReducer
} from "./otherUser/youtuber/restOtherYoutuber.slice"

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        sidebar: sidebarReducer,
        youtuberInfo: youtuberReducer,
        youtuberAssignedTask: youtuberAssignedTaskReducer,
        youtuberWorkSpaces: youtuberWorkSpacesReducer,
        youtuberDraft: youtuberDraftReducer,
        youtuberSettings: youtuberSettingsReducer,
        thirdPerson: thirdPersonReducer,
        collaboratorInfo: collaboratorReducer,
        userRole: userRoleReducer,

        otherUserYoutuber: otherUserYoutuberReducer,
        otherUserCollaborator: OtherUsercollaboratorReducer,
        otherUserYoutuberAssignedTask: otherUserYoutberAssignedTaskReducer,
        otherUserYoutuberDraft: otherUserYoutuberDraftReducer,
        otherUserYoutuberWorkspaces: otherUserYoutuberWorkspaceReducer
    }
})



export type storeStateType = ReturnType<typeof store.getState>
export type storeDispatchType = typeof store.dispatch