import { Router } from "express";
import {
    loginCollaborator,
    loginYoutuber,
    logoutUser,
    registerCollaborator,
    registerYoutuber,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { RequestType } from "../types/types";
import { ApiResponse } from "../utils/apiResponse";

const router = Router();
router.route("/register-youtuber").post(registerYoutuber);
router.route("/login-youtuber").post(loginYoutuber);
router.route("/register-collaborator").post(registerCollaborator);
router.route("/login-collaborator").post(loginCollaborator);

router.use(verifyJWT);

router.route("/check-loggedInStatus").post((req: RequestType, res) => {
    res.status(200).json(
        new ApiResponse(
            true,
            {
                success: true,
                message: "User is logged in",
                user: {
                    id: req.user.id,
                    name: req.user.name,
                    email: req.user.email,
                    username: req.user.username,
                    profilepic: req.user.profilepic,
                    createdAt: req.user.createdAt,
                    role: req.user.role,
                },
            },
            "User is logged in",
        ),
    );
});

router.route("/logout").post(logoutUser);

export default router;
