export enum userRole {
    YOUTUBER = "youtuber",
    COLLABORATOR = "collaborator"
}

export enum ACCOUNT_TYPE {
    PUBLIC = "public",
    PRIVATE = "private"
}

export interface workspaceInterface {
    workspacePic: string | null,
    name: string,
    description: string | null,
    youtuberId: number,
    youtuber: youtuberInterface | null,
    collaborators: collaboratorInterface[] | null,
    tasks: taskInterface[] | null,
    draftVideos: DraftVideosInterface[] | null,
    createdAt: Date,
    workspaceid: number
}

export enum TASKSTATUS {
    pending,
    completed
}


export enum starsValue {
    unrated = "unrated",
    one = "one",
    two = "two",
    three = "three",
    four = "four",
    five = "five",
}

export enum taskType {
    video,
    thumbnail,
    title,
    description
}

export interface taskInterface {
    taskId: number,
    taskType: taskType,
    description: string | null,
    status: TASKSTATUS,
    workspaceId: number,
    workspace: workspaceInterface | null,
    youtuberId: number,
    youtuber: youtuberInterface | null,
    deadline: Date,
    numberOfRevisions: number,
    collaboratorId: number,
    collaborator: collaboratorInterface | null,
    createdAt: Date,
    draftVideoId: number,
    draftVideo: DraftVideosInterface | null,
    permissionToViewTitle: boolean,
    permissionToViewDescription: boolean,
    permissionToViewThumbnail: boolean,
    permissionToViewideo: boolean,
    starsRecived: starsValue
}


export interface DraftVideosInterface {
    draftVideoId: number,
    DraftTitle: string,
    youtuberId: number,
    youtuber: youtuberInterface | null,
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
    userInfo?: userInterface | null;
    youtuberId: number,
    videosUploaded: number,
    assignedTasksCompleted: number,
    accountType: ACCOUNT_TYPE,
    whatsAppNotifcation: boolean,
    emailNotifcation: boolean,
    pushNotifcation: boolean,
    deactivated: boolean,
    youtubeConnected: boolean,
    draftVideos?: DraftVideosInterface[] | null,
    tasksAssigned?: taskInterface[] | null,
    workspaces?: workspaceInterface[] | null,
}


export interface collaboratorInterface {
    userId: number,
    userInfo?: userInterface | null;
    collaboratorId: number,
    accountType: ACCOUNT_TYPE,
    whatsAppNotifcation: boolean,
    emailNotifcation: boolean,
    pushNotifcation: boolean,
    deactivated: boolean,
    numberOfRatings: number,
    starsAvg: starsValue
    workspaces: workspaceInterface[] | null,
    assignedTasks: taskInterface[] | null,
    joinedDraftVideos: DraftVideosInterface[] | null
}

export interface userInterface {
    id: number,
    name: string | null,
    email: string,
    username: string,
    profilepic: string | null,
    createdAt: Date,
    role: userRole,
    collaborator?: collaboratorInterface,
    Youtuber?: youtuberInterface
}


export interface youtuberUserInterface {
    user: userInterface | null,
}


export interface collaboratorUserInterface {
    user: userInterface | null,
}


