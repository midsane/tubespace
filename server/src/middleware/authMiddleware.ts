import { NextFunction, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiresponse";
import jwt from "jsonwebtoken"

export const authMiddleware = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.token?.split(" ")[1];
    if (!token)
        return res.status(403).json(new ApiResponse(null, "user not authenticated"))

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
})