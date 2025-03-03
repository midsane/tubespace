import client from "../db/db";
import { RequestType } from "../types/types";
import { asyncHandler } from "../utils/asyncHandler";

const fetchHome = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    if (user.role !== "collaborator") {
        return res.status(403).json({ message: "You are not allowed to access this resource" });
    }
});
export { fetchHome };
