import { NextFunction, Response } from "express";
import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const fetchHome = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;

    console.log("fetching youtuber home data!");
    const updatedUser = await client.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            Youtuber: {
                include: {
                    draftVideos: true,
                    tasksAssigned: true,
                    workspaces: true,
                },
            },
        },
    });

    res.status(200).json(
        new ApiResponse(
            true,
            {
                user: updatedUser,
            },
            "Youtuber data home page data fetched successfully!",
        ),
    );
});

const verifyRole = (req: RequestType, res, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== "youtuber") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
    next();
};

export { fetchHome, verifyRole };
