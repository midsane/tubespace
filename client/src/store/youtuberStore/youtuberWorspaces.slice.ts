import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { workspaceInterface } from "../../types/youtuberTypes";

const initialState: workspaceInterface[] = []

const youtuberWorkspacesSlice = createSlice({
    name: "youtuberWorkspaces",
    initialState,
    reducers: {
        setWorkspaces: (state, action: PayloadAction<workspaceInterface[]>) => {
            Object.assign(state, action.payload)
        },

        updateWorkspacesDetails: (state, action: PayloadAction<Partial<workspaceInterface>>) => {
            const workspacesToUpdateInd = state.findIndex(ws => ws.workspaceid === action.payload.workspaceid);

            if (workspacesToUpdateInd !== -1) {
                const updatedWorkspaces = { ...state[workspacesToUpdateInd], ...action.payload }

                state[workspacesToUpdateInd] = updatedWorkspaces
            }
            workspacesToUpdateInd

        },


    }
})

export const youtuberWorkspacesAction = youtuberWorkspacesSlice.actions
export default youtuberWorkspacesSlice.reducer
