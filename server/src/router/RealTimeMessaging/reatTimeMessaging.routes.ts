import { Router } from "express";
import { sendEmail, sendPushNotification } from "../../controllers/realTimeMessaging/realtTimeMessaging";


const notifyRouter = Router();

notifyRouter.post("/send-pushNotifications", sendPushNotification);
notifyRouter.post("/send-email", sendEmail);


export { notifyRouter };
