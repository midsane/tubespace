import { create } from 'zustand'

type State = {
    taskId: number | null,
}

type Actions = {
    setTaskId: (id: number) => void,
    resetState: () => void
}

export const useUploadVideo = create<State & Actions>((set) => ({
    taskId: null,
    setTaskId: (newState: number) => set(() => ({ taskId: newState })),
    resetState: () => set(() => ({ taskId: null })),
}))
