import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const createWorkspace = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    const { name } = req.body;

    console.log(user);

    const newWorkspace = await client.workspace.create({
        data: {
            name,
            youtuberId: user.Youtuber.youtuberId,
        },
    });

    if (!newWorkspace) {
        res.status(400).json(new ApiResponse(false, null, "new workspace could not be created!"));
    }

    res.status(200).json(
        new ApiResponse(true, newWorkspace, "new workspace created successfully!"),
    );
});

const updateWorkspace = asyncHandler(async (req: RequestType, res) => {
    const { workspaceid, ...updateFields } = req.body;

    if (!workspaceid) {
        res.status(400).json(new ApiResponse(false, null, "workspace id is required!"));
    }

    const filteredUpdates = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    );

    const updatedWorkspace = await client.workspace.update({
        where: {
            workspaceid,
        },
        data: filteredUpdates,
    });

    if (!updatedWorkspace) {
        res.status(400).json(new ApiResponse(false, null, "workspace could not be updated!"));
    }

    res.status(200).json(
        new ApiResponse(true, updatedWorkspace, "workspace updated successfully!"),
    );
});

const deleteWorkspace = asyncHandler(async (req: RequestType, res) => {
    const { workspaceid } = req.body;

    const workspace = await client.workspace.findUnique({
        where: {
            workspaceid,
        },
    });


    if (!workspace) {
        res.status(400).json(new ApiResponse(false, null, "Workspace does not exist!"));
    }

    const [_, updatedDrafts] = await client.$transaction([
        client.draftVideos.deleteMany({
            where: { workspaceId: workspaceid },
        }),
        client.draftVideos.findMany(),
    ]);
    if (!updatedDrafts) {
        res.status(400).json(
            new ApiResponse(false, null, "all Drafts of this workspace could not be deleted!"),
        );
    }

    const deletedWorkspace = await client.workspace.delete({
        where: {
            workspaceid,
        },
    });

    if (!deletedWorkspace) {
        res.status(400).json(new ApiResponse(false, null, "Workspace could not be deleted!"));
    }

    res.status(200).json(
        new ApiResponse(true, {
            deletedWorkspace,
            updatedDrafts
        }, "Workspace deleted successfully!"),
    );
});

const fetchAllworkspaces = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    let { searchQuery } = req.query;

    if (!searchQuery || searchQuery === "undefined"
    ) searchQuery = "";

    if (typeof searchQuery !== "string") {
        res.status(400).json(new ApiResponse(false, null, "invalid search query"));
    }

    const workspaces = await client.workspace.findMany({
        where: {
            youtuberId: user.Youtuber.youtuberId,
            name: {
                contains: searchQuery as string,
                mode: "insensitive",
            }
        },
    });

    if (!workspaces) {
        res.status(400).json(new ApiResponse(false, null, "could not fetch workspaces successfully"));
    }
    res.status(200).json(new ApiResponse(true, workspaces, "workspaces fetched successfully"));
})

export {
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    fetchAllworkspaces
};
