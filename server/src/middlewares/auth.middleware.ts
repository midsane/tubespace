import { RequestType } from "../types/types";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req: RequestType, res, next) => {
    try {
        console.log("inside vefifyJWT");
        console.log(req.cookies);
        const token = (req.cookies?.token || req.header("Authorization"))?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                data: {
                    success: false,
                    message: "Access token not found",
                },
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({
                data: {
                    success: false,
                    message: "Invalid token",
                },
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            data: {
                success: false,
                mesage: "UnAuthorized Access",
            },
        });
    }
});
