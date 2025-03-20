import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { fetchHome } from "../controllers/youtuber/youtuber.controller";
import {
    addDraft,

    createPageFetch,

    deleteDraft,
    deleteFileinDraft,
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
import { upload } from "../middlewares/multer.middleware";
import { settingPageFetch, updateSettings } from "../controllers/youtuber/youtuber.settings.controller";


const router = Router();

router.use(verifyJWT);
// router.use(verifyYoutuberRole);
router.route("/fetch-youtubers").post(fetchYoutubers);
router.route("/fetch-youtubers-shallow").get(fetchYoutubersShallow);
router.route("/fetch-home").post(fetchHome);

router.route("/fetch-all-draftVideos").get(fetchAllDraftVideos);
router.route("/add-draft").post(addDraft);
router.route("/update-draft").put(upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    },
    {
        name: "video",
        maxCount: 1
    }
]), updateDraft);
router.route("/delete-draft").delete(deleteDraft);
router.route("/delete-file-in-draft").delete(deleteFileinDraft);

router.route("/fetch-all-workspaces").get(fetchAllworkspaces);
router.route("/create-workspace").post(createWorkspace);
router.route("/update-workspace").put(updateWorkspace);
router.route("/delete-workspace").delete(deleteWorkspace);

router.route("/fetch-all-assigned-tasks").get(fetchAllAssignedTasks);
router.route("/assign-task").post(assignTask);
router.route("/unassign-task").delete(unassignTask);
router.route("/update-tasks").put(updateTasks);

router.route('/createpage-fetch').post(createPageFetch)

router.route("/settingPage").post(settingPageFetch)
router.route("/update-settings").put(upload.single("profilePic"), updateSettings)
export default router;
