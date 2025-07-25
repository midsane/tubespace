import { NextFunction, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiresponse";
import jwt from "jsonwebtoken"
import { jwtSecretConfig } from "../config";

export const authMiddleware = asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    console.log("\n\n\n Inside Auth middleware");
    const token = req.cookies.token?.split(" ")[1];
    console.log("token: ", token)
    if (!token)
        return res.status(403).json(new ApiResponse(null, "user not authenticated"))

    const jwtSecret = jwtSecretConfig;
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server error, jwt secret is not set"));
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
})

export const socketAuthMiddleware = asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    console.log("\n\n\n Inside Socket Auth middleware");
    const token = req.cookies.socketAuth?.split(" ")[1];
    console.log("token: ", token)
    if (!token)
        return res.status(403).json(new ApiResponse(null, "user not authenticated"))

    const jwtSecret = jwtSecretConfig;
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server error, jwt secret is not set"));
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
})


