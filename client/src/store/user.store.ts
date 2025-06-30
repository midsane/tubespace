import { UserRole, type profileDataType } from '@/types/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface userStore extends profileDataType {
    setState: (newState: profileDataType) => void,
    resetState: () => void,
    updateState: (newState: Partial<profileDataType>) => void
}

export const useUserStore = create<userStore>()(
    persist(
        (set, _) => ({
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
            resetState: () => {
                set(() => ({
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
                }));
                const storage = createJSONStorage(() => localStorage);
                storage?.removeItem('user-storage');
            },

            updateState: (newState) => set((state) => ({ ...state, ...newState })),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)



