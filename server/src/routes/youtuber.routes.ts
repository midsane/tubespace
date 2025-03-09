import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { fetchHome, verifyYoutuberRole } from "../controllers/youtuber/youtuber.controller";
import {
    addDraft,
    deleteDraft,
    fetchAllDraftVideos,
    updateDraft,
} from "../controllers/youtuber/youtuberDraft.controller";
import {
    createWorkspace,
    deleteWorkspace,
    fetchAllworkspaces,
    updateWorkspace,
} from "../controllers/youtuber/youtuberWorkspaces.controller";
import { assignTask, fetchAllAssignedTasks, fetchYoutubers, fetchYoutubersShallow, unassignTask, updateTasks } from "../controllers/youtuber/youtuberTasks.controller";

const router = Router();

router.route("/fetch-youtubers").get(fetchYoutubers);
router.route("/fetch-youtubers-shallow").get(fetchYoutubersShallow);

router.use(verifyJWT);
router.use(verifyYoutuberRole);
router.route("/fetch-home").post(fetchHome);

router.route("/fetch-all-draftVideos").get(fetchAllDraftVideos);
router.route("/add-draft").post(addDraft);
router.route("/update-draft").put(updateDraft);
router.route("/delete-draft").delete(deleteDraft);

router.route("/fetch-all-workspaces").get(fetchAllworkspaces);
router.route("/create-workspace").post(createWorkspace);
router.route("/update-workspace").put(updateWorkspace);
router.route("/delete-workspace").delete(deleteWorkspace);

router.route("/fetch-all-assigned-tasks").get(fetchAllAssignedTasks);
router.route("/assign-task").post(assignTask);
router.route("/unassign-task").delete(unassignTask);
router.route("/update-tasks").put(updateTasks);

export default router;
