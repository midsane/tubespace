import { Router } from "express";
import { fetchNotification, notificationRead, toggleNotification } from "../../controllers/notificationController/notification.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const notificationRouter = Router();

notificationRouter.use(authMiddleware)
notificationRouter.get("/fetch-notification", fetchNotification);
notificationRouter.post("/update-notification", notificationRead);
notificationRouter.post("/toggle-notification", toggleNotification);

export { notificationRouter };