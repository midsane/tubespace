import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userInterface, youtuberInterface, youtuberUserInterface } from "../../../types/youtuberTypes";

const initialState: youtuberUserInterface = {
    user: null,
}

const otherUserYoutuberSlice = createSlice({
    name: "otherUserYoutuberSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<youtuberUserInterface>) => {

            state.user = action.payload.user
        },

        updateUserInfo: (state, action: PayloadAction<Partial<userInterface>>) => {
            if (state.user)
                state.user = { ...state.user, ...action.payload }
        },
        updateYoutuberInfo: (state, action: PayloadAction<Partial<youtuberInterface>>) => {
            if (state.user?.Youtuber)
                state.user.Youtuber = { ...state.user.Youtuber, ...action.payload }
        }

    },


})



export const otherUserYoutuberActions = otherUserYoutuberSlice.actions
export default otherUserYoutuberSlice.reducer
