import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const addDraft = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    const { DraftTitle, workspaceId } = req.body;

    const alreadyExist = await client.workspace.findUnique({ where: { workspaceid: workspaceId } });

    if (!alreadyExist) {
        res.status(400).json(new ApiResponse(false, null, "Workspace does not exist!"));
    }

    const newDraft = await client.draftVideos.create({
        data: {
            DraftTitle,
            youtuberId: user.Youtuber.youtuberId,
            workspaceId,
        },
    });

    if (!newDraft) {
        res.status(400).json(new ApiResponse(false, null, "new draft video could not be created!"));
    }

    res.status(200).json(new ApiResponse(true, newDraft, "Draft video created successfully!"));
});

const updateDraft = asyncHandler(async (req: RequestType, res) => {
    const { draftVideoId, ...updateFields } = req.body;

    if (!draftVideoId) {
        res.status(400).json(new ApiResponse(false, null, "Draft video id is required!"));
    }

    const filteredUpdates = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    );

    const updatedDraft = await client.draftVideos.update({
        where: {
            draftVideoId,
        },
        data: filteredUpdates,
    });

    if (!updatedDraft) {
        res.status(400).json(new ApiResponse(false, null, "Draft video could not be updated!"));
    }

    res.status(200).json(new ApiResponse(true, updatedDraft, "Draft video updated successfully!"));
});

const deleteDraft = asyncHandler(async (req: RequestType, res) => {
    const { draftVideoId } = req.body;

    const alreadyExist = await client.draftVideos.findUnique({ where: { draftVideoId } });

    if (!alreadyExist) {
        res.status(400).json(new ApiResponse(false, null, "Draft video does not exist!"));
    }

    const deletedDraft = await client.draftVideos.delete({
        where: {
            draftVideoId,
        },
    });

    if (!deletedDraft) {
        res.status(400).json(new ApiResponse(false, null, "draft video could not be deleted!"));
    }

    res.status(200).json(new ApiResponse(true, deletedDraft, "Draft video deleted successfully!"));
});

const fetchAllDraftVideos = asyncHandler(async (req: RequestType, res) => {

    const user = req.user;
    let { searchQuery, workspaceid } = req.query;

    if (!searchQuery || searchQuery === "undefined"
    ) searchQuery = "";


    if (typeof searchQuery !== "string") {
        return res.status(400).json(new ApiResponse(false, null, "Invalid search query"));
    }

    console.log("workspace id:", workspaceid);
    console.log("type of workspace id:", typeof workspaceid);

    if (typeof workspaceid !== "string")
        return res.status(400).json(new ApiResponse(false, null, "invalid workspace id provided1"))

    const workspaceIdNum = parseInt(workspaceid);
    console.log("workspaceIdnum:", workspaceIdNum)

    if (workspaceIdNum < 1)
        return res.status(400).json(new ApiResponse(false, null, "invalid workspace id provided2"))

    let draftVideos: any[] = [];

    if (!workspaceIdNum || isNaN(workspaceIdNum)) {
        draftVideos = await client.draftVideos.findMany({
            where: {
                youtuberId: user.Youtuber.youtuberId,
                DraftTitle: {
                    contains: searchQuery as string,
                    mode: "insensitive",
                },
            },
        });
    }
    else if (typeof workspaceIdNum === "number") {
        draftVideos = await client.draftVideos.findMany({
            where: {
                youtuberId: user.Youtuber.youtuberId,
                workspaceId: workspaceIdNum,
                DraftTitle: {
                    contains: searchQuery as string,
                    mode: "insensitive",
                },
            },
        });
    }

    if (draftVideos.length === 0) {
        return res.status(200).json(new ApiResponse(true, [], "No draft videos found"));
    }

    return res.status(200).json(new ApiResponse(true, draftVideos, "Draft videos fetched successfully"));
});


export {
    addDraft,
    updateDraft,
    deleteDraft,
    fetchAllDraftVideos
};
