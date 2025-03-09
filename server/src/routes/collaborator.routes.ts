import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { fetchCollaborators, fetchHome, verifyCollaboratorRole } from "../controllers/collaborator.controller";

const router = Router();
router.route("/fetch-collaborators").get(fetchCollaborators);
router.use(verifyJWT);
router.use(verifyCollaboratorRole)
router.route("/fetch-home").post(fetchHome);



export default router;
