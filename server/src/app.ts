import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiResponse } from "./utils/apiresponse";
import { userRouter } from "./router/user/user.router";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("server is healthy 🍜")
})


app.use("/api/v1/user", userRouter)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json(new ApiResponse(null, "Something went wrong!"));
});

export { app }