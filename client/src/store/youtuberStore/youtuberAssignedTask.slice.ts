import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskInterface } from "../../types/youtuberTypes";

const initialState: taskInterface[] = []

const youtuberAssignedTaskSlice = createSlice({
    name: "youtuberAssignedTasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<taskInterface[]>) => {
            Object.assign(state, action.payload)
        },

        updateTaskDetails: (state, action: PayloadAction<Partial<taskInterface>>) => {
            const taskToUpdateInd = state.findIndex(task => task.taskId === action.payload.taskId);

            if (taskToUpdateInd !== -1) {
                const updatedTask = { ...state[taskToUpdateInd], ...action.payload }

                state[taskToUpdateInd] = updatedTask
            }
        },

    },


})

export const youtberAssignedTaskActions = youtuberAssignedTaskSlice.actions
export default youtuberAssignedTaskSlice.reducer
