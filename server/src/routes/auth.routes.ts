import { Router } from "express";
import {
    loginCollaborator,
    loginYoutuber,
    registerCollaborator,
    registerYoutuber,
} from "../controllers/auth.controller";

const router = Router();
router.route("/register-youtuber").post(registerYoutuber);
router.route("/login-youtuber").post(loginYoutuber);
router.route("/register-collaborator").post(registerCollaborator);
router.route("/login-collaborator").post(loginCollaborator);

export default router;
