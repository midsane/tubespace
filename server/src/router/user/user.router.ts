import { Router } from "express";
import { login, signup } from "../../controllers/user/userauth";
import { fetchProfile } from "../../controllers/user/userprofile";
import { authMiddleware } from "../../utils/authMiddleware";

const userRouter = Router();

userRouter.route("/login").post(login)
userRouter.route("/signup").post(signup)

userRouter.use(authMiddleware);
userRouter.route("/profile").get(fetchProfile)

export { userRouter };