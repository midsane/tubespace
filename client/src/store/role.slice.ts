import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userRole } from "../types/youtuberTypes";


const initialState: {
    role: userRole | null
} = {
    role: null
}

const userRoleSlice = createSlice({
    name: "userRole",
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<userRole | null>) => {
            state.role = action.payload
        },
    }

})

export const userRoleActions = userRoleSlice.actions
export default userRoleSlice.reducer