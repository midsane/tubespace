import { string } from "joi";
import client from "../db/db";
import { RequestType } from "../types/types";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { NextFunction } from "express";

const fetchHome = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    console.log(user);
    if (user.role !== "collaborator") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
    const updatedUser = await client.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            Collaborator: {
                include: {
                    assignedTasks: true,
                    wokspaces: true,
                    joinedDraftVideos: true,
                },
            },
        },
    });

    if (!updatedUser) {
        return res.status(400).json(new ApiResponse(false, null, "could not fetch user data"));
    }

    const {password, ...dataToSend} = updatedUser;

    res.status(200).json(
        new ApiResponse(
            false,
            { user: dataToSend },
            "Collaborator data home page data fetched successfully!",
        ),
    );
});

const fetchCollaborators = asyncHandler(async (req: RequestType, res) => {
    const { searchQuery } = req.query;

    if (searchQuery && typeof searchQuery !== "string") {
        return res.status(400).json(new ApiResponse(false, null, "search query is required"));
    }

    let collaborators: any = null;
    if (typeof searchQuery === "string") {
        collaborators = await client.user.findMany({
            where: {
                role: "collaborator",

                username: {
                    contains: searchQuery as string,
                    mode: "insensitive",
                },
            }
        });
    }
    else {
        collaborators = await client.user.findMany({
            where: {
                role: "collaborator",
            }
        });
    }


    if (!collaborators) {
        res.status(400).json(new ApiResponse(false, null, "could not fetch collaborators"));
    }
    const { password, ...dataToSend } = collaborators;
    res.status(200).json(new ApiResponse(true, dataToSend, "collaborators fetched successfully"));
})


const verifyCollaboratorRole = (req: RequestType, res, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== "collaborator") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
    next();
};

export { fetchHome, fetchCollaborators, verifyCollaboratorRole };
