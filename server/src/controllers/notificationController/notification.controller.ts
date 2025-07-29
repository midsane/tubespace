import { Response } from "express";
import { customRequest } from "../../types/types";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";

const toggleNotification = asyncHandler(async (req: customRequest, res: Response) => {
    const { notificationType } = req.body;
    if (!notificationType) {
        return res.status(400).json(new ApiResponse(null, 'notificationType is required'))
    }
    //notificationType is 1 for push notification and 2 for email;
    const user = await client.user.findUnique({
        where: { id: req.user.id },
        select: { pushNotificationsEnabled: true, emailNotificationsEnabled: true }
    });
    if (notificationType == 1) {
        await client.user.update({
            where: { id: req.user.id },
            data: { pushNotificationsEnabled: !user?.pushNotificationsEnabled }
        })

    } else if (notificationType == 2) {
        await client.user.update({
            where: { id: req.user.id },
            data: { emailNotificationsEnabled: !user?.emailNotificationsEnabled }
        })
    }

    res.status(200).json(new ApiResponse(null, "notification toggled successfully"))
})


const fetchNotification = asyncHandler(async (req: customRequest, res: Response) => {
    const notification = await client.user.findFirst({
        where: { id: req.user.id },
        select: { notifications: true, pushNotificationsEnabled: true, emailNotificationsEnabled: true }
    });

    res.status(200).json(new ApiResponse(notification, "notification fetched successfully"));
})

const notificationRead = asyncHandler(async (req: customRequest, res: Response) => {
    const notification = await client.notification.update({
        where: { id: req.body.id },
        data: { read: true }
    });
    res.status(200).json(new ApiResponse(notification, "notification marked as read successfully"));
})


export { toggleNotification, fetchNotification, notificationRead }