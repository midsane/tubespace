import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

import { addPersonToChatList, createMsg, deleteMsg, editMsg, fetchMsgOfUser, getChatPersonList } from "../controllers/chat.controller";



const router = Router();
router.use(verifyJWT);
router.get("/getChatPersonList", getChatPersonList)
router.post("/addPersonToChatList", addPersonToChatList)
router.post("/fetchMsgOfUser", fetchMsgOfUser);
router.post("/editMsg", editMsg);
router.post("/createMsg", createMsg);
router.post("/deleteMsg", deleteMsg);
export default router;
