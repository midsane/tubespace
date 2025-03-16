import { Router } from "express";
import { fetchCollaborators, fetchCollaboratorsShallow, fetchHome, verifyCollaboratorRole } from "../controllers/collaborator/collaborator.controller";
import { verifyJWT } from "../middlewares/auth.middleware";



const router = Router();
router.route("/fetch-collaborators").get(fetchCollaborators);
router.route("/fetch-collaborators-shallow").get(fetchCollaboratorsShallow);
router.use(verifyJWT);
router.use(verifyCollaboratorRole)
router.route("/fetch-home").post(fetchHome);



export default router;
