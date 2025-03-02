import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRouter);

app.get("/", (_, res) => {
  res.send("backend is running 😺");
});

export default app;
