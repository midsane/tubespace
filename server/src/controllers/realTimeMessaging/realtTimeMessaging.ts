import { Response } from "express";
import { customRequest } from "../../types/types";
import { asyncHandler } from "../../utils/asyncHandler";
import { notify } from "../../utils/push-notification/notify";
import { ApiResponse } from "../../utils/apiresponse";
import { client } from "../../db/connectToDb";


const sendPushNotification = asyncHandler(async (req: customRequest, res: Response) => {
    const { fcmToken, title, body } = req.body;
    if (!fcmToken || !title || !body) {
        return res.status(400).json(new ApiResponse(null, 'invalid parameters'))
    }
    try {
        await notify(fcmToken, title, body);
        return res.status(200).json(new ApiResponse(null, "send push notification successfully"))
    } catch (error) {
        return res.status(500).json(new ApiResponse(null, "error sending push notification"))
    }
})

const sendEmail = asyncHandler(async (req: customRequest, res: Response) => {

})

export {
    sendPushNotification,
    sendEmail
}