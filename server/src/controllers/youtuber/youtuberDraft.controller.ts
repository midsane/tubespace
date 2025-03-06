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
            youtuberId: user.id,
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

export { addDraft, updateDraft, deleteDraft };
