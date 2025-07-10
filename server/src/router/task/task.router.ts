
import { Router } from "express";
import { upload } from "../../middleware/multer";
import { authMiddleware } from "../../middleware/authMiddleware";
import { createTask, fetchTaskById, fetchTasks, getVideoPreview, uploadEditedVideoToServer } from "../../controllers/task/task.controller";

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.post("/create-task", upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "files" }
]),
    createTask
);

taskRouter.get("/fetch-tasks", fetchTasks)


taskRouter.post("/upload-video-to-server", upload.fields([
    { name: "video", maxCount: 1 },
]),
    uploadEditedVideoToServer
);
taskRouter.get("/video-preview/:taskId", getVideoPreview);
taskRouter.get("/fetch-task/:taskid", fetchTaskById);

export { taskRouter };
