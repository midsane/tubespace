import { NextFunction, Response } from "express";
import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const fetchHome = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    const { userName } = req.body;

    const thirdPerson = user.username === userName;

    const updatedUser = await client.user.findUnique({
        where: {
            username: userName,
        },
        include: {
            Youtuber: {
                include: {
                    draftVideos: true,
                    tasksAssigned: true,
                    workspaces: {
                        include: {
                            collaborators: true,
                            tasks: true,

                        },
                    }
                },
            },
        },
    });

    if (!updatedUser) {
        return res.status(400).json(new ApiResponse(false, null, "could not fetch user data"));
    }

    const { password, ...dataToSend } = updatedUser;

    res.status(200).json(
        new ApiResponse(
            true,
            {
                user: dataToSend,
            },
            "Youtuber data home page data fetched successfully!",
            !thirdPerson
        ),
    );
});

const verifyYoutuberRole = (req: RequestType, res, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== "youtuber") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
    next();
};

export { fetchHome, verifyYoutuberRole };
