import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";
import { Rating_val } from "@prisma/client";
import { TopEditorsData } from "../../types/types";


const fetchTopEditors = asyncHandler(async (req: any, res: Response) => {
    const reqUsername = req.user?.name;

    const allEditors = await client.user.findMany({
        where: {
            role: "EDITOR",
        },
        include: {
            editorTasks: {
                where: {
                    isCompleted: true,
                    rating: {
                        not: "unrated"
                    }
                },
                select: {
                    rating: true
                }

            }
        }

    })

    let editorsData : TopEditorsData[]  = [];

    allEditors.forEach((editor) => {
        const taskCount = editor.editorTasks.length;
        const ratings = editor.editorTasks.map((task) => {
            switch (task.rating) {
                case Rating_val.one: return 1;
                case Rating_val.two: return 2;
                case Rating_val.three: return 3;
                case Rating_val.four: return 4;
                case Rating_val.five: return 5;
                default: return 0;
            }
        });

        const avgRating = ratings.reduce<number>((a, b) => a + b, 0) / ratings.length || 0;
        let avgRatingEnum: Rating_val = Rating_val.unrated;
        const score = avgRating * 0.8 + taskCount * 0.2
        switch (Math.ceil(avgRating)) {
            case 1:
                avgRatingEnum = Rating_val.one;
                break;
            case 2:
                avgRatingEnum = Rating_val.two;
                break;
            case 3:
                avgRatingEnum = Rating_val.three;
                break;
            case 4:
                avgRatingEnum = Rating_val.four;
                break;
            case 5:
                avgRatingEnum = Rating_val.five;
                break;
        }
        editorsData.push({
            name: editor.name as string,
            bio: editor.bio,
            profileImgUrl: editor.profileImgUrl,
            tasksCompleted: taskCount,
            ratings: avgRatingEnum,
            id: editor.id,
            score: score

        })

    });

    editorsData.sort((a, b) => b.score - a.score);

    return res.status(200).status(200).json(new ApiResponse(editorsData, "successfully fetched Top Editors' data!"));

})

export {
    fetchTopEditors
}