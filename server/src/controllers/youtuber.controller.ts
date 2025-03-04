import client from "../db/db";
import { RequestType } from "../types/types";
import { asyncHandler } from "../utils/asyncHandler";

const fetchHome = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    console.log(user)
    if (user.role !== "youtuber") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
    const updatedUser = await client.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            Youtuber: {
                include: {
                    draftVideos: true,
                    tasksAssigned: true,
                    workspaces: true,
                }
            }
        },
    });


    res.status(200).json({ data: { user: updatedUser }, message: "Youtuber data home page data fetched successfully!" });
});

export { fetchHome };
