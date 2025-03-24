import { ACCOUNTTYPE } from "@prisma/client";
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

    console.log("updatedFields" + updateFields)

    let pfp: any = null;
    if (pfpPath) {
        console.log("pfpPath" + pfpPath)
        pfp = await uploadOnCloudinary(pfpPath)
        console.log("pfp");
        console.log(pfp)
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
        profilepic?: string,
        whatsAppNotification?: boolean,
        emailNotification?: boolean,
        pushNotification?: boolean,
        accountType?: ACCOUNTTYPE
    } = {};

    let hashedPassword: string | null = null;
    if (filteredUpdates.password)
        hashedPassword = await hashPassword(filteredUpdates.password as string);


    for (const key in filteredUpdates) {
        if (key === "password" && hashedPassword) {
            allowedUpdates.password = hashedPassword;
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
        else if (key === "whatsAppNotifcation") {
            allowedUpdates.whatsAppNotification = filteredUpdates.whatsAppNotifcation === "true" ? true : false as boolean;
        } else if (key === "emailNotifcation") {
            allowedUpdates.emailNotification = filteredUpdates.emailNotifcation === "true" ? true : false as boolean;
        }
        else if (key === "pushNotifcation") {
            allowedUpdates.pushNotification = filteredUpdates.pushNotifcation === "true" ? true : false as boolean;
        }
        else if (key === "accountType") {
            allowedUpdates.accountType = filteredUpdates.accountType === "public" ? ACCOUNTTYPE.public : ACCOUNTTYPE.private as ACCOUNTTYPE;
        }
    }

    const userAllowedUpdate = Object.fromEntries(
        Object.entries(allowedUpdates).filter(([key, value]) => {
            if (key !== "accountType" && key !== "whatsAppNotification" && key !== "emailNotification" && key !== "pushNotification" && key !== "deactivated" && key !== "youtubeConnected")
                return [key, value]
        }),
    );


    const updatedUser = await client.user.update({
        where: {
            id: user.id
        },
        data: {
            ...userAllowedUpdate
        }
    })


    const updateduserYoutuberSection = await client.youtuber.update({
        where: {
            userId: user.id
        },
        data: {
            whatsAppNotifcation: allowedUpdates.whatsAppNotification,
            emailNotifcation: allowedUpdates.emailNotification,
            pushNotifcation: allowedUpdates.pushNotification,
            accountType: allowedUpdates.accountType
        }
    })


    if (!updatedUser) {
        return res.status(400).json(new ApiResponse(false, null, "could not update user"));
    }

    const filteredUpdatedUser = Object.fromEntries(
        Object.entries(updatedUser).filter(([key, value]) => {
            if (key !== "accountType" && key !== "whatsAppNotifcation" && key !== "emailNotifcation" && key !== "pushNotifcation" && key !== "deactivated" && key !== "youtubeConnected" && key !== "password")
                return [key, value]
        }),
    );

    const dataToSend = {
        ...filteredUpdatedUser,
        Youtuber: updateduserYoutuberSection
    }

    res.status(200).json(new ApiResponse(true, dataToSend, "User updated successfully!"))
})

export {
    settingPageFetch,
    updateSettings
}