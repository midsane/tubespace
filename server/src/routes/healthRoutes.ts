import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "healthy" });
});

export { router as HealthCheckRouter };
