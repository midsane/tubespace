import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskInterface } from "../../../types/youtuberTypes";
import { DraftVideosInterface } from "../../../types/youtuberTypes";
import { workspaceInterface } from "../../../types/youtuberTypes";

const initialState1: taskInterface[] = []
const initialState2: DraftVideosInterface[] = []
const initialState3: workspaceInterface[] = []

const otherUserYoutuberAssignedTaskSlice = createSlice({
    name: "otherUserYoutuberAssignedTasks",
    initialState: initialState1,
    reducers: {
        setTasks: (state, action: PayloadAction<taskInterface[]>) => {
            Object.assign(state, action.payload)
        },
    },


})

const otherUserYoutuberDraftSlice = createSlice({
    name: "otherUserYoutuberDrafts",
    initialState: initialState2,
    reducers: {
        setDraft: (state, action: PayloadAction<DraftVideosInterface[]>) => {
            Object.assign(state, action.payload)
        }
    }

})


const otherUserYoutuberWorkspacesSlice = createSlice({
    name: "otherUserYoutuberWorkspaces",
    initialState: initialState3,
    reducers: {
        setWorkspaces: (state, action: PayloadAction<workspaceInterface[]>) => {
            Object.assign(state, action.payload)
        }
    }
})


const otherUserYoutberAssignedTaskActions = otherUserYoutuberAssignedTaskSlice.actions
const otherUserYoutuberDraftActions = otherUserYoutuberDraftSlice.actions
const otherUserYoutuberWorkspacesAction = otherUserYoutuberWorkspacesSlice.actions


const otherUserYoutberAssignedTaskReducer = otherUserYoutuberAssignedTaskSlice.reducer
const otherUserYoutuberDraftReducer = otherUserYoutuberDraftSlice.reducer
const otherUserYoutuberWorkspaceReducer = otherUserYoutuberWorkspacesSlice.reducer

export {
    otherUserYoutberAssignedTaskActions,
    otherUserYoutuberDraftActions,
    otherUserYoutuberWorkspacesAction,

    otherUserYoutberAssignedTaskReducer,
    otherUserYoutuberDraftReducer,
    otherUserYoutuberWorkspaceReducer
}