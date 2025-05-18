import client from "../db/db";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getChatPersonList = asyncHandler(async (req, res) => {
    const chatData = await client.user.findFirst({
        where: {
            id: req.user.id,
        },
        include: {
            chatPersonList: true,
        },
    });

    if (!chatData)
        return res.status(500).json(new ApiResponse(false, null, "something went wrong"));

    const dataToSend = chatData.chatPersonList.map((d) => {
        const filteredData = {
            id: d.id,
            name: d.name,
            username: d.username,
            profilepic: d.profilepic,
        };
        return filteredData;
    });
    res.status(200).json(
        new ApiResponse(true, dataToSend, "chat persons list fetched successfully"),
    );
});

const addPersonToChatList = asyncHandler(async (req, res) => {
    const { otherUserId } = req.body;
    if (otherUserId == req.user.id) {
        res.status(400).json(new ApiResponse(false, null, "invalid otherUserId"));
    }

    if (!otherUserId) {
        return res.status(400).json(new ApiResponse(false, null, "otherUserId is required"));
    }

    const updatedData = await client.user.update({
        where: { id: req.user.id },
        data: {
            chatPersonList: {
                connect: { id: otherUserId },
            },
        },
        include: {
            chatPersonList: true,
        },
    });

    if (!updatedData) res.status(500).json(new ApiResponse(false, null, "something went wrong"));

    const dataToSend = updatedData.chatPersonList.map((d) => {
        const filteredData = {
            id: d.id,
            name: d.name,
            username: d.username,
            profilepic: d.profilepic,
        };
        return filteredData;
    });
    res.status(200).json(
        new ApiResponse(true, dataToSend, "User added to chatPersonList successfully"),
    );
});

const fetchMsgOfUser = asyncHandler(async (req, res) => {
    const { otherUserName } = req.body;
    if (!otherUserName)
        res.status(400).json(new ApiResponse(false, null, "otherUserName is required"));

    const otherUserData = await client.user.findFirst({
        where: {
            username: otherUserName,
        },
    });
    if (!otherUserData)
        return res.status(400).json(new ApiResponse(false, null, "invalid otherUserName"));

    const chatData = await client.user.findFirst({
        where: {
            id: req.user.id,
            chatPersonList: {
                some: {
                    username: otherUserName,
                },
            },
        },
    });
    if (!chatData)
        return res.status(400).json(new ApiResponse(false, null, "invalid otherUserName"));

    const msgData = await client.chat.findMany({
        where: {
            OR: [
                {
                    from: req.user.username,
                    to: otherUserName,
                },
                {
                    from: otherUserName,
                    to: req.user.username,
                },
            ],
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const { password, ...dataToSend } = otherUserData;
    if (!msgData) return res.status(500).json(new ApiResponse(false, null, "something went wrong"));

    res.status(200).json(
        new ApiResponse(true, { msgData, dataToSend }, "messages fetched successfully"),
    );
});

const createMsg = asyncHandler(async (req, res) => {
    const { toUserName, message } = req.body;
    if (!toUserName || !message)
        res.status(400).json(new ApiResponse(false, null, "toUserName and message are required"));

    const user = await client.user.findFirst({
        where: {
            id: req.user.id,
            chatPersonList: {
                some: {
                    username: toUserName,
                },
            },
        },
    });
    if (!user) return res.status(400).json(new ApiResponse(false, null, "invalid toUserName"));

    const msg = await client.chat.create({
        data: {
            from: req.user.username,
            to: toUserName,
            message,
        },
    });

    if (!msg) return res.status(500).json(new ApiResponse(false, null, "something went wrong"));

    res.status(200).json(new ApiResponse(true, msg, "message created successfully"));
});

const editMsg = asyncHandler(async (req, res) => {
    const updateFields = req.body;
    const oldMsg = await client.chat.findFirst({
        where: {
            chatId: updateFields.chatId,
        },
    });
    if (!oldMsg) return res.status(400).json(new ApiResponse(false, null, "invalid chatId"));

    const newMsg = { ...oldMsg, ...updateFields };

    const updatedMsg = await client.chat.update({
        where: {
            chatId: updateFields.chatId,
        },
        data: {
            ...newMsg,
        },
    });
    if (!updatedMsg)
        return res.status(500).json(new ApiResponse(false, null, "something went wrong"));
    res.status(200).json(new ApiResponse(true, updatedMsg, "message updated successfully"));
});

const deleteMsg = asyncHandler(async (req, res) => {
    const { chatId } = req.body;
    if (!chatId) return res.status(400).json(new ApiResponse(false, null, "chatId is required"));
    const msg = await client.chat.delete({
        where: {
            chatId,
        },
    });
    if (!msg) return res.status(500).json(new ApiResponse(false, null, "something went wrong"));
    res.status(200).json(new ApiResponse(true, msg, "message deleted successfully"));
});

export { getChatPersonList, addPersonToChatList, fetchMsgOfUser, createMsg, editMsg, deleteMsg };
