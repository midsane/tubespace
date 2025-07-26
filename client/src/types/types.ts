export type httpRequstType = {
    message: string,
    data: any
}

export enum UserRole {
    NORMAL = "NORMAL",
    EDITOR = "EDITOR",
    YOUTUBER = "YOUTUBER"
}

export interface profileDataType extends AuthDataType {
    videosUploaded?: number,
    rating?: number,
    tasksCompleted?: number,
}

export enum YTUploadStages {
    VIDEO_UPLOAD,
    THUMBNAIL_UPLOAD,
    PUBLISH_VIDEO,
    SUCCESSFULL,
    ERROR
}

export type AuthDataType = {
    id: number,
    name: string,
    email: string,
    profileImgUrl: string | null,
    Oauth: boolean,
    bio: string | null,
    attachedLinks: string
    videosUploaded?: number,
    editable: boolean,
    createdAt: string,
    rating?: number,
    tasksCompleted?: number,
    role: UserRole,
    bannerImgUrl?: string | null
}

export interface TopEditorsData extends AuthDataType {
    score: number;
}

export enum Rating_val {
    unrated = "unrated",
    one = "one",
    two = "two",
    three = "three",
    four = "four",
    five = "five"
}

export interface TaskDataType {
    id: number,
    taskTitle: string,
    workDescription: string,
    deadline: string,
    attachments: string[],
    youtuberId: number,
    editorId: number,

    title?: string | null,
    description?: string | null,
    tags?: string[],
    madeForKids?: boolean,
    thumbnail?: string | null,

    createdAt: string,
    isCompleted: boolean,
    rating: Rating_val,
    review?: string | null,
    youtuber?: Partial<AuthDataType> | null,
    editor?: Partial<AuthDataType> | null
}



export interface userSearchType {
    id: string;
    name: string;
    email: string;
    profileImgUrl?: string;
    role: UserRole
}
