import { Router } from "express";
import {
    fetchCollaborators,
    fetchCollaboratorsShallow,
    fetchHome,
    verifyCollaboratorRole,
} from "../controllers/collaborator/collaborator.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import {
    settingPageFetchCol,
    updateSettingsCol,
} from "../controllers/collaborator/collaborator.settings.controller";

const router = Router();
router.use(verifyJWT);
router.route("/fetch-collaborators").get(fetchCollaborators);
router.route("/fetch-collaborators-shallow").get(fetchCollaboratorsShallow);

router.route("/fetch-home").post(fetchHome);

router.route("/settingPage").post(settingPageFetchCol);
router.route("/update-settings").put(upload.single("profilepic"), updateSettingsCol);

export default router;
