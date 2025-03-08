import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { fetchHome, verifyRole } from "../controllers/youtuber/youtuber.controller";
import {
    addDraft,
    deleteDraft,
    fetchAllworkspaces,
    updateDraft,
} from "../controllers/youtuber/youtuberDraft.controller";
import {
    createWorkspace,
    deleteWorkspace,
    updateWorkspace,
} from "../controllers/youtuber/youtuberWorkspaces.controller";

const router = Router();
router.use(verifyJWT);
router.use(verifyRole);
router.route("/fetch-home").post(fetchHome);

router.route("/add-draft").post(addDraft);
router.route("/update-draft").put(updateDraft);
router.route("/delete-draft").delete(deleteDraft);
router.route("/fetch-all-workspaces").get(fetchAllworkspaces);


router.route("/create-workspace").post(createWorkspace);
router.route("/update-workspace").put(updateWorkspace);
router.route("/delete-workspace").delete(deleteWorkspace);

export default router;
