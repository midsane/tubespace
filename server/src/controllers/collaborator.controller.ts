import client from "../db/db";
import { RequestType } from "../types/types";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

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

    res.status(200).json(
        new ApiResponse(
            false,
            { user: updatedUser },
            "Collaborator data home page data fetched successfully!",
        ),
    );
});

export { fetchHome };
