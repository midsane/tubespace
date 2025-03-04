import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { fetchHome } from "../controllers/youtuber.controller";

const router = Router();
router.use(verifyJWT);
router.route("/fetch-home").post(fetchHome);

export default router;
