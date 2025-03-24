import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { workspaceInterface } from "../../types/youtuberTypes";

const initialState: workspaceInterface[] = []

const youtuberWorkspacesSlice = createSlice({
    name: "youtuberWorkspaces",
    initialState,
    reducers: {
        setWorkspaces: (_, action: PayloadAction<workspaceInterface[]>) => {
            return action.payload
        },

        updateWorkspacesDetails: (state, action: PayloadAction<Partial<workspaceInterface>>) => {
            const workspacesToUpdateInd = state.findIndex(ws => ws.workspaceid === action.payload.workspaceid);

            if (workspacesToUpdateInd !== -1) {
                const updatedWorkspaces = { ...state[workspacesToUpdateInd], ...action.payload }

                state[workspacesToUpdateInd] = updatedWorkspaces
            }
            workspacesToUpdateInd

        },

        addWorkspaces: (state, action: PayloadAction<workspaceInterface>) => {
            const doesItExist = state.findIndex(wrk => wrk.workspaceid === action.payload.workspaceid);
            if (doesItExist === -1) {
                state.unshift(action.payload)
            }
        },
        removeWorkspaces: (state, action: PayloadAction<{ workspaceId: number }>) => {
            const doesItExist = state.findIndex(wrk => wrk.workspaceid === action.payload.workspaceId);
            if (doesItExist !== -1) {
                state.splice(doesItExist, 1)
            }
        }


    }
})

export const youtuberWorkspacesAction = youtuberWorkspacesSlice.actions
export default youtuberWorkspacesSlice.reducer
