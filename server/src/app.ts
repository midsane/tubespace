import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import collaboratorRouter from "./routes/collaborator.routes";
import youtuberRouter from "./routes/youtuber.routes";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use(
    cors({
        origin: [process.env.clientURL || "", process.env.clientURL2 || ""],
        credentials: true,
    }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/collaborator", collaboratorRouter);
app.use("/api/v1/youtuber", youtuberRouter);

app.get("/", (_, res) => {
    res.send("backend is running 😺");
});

export default app;
