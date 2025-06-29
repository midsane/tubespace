import { UserRole, type profileDataType } from '@/types/types'
import { create } from 'zustand'

type Actions = {
    setState: (newState: profileDataType) => void,
    resetState: () => void,
}

export const useUserStore = create<profileDataType & Actions>((set) => ({
    id: 0,
    name: "",
    email: "",
    profileImgUrl: "",
    Oauth: false,
    bio: null,
    attachedLinks: null,
    editable: false,
    createdAt: "",
    role: UserRole.NORMAL,
    bannerImgUrl: "",
    videosUploaded: 0,
    rating: 0,
    tasksCompleted: 0,
    setState: (newState) => set(() => ({ ...newState })),
    resetState: () => set(() => ({
        id: 0,
        name: "",
        email: "",
        profileImgUrl: "",
        Oauth: false,
        bio: null,
        attachedLinks: null,
        editable: false,
        createdAt: "",
        role: UserRole.NORMAL,
        bannerImgUrl: "",
        videosUploaded: 0,
        rating: 0,
        tasksCompleted: 0
    }))
}))
