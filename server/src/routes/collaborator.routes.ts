import { Router } from "express";
import { fetchCollaborators, fetchCollaboratorsShallow, fetchHome, verifyCollaboratorRole } from "../controllers/collaborator/collaborator.controller";
import { verifyJWT } from "../middlewares/auth.middleware";



const router = Router();
router.use(verifyJWT);
router.route("/fetch-collaborators").get(fetchCollaborators);
router.route("/fetch-collaborators-shallow").get(fetchCollaboratorsShallow);

router.route("/fetch-home").post(fetchHome);



export default router;
