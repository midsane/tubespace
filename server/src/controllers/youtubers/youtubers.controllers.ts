import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";
import { TopYoutubersData } from "../../types/types";


const fetchTopYoutubers = asyncHandler(async (req: any, res: Response) => {

    const allYoutubers = await client.user.findMany({
        where: {
            role: "YOUTUBER",
        },
        select: {
            id: true,
            name: true,
            bio: true,
            role: true,
            profileImgUrl: true,
            youtuberTasks: {
                where: {
                    isCompleted: true
                }
            }

        }

    })

    let youtubersData: Partial<TopYoutubersData>[] = [];

    allYoutubers.forEach((youtuber) => {
        youtubersData.push({
            name: youtuber.name || "",
            bio: youtuber.bio,
            profileImgUrl: youtuber.profileImgUrl,
            id: youtuber.id,
            videosUploaded: youtuber.youtuberTasks.length,
            role: youtuber.role
        })

    })

    allYoutubers.sort((a, b) => {
        const aScore = a.youtuberTasks.length;
        const bScore = b.youtuberTasks.length;
        return bScore - aScore;
    })

    return res.status(200).json(new ApiResponse(allYoutubers, "Top Youtubers fetched successfully",))


});


export {
    fetchTopYoutubers
}