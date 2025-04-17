import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SocketIdType = import("socket.io-client").Socket | null

const initialState: {
    socketId: SocketIdType
} = {
    socketId: null
}

const userSocketId = createSlice({
    name: "socketId",
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<SocketIdType>) => {
            state.socketId = action.payload as any;
        },
    }

})

export const userSocketActions = userSocketId.actions
export default userSocketId.reducer