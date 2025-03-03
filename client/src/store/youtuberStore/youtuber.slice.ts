import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum userRole {
    YOUTUBER = "youtuber",
    COLLABORATOR = "collaborator"
}

interface userInterface {
    id: number,
    name: string | null,
    email: string,
    username: string,
    profilepic: null,
    createdAt: Date,
    role: userRole
}

enum ACCOUNT_TYPE {
    PUBLIC = "public",
    PRIVATE = "private"
}

interface youtuberInterface {
    userId: number,
    youtuberId: number,
    videosUploaded: number,
    assignedTasksCompleted: number,
    accountType: ACCOUNT_TYPE,
    whatsAppNotifcation: boolean,
    emailNotifcation: boolean,
    pushNotifcation: boolean,
    deactivated: boolean,
    youtubeConnected: boolean
}

interface youtuberCompleteUserInterface {
    user: userInterface,
    youtuber: youtuberInterface
}


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
