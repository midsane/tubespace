import { Router } from "express";
import { loginYoutuber, registerYoutuber } from "../controllers/auth.controller";

const router = Router();
router.route("/register-youtuber").post(registerYoutuber);
router.route("/login-youtuber").post(loginYoutuber);
router.route("/register-collaborator").post();
router.route("/login-collaborator").post();

export default router;
