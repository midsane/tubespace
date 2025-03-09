import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DraftVideosInterface } from "../../types/youtuberTypes";

const initialState: DraftVideosInterface[] = []

const youtuberDraftSlice = createSlice({
    name: "youtuberDrafts",
    initialState,
    reducers: {
        setDraft: (state, action: PayloadAction<DraftVideosInterface[]>) => {
            Object.assign(state, action.payload)
        },

        updateDraftDetails: (state, action: PayloadAction<Partial<DraftVideosInterface>>) => {
            const DraftToUpdateInd = state.findIndex(draft => draft.draftVideoId === action.payload.draftVideoId);

            if (DraftToUpdateInd !== -1) {
                const updatedDraft = { ...state[DraftToUpdateInd], ...action.payload }

                state[DraftToUpdateInd] = updatedDraft
            }
        },
        addDraft: (state, action: PayloadAction<DraftVideosInterface>) => {
            const doesItExist = state.findIndex(draft => draft.draftVideoId === action.payload.draftVideoId);
            if (doesItExist === -1) {
                state.unshift(action.payload)
            }
        },
        removeDraft: (state, action: PayloadAction<{draftVideoId: number}>) => {
            const doesItExist = state.findIndex(draft => draft.draftVideoId === action.payload.draftVideoId);
            if (doesItExist !== -1) {
                state.splice(doesItExist, 1)
            }
        }

    },


})

export const youtuberDraftActions = youtuberDraftSlice.actions
export default youtuberDraftSlice.reducer
