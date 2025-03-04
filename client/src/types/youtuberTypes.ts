export enum userRole {
    YOUTUBER = "youtuber",
    COLLABORATOR = "collaborator"
}

export interface userInterface {
    id: number,
    name: string | null,
    email: string,
    username: string,
    profilepic: string | null,
    createdAt: Date,
    role: userRole
}

export enum ACCOUNT_TYPE {
    PUBLIC = "public",
    PRIVATE = "private"
}

export interface youtuberInterface {
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

export interface youtuberCompleteUserInterface {
    user: userInterface,
    youtuber: youtuberInterface
}