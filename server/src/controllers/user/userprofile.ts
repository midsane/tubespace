import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";


const fetchProfile = asyncHandler(async (req: any, res: Response) => {
    const reqUsername = req.user?.name;
    const username = req.query.username;

    if (!reqUsername)
        return res.status(403).json(new ApiResponse(null, "user not authenticated"));

    const user = await client.user.findFirst({ where: { name: username } })
    if (!user)
        return res.status(403).json(new ApiResponse(null, "user does not exist!"));

    const { password: psw, salt, ...filteredData } = user;
    let finalData: any = filteredData
    if (user.role === "YOUTUBER") {

        const videosUploaded = await client.task.count({
            where: {
                youtuberId: user.id,
                isCompleted: true
            }
        })
        finalData.videosUploaded = videosUploaded;

    }
    else {
        const ratingMap = {
            unrated: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5
        };

        const completedTasks = await client.task.findMany({
            where: {
                editorId: user.id,
                isCompleted: true,
            },
            select: {
                rating: true
            }
        });

        const totalCompleted = completedTasks.length;

        const numericRatings = completedTasks.map(task => ratingMap[task.rating]);

        const avgRating =
            numericRatings.length === 0
                ? 0
                : numericRatings.reduce((sum, val) => sum + val, 0) / numericRatings.length;

        finalData.rating = avgRating;
        finalData.tasksCompleted = totalCompleted;

    }

    finalData.editable = username === reqUsername;

    return res.status(200).status(200).json(new ApiResponse(finalData, "successfully fetched user's data!"));

})

export {
    fetchProfile
}