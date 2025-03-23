import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collaboratorInterface, collaboratorUserInterface, userInterface } from "../../../types/youtuberTypes";

const initialState: collaboratorUserInterface = {
    user: null,
}

const OtherUsercollaboratorSlice = createSlice({
    name: "OtherUsercollaboratorSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<collaboratorUserInterface>) => {

            state.user = action.payload.user
        },

        updateUserInfo: (state, action: PayloadAction<Partial<userInterface>>) => {
            if (state.user)
                state.user = { ...state.user, ...action.payload }
        },
        updateCollaboratorInfo: (state, action: PayloadAction<Partial<collaboratorInterface>>) => {
            if (state.user?.collaborator)
                state.user.collaborator = { ...state.user.collaborator, ...action.payload }
        }

    },


})



export const OtherUserCollaboratorActions = OtherUsercollaboratorSlice.actions
export default OtherUsercollaboratorSlice.reducer
