import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface msgType {
    msgId: number,
    msg: string,
    byMe: boolean,
    time: string,
}

interface chatPerson {
    userId: number,
    username: string,
    messagesData: msgType[]

}

const initialState: chatPerson = {
    userId: -1,
    username: "midsane",
    messagesData: []
};
const chatDataSlice = createSlice({
    name: "chataPerson",
    initialState,
    reducers: {
        setChatData: (state, action: PayloadAction<chatPerson[]>) => {
            Object.assign(state, action.payload);
        },
        addNewMsg: (state, action: PayloadAction<msgType[]>) => {
            for (const v of action.payload)
                state.messagesData.push(v);
        },
        deleteChatHistory: (state) => {
            state.messagesData = [];
        },
        editMsg: (state, action: PayloadAction<msgType>) => {
            const editInd = state.messagesData.findIndex(msg => msg.msgId === action.payload.msgId);
            if (editInd != -1)
                state.messagesData[editInd].msg = action.payload.msg;
        }
    }

})

export const chatDataActions = chatDataSlice.actions
export default chatDataSlice.reducer