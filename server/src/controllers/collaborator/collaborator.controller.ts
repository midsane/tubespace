import { string } from "joi";
import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
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

    const { password, ...dataToSend } = updatedUser;

    const fixedDataToSend: any = {
        ...dataToSend,
        collaborator: dataToSend.Collaborator
    }

    delete fixedDataToSend.Collaborator

    res.status(200).json(
        new ApiResponse(
            true,
            { user: fixedDataToSend },
            "Collaborator data home page data fetched successfully!",
        ),
    );
});

const fetchCollaborators = asyncHandler(async (req: RequestType, res) => {
    let { searchQuery, limit, start } = req.query;

    const take = limit ? parseInt(limit as string, 10) : 10;
    const skip = start ? parseInt(start as string, 10) : 0;

    if (searchQuery && typeof searchQuery !== "string") {
        return res.status(400).json(new ApiResponse(false, null, "search query is required"));
    }

    const countOfCollaborators = await client.user.count({
        where: searchQuery ? {
            role: "collaborator",
            username: {
                contains: searchQuery as string,
                mode: "insensitive",
            },
        } : {
            role: "collaborator",
        },
    });


    const collaborators = await client.user.findMany({
        where: searchQuery ? {
            role: "collaborator",
            username: {
                contains: searchQuery as string,
                mode: "insensitive",
            },
        } : {
            role: "collaborator"
        },
        include: {
            Collaborator: {
                include: {
                    assignedTasks: true
                }
            }
        },
        skip,
        take
    });


    if (!collaborators) {
        res.status(400).json(new ApiResponse(false, null, "could not fetch collaborators"));
    }

    const sanitizedData = collaborators.map(({ password, ...user }) => user);

    const dataToSend = {
        ytData: sanitizedData,
        count: countOfCollaborators,
    }

    res.status(200).json(new ApiResponse(true, dataToSend, "collaborators fetched successfully"));
})

const fetchCollaboratorsShallow = asyncHandler(async (req: RequestType, res) => {
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
                }
            },

        });
    }
    else {
        collaborators = await client.user.findMany({
            where: {
                role: "collaborator"
            },

        });
    }



    if (!collaborators) {
        res.status(400).json(new ApiResponse(false, null, "could not fetch collaborators"));
    }

    const dataToSend = collaborators.map(({ password, ...user }) => user);

    res.status(200).json(new ApiResponse(true, {
        ytData: dataToSend
    }, "collaborators fetched successfully"));
})


const verifyCollaboratorRole = (req: RequestType, res, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== "collaborator") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
    next();
};

export {
    fetchHome,
    fetchCollaborators,
    fetchCollaboratorsShallow,
    verifyCollaboratorRole
};
