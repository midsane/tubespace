import { RequestType } from "../types/types";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req: RequestType, res, next) => {
    try {

        const token = (req.cookies?.token || req.header("Authorization"))?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(new ApiResponse(false, {}, "No token provided"));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json(new ApiResponse(false, {}, "Invalid token"));
        }

        next();
    } catch (error) {
        return res.status(401).json(new ApiResponse(false, {}, "Unauthorized Access"));
    }
});
