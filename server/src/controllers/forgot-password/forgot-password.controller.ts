import { client } from "../../db/connectToDb";
import { ApiResponse } from "../../utils/apiresponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { Response } from "express";
import { sendOtp, verifyOtp } from "../../utils/email-utility/emailUtility";

const generateOTPForEmail = asyncHandler(async (req: any, res: Response) => {
    const { email } = req.body;
    const userExist = await client.user.findFirst({ where: { email } });
    if (!userExist) {
        return res.status(409).json(new ApiResponse(null, "user doesn't exists with this email"));
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    try {
        await sendOtp(email, otp);
        return res.status(200).json(new ApiResponse(null, "OTP sent successfully to your email"));
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json(new ApiResponse(null, "Error sending OTP"));

    }
})



const verifyOTPForEmail = asyncHandler(async (req: any, res: Response) => {
    const { otp, email } = req.body;

    try {
        await verifyOtp(email, otp);
        return res.status(200).json(new ApiResponse(null, "OTP verified successfully"));
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json(new ApiResponse(null, "Error verifying OTP"));

    }
})


export {
    generateOTPForEmail,
    verifyOTPForEmail
}
