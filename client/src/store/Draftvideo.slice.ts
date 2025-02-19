import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface updatedDraftInterface{
    DraftName?: string,
    title?: string,
    description?: string,
    thumbnail?: string | File | null,
    video?: string | File | null,
}

export interface DraftVideosInterface {
    _id: string,
    DraftName: string,
    title: string,
    description: string,
    thumbnail: string | File | null,
    video: string | File | null,
}

const draftVideosSlice = createSlice({
    name: "draftVideosSlice",
    initialState: [] as DraftVideosInterface[],
    reducers: {
        addDrafts: (state, action: PayloadAction<DraftVideosInterface>) => {
            state.unshift(action.payload)
        },

        removeDraft: (state, action: PayloadAction<{_id: string}>) => {
            return state.filter(s => s._id !== action.payload._id)
        },

        updateDrafts: (state, action: PayloadAction<{id: string, updatedDraft: updatedDraftInterface}>) => {
            const { id, updatedDraft } = action.payload;
            const index = state.findIndex(draft => draft._id === id);
            
            if (index !== -1) {
                state[index] = { ...state[index], ...updatedDraft };
            }
        }
    }
})

export const draftSampleActions = draftVideosSlice.actions;
export default draftVideosSlice.reducer