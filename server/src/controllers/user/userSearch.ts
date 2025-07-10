import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";


const searchUsers = asyncHandler(async (req: any, res: Response) => {

    let { query } = req.query
    query = query?.trim();
    const users = await client.user.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } }
            ]
        },
        select: {
            id: true,
            name: true,
            email: true,
            profileImgUrl: true,
            role: true,
        }
    })

    console.log("searching users with query:", query);
    console.log("found users:", users);

    if (!users || users.length === 0) {
        return res.status(404).json(new ApiResponse([], "No users found"));
    }

    res.status(200).json(new ApiResponse(users, "Users found successfully"));

})

export {
    searchUsers
}