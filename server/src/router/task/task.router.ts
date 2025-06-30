
import { Router } from "express";

import { uploadToCloudinary } from "../../utils/cloudinary";
import { asyncHandler } from "../../utils/asyncHandler";

import { Role } from "@prisma/client";
import { upload } from "../../middleware/multer";
import { client } from "../../db/connectToDb";
import { Response } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";

const taskRouter = Router();

taskRouter.post(
    "/create-task",
    authMiddleware,
    upload.array("files"),
    asyncHandler(async (req: any, res: Response) => {
        const {id} = req.user;
        console.log("id", id);
        const user = await client.user.findUnique({ where: { id } });
        
        if (!user) {
            return res.status(404).json({ message: "user not authenticated, go to login" });
        }
        if (user.role !== Role.YOUTUBER) {
            return res.status(403).json({ message: "Only youtubers can create tasks" });
        }

        const {
            taskTitle,
            deadline,
            title = "",
            description = "",
            assignedTo,
        } = req.body;

        if (!taskTitle || !deadline || !assignedTo) {
            return res.status(400).json({ message: "taskTitle, deadline, and assignedTo are required" });
        }

        // Check editor exists
        console.log("assignedTo", assignedTo);
        const editor = await client.user.findUnique({ where: { name: assignedTo } });
        if (!editor || editor.role !== Role.EDITOR) {
            return res.status(404).json({ message: "Editor not found" });
        }

        // Upload files to cloudinary
        const uploadedUrls: string[] = [];

        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const url = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
                uploadedUrls.push(url);
            }
        }

        // Create Task
        const newTask = await client.task.create({
            data: {
                taskTitle,
                deadline: new Date(deadline),
                title,
                description,
                editorId: editor.id,
                youtuberId: user.id,
                Files: uploadedUrls,
            },
        });

        res.status(201).json({ message: "Task created", task: newTask });
    })
);

export { taskRouter};
