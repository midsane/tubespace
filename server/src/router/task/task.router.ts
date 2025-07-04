
import { Router } from "express";
import { upload } from "../../middleware/multer";
import { authMiddleware } from "../../middleware/authMiddleware";
import { createTask, fetchTasks } from "../../controllers/task/task.controller";

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.post("/create-task", upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "files" }
]),
    createTask
);

taskRouter.get("/fetch-tasks", fetchTasks)

export { taskRouter };
