import { Router } from "express";
import { checkAuth, getOauthWindow, login, logout, Oauth, resetPassword, setFCMToken, signup } from "../../controllers/user/userauth.controller";
import { editProfile, fetchProfile } from "../../controllers/user/userprofile.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { fetchTopEditors } from "../../controllers/editors/editors.controller";
import { upload } from "../../middleware/multer";
import { fetchTopYoutubers } from "../../controllers/youtubers/youtubers.controllers";
import { searchUsers } from "../../controllers/user/userSearch";

const userRouter = Router();

userRouter.route("/login").post(login)
userRouter.route("/signup").post(signup)
userRouter.route("/reset-password").post(authMiddleware, resetPassword)
userRouter.route("/oauth/get-consent-window").get(getOauthWindow)
userRouter.route("/oauth/login-register").get(Oauth)
userRouter.route("/logout").post(logout)

userRouter.use(authMiddleware);
userRouter.route("/profile").get(fetchProfile)
userRouter.route("/check-auth").get(checkAuth)
userRouter.route("/top-editors").get(fetchTopEditors)
userRouter.route("/top-youtubers").get(fetchTopYoutubers)
userRouter.post("/edit-profile", upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "BannerImg", maxCount: 1 }
]),
    editProfile
);

userRouter.route("/search-user").get(searchUsers)


export { userRouter };