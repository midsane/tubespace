import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import hashPassword from "../../utils/auth.utils";
import { uploadOnCloudinary } from "../../utils/cloudinary";

const settingPageFetch = asyncHandler(async (req: RequestType, res) => {
    const { userName } = req.body;
    const user = req.user;
    if (userName === user.username) {

    }
    else {
        res.status(400).json({ success: false, message: "You are not authorized to view this page!" })
    }

    const userInfo = await client.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            Youtuber: true
        }
    })


    if (!userInfo) {
        return res.status(400).json({ success: false, message: "User not found!" });
    }

    const { password, ...userDataToSend } = userInfo;


    res.status(200).json(new ApiResponse(true, userDataToSend, "User info fetched successfully!"))
})

const updateSettings = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;

    let pfpPath: string | undefined;

    if (req.file) {
        pfpPath = req.file.path;
    }

    const { ...updateFields } = req.body;

    let pfp: any = null;
    if (pfpPath) {
        pfp = await uploadOnCloudinary(pfpPath)
    }


    if (!pfp && pfpPath) {
        return res.status(400).json(new ApiResponse(false, null, "could not upload profile picture"));
    }

    if (pfp) {
        updateFields.profilepic = pfp.secure_url;
    }

    const filteredUpdates = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    );

    const allowedUpdates: {
        password?: string,
        name?: string,
        username?: string,
        profilepic?: string
    } = {};

    const hashedPassword = await hashPassword(filteredUpdates.password as string);

    for (const key in filteredUpdates) {
        if (key === "password") {
            allowedUpdates.password = hashedPassword as string;
        }
        else if (key === "name") {
            allowedUpdates.name = filteredUpdates.name as string;
        }
        else if (key === "username") {
            allowedUpdates.username = filteredUpdates.username as string;
        }
        else if (key === "profilepic") {
            allowedUpdates.profilepic = filteredUpdates.profilepic as string;
        }
    }

    const updatedUser = await client.user.update({
        where: {
            id: user.id
        },
        data: {
            ...allowedUpdates
        }
    })


    if (!updatedUser) {
        return res.status(400).json(new ApiResponse(false, null, "could not update user"));
    }

    res.status(200).json(new ApiResponse(true, updatedUser, "User updated successfully!"))
})

export {
    settingPageFetch,
    updateSettings
}