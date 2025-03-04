import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCOUNT_TYPE, userRole, youtuberCompleteUserInterface } from "../../types/youtuberTypes";

const initialState: youtuberCompleteUserInterface = {
    user: {
        id: 18,
        name: null,
        email: "aaa@gm.com",
        username: "aaa",
        profilepic: null,
        createdAt: new Date(),
        role: userRole.YOUTUBER
    },
    youtuber: {
        userId: 18,
        youtuberId: 12,
        videosUploaded: 0,
        assignedTasksCompleted: 0,
        accountType: ACCOUNT_TYPE.PRIVATE,
        whatsAppNotifcation: true,
        emailNotifcation: true,
        pushNotifcation: true,
        deactivated: false,
        youtubeConnected: false
    }

}

const youtuberUserSlice = createSlice({
    name: "youtuberUserSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<youtuberCompleteUserInterface>) => {
            Object.assign(state, action.payload)
        },
    }
})

export const youtuberActions = youtuberUserSlice.actions
export default youtuberUserSlice.reducer
