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

export type AuthDataType = {
    id: number,
    name: string,
    email: string,
    profileImgUrl: string,
    Oauth: boolean,
    bio: string | null,
    attachedLinks: string[] | null,
    videosUploaded?: number,
    editable: boolean,
    createdAt: string,
    rating?: number,
    tasksCompleted?: number,
    role: UserRole,
    bannerImgUrl?: string
}