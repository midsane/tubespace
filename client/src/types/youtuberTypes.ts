export enum userRole {
    YOUTUBER = "youtuber",
    COLLABORATOR = "collaborator"
}

export enum ACCOUNT_TYPE {
    PUBLIC = "public",
    PRIVATE = "private"
}

interface workspaceInterface {
    workspaceId: number,
}


interface taskInterface {
    taskId: number,
    
}


interface DraftVideos {
    draftVideoId: number,
    DraftTitle: string,
    youtuberId: number,
    youtuber : youtuberInterface | null,
    workspaceId: number,
    workspace: workspaceInterface | null,
    createdAt: Date,
    ytTitle: string | null,
    ytDescription: string | null,
    ytThumbnailLink: string | null,
    ytVideoLink: string | null,
    publised: boolean,
    publishedAt: Date | null,
    ytVideoId: string | null,
    joinedCollaborators: collaboratorInterface[] | null,
    assignedTasks: taskInterface[] | null
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
    youtubeConnected: boolean,
    draftVideos: DraftVideos[] | null,
    tasksAssigned: taskInterface[] | null,
    workspaces: workspaceInterface[] | null,
}


export interface collaboratorInterface {
    userId: number,
    accountType: ACCOUNT_TYPE,
    whatsAppNotifcation: boolean,
    emailNotifcation: boolean,
    pushNotifcation: boolean,
    deactivated: boolean,
}

export interface userInterface {
    id: number,
    name: string | null,
    email: string,
    username: string,
    profilepic: string | null,
    createdAt: Date,
    role: userRole,
    collaborator?: youtuberInterface,
    Youtuber?: youtuberInterface 
}


export interface youtuberUserInterface {
    user: userInterface | null,
}


export interface collaboratorUserInterface {
    user: userInterface | null,
}