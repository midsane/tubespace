import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { HealthCheckRouter } from "./routes/healthRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "17kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/health", HealthCheckRouter);

export { app };
