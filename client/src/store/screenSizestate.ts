import { create } from 'zustand'

type State = {
    mobileView: boolean
}

type Actions = {
    changeMobileView: (newState: boolean) => void
}

export const useScreenSizeStore = create<State & Actions>((set) => ({
    mobileView: false,
    changeMobileView: (newState: boolean) => set(() => ({ mobileView: newState }))
}))
