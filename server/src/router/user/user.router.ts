import { Router } from "express";
import { checkAuth, login, logout, signup } from "../../controllers/user/userauth.controller";
import { fetchProfile } from "../../controllers/user/userprofile.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { fetchTopEditors } from "../../controllers/editors/editors.controller";

const userRouter = Router();

userRouter.route("/login").post(login)
userRouter.route("/signup").post(signup)
userRouter.route("/logout").post(logout)

userRouter.use(authMiddleware);
userRouter.route("/profile").get(fetchProfile)
userRouter.route("/check-auth").get(checkAuth)
userRouter.route("/top-editors").get(fetchTopEditors)

export { userRouter };