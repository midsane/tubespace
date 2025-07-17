import { Router } from "express";
import { generateOTPForEmail, verifyOTPForEmail } from "../../controllers/forgot-password/forgot-password.controller";

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/generate-otp", generateOTPForEmail);
forgotPasswordRouter.post("/verify-otp", verifyOTPForEmail);


export { forgotPasswordRouter };
