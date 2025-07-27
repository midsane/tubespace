import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiResponse } from "./utils/apiresponse";
import { userRouter } from "./router/user/user.router";
import { taskRouter } from "./router/task/task.router"
import { router as youtubeUploadRouter } from "./router/yt-upload/yt-upload.router";
import { forgotPasswordRouter } from "./router/forgot-pasword/forgot-password.router";
import { CLIENT_URL1, CLIENT_URL2, CLIENT_URL3 } from "./config";
import { createServer } from "http";
import { notifyRouter } from "./router/RealTimeMessaging/reatTimeMessaging.routes";

const app = express();
export const httpServer = createServer(app)

app.use(express.json());
app.use(cookieParser());

if (!CLIENT_URL1 || !CLIENT_URL2 || !CLIENT_URL3) {
    console.log("CLIENT_URL1 or CLIENT_URL2 or CLIENT_URL3 is not set in the environment variables.");
    throw new Error("CLIENT_URL1 or CLIENT_URL2 or CLIENT_URL3 is not set in the environment variables.");
}

app.use(cors({
    origin: [CLIENT_URL1, CLIENT_URL2, CLIENT_URL3],
    credentials: true,
}));

app.get("/", (_, res) => {
    res.send("server is healthy 🍜")
})

app.use("/api/v1/forgot-password", forgotPasswordRouter);
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)
app.use("/api/v1/yt-upload", youtubeUploadRouter)
app.use("/api/v1/notify", notifyRouter)
app.use((err: any, _: any, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json(new ApiResponse(null, "Something went wrong!"));
});

export { app }