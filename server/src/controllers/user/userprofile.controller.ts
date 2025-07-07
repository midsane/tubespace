import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";
import { uploadToCloudinary } from "../../utils/cloudinary";


const fetchProfile = asyncHandler(async (req: any, res: Response) => {
    const requestingUserId = req.user?.id;
    const username = req.query.username;

    const user = await client.user.findFirst({ where: { name: username } })
    if (!user)
        return res.status(404).json(new ApiResponse(null, "user does not exist!"));

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

    finalData.editable = user.id === requestingUserId;

    return res.status(200).status(200).json(new ApiResponse(finalData, "successfully fetched user's data!"));

})

const editProfile = asyncHandler(async (req: any, res: Response) => {
    const { name, bio = "", link = "" } = req.body;
    const userId = req.user?.id;

    if (!name || name.trim() === "") {
        return res.status(400).json(new ApiResponse(null, "invalid name!"));
    }

    const doesNameExist = await client.user.findFirst({
        where: {
            name: name,
            id: {
                not: userId
            }
        }
    });

    if (doesNameExist) {
        return res.status(400).json(new ApiResponse(null, "name already exists!"));
    }

    let profileImgUrl: string | null = "";
    if (req?.files?.profileImg && req.files.profileImg[0]) {
        profileImgUrl = await uploadToCloudinary(
            req.files.profileImg[0].buffer,
            req.files.profileImg[0].originalname,
            req.files.profileImg[0].mimetype
        );
    }

    let BannerImgUrl: string | null = "";
    if (req?.files?.BannerImg && req.files.BannerImg[0]) {
        BannerImgUrl = await uploadToCloudinary(
            req.files.BannerImg[0].buffer,
            req.files.BannerImg[0].originalname,
            req.files.BannerImg[0].mimetype
        );
    }

    if (BannerImgUrl && BannerImgUrl.trim() === "")
        BannerImgUrl = null;

    if (profileImgUrl && profileImgUrl.trim() === "")
        profileImgUrl = null;

    const user = await client.user.update({
        where: { id: userId },
        data: {
            name,
            bio,
            attachedLinks: link,
            profileImgUrl: profileImgUrl || undefined,
            bannerImgUrl: BannerImgUrl || undefined
        },
        select: {
            id: true,
            name: true,
            profileImgUrl: true,
            bannerImgUrl: true,
            bio: true,
            attachedLinks: true,
        }
    });

    return res.status(200).json(new ApiResponse(user, "profile updated successfully!"));


})

export {
    fetchProfile,
    editProfile
}