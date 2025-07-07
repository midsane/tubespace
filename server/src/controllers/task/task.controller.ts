import { uploadToCloudinary } from "../../utils/cloudinary";
import { asyncHandler } from "../../utils/asyncHandler";

import { Role } from "@prisma/client";
import { client } from "../../db/connectToDb";
import { Response } from "express";
import { ApiResponse } from "../../utils/apiresponse";

const createTask = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.user;

    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
        return res.status(404).json({ message: "user not authenticated, go to login" });
    }

    if (user.role !== Role.YOUTUBER) {
        return res.status(403).json({ message: "Only youtubers can create tasks" });
    }


    const {
        taskTitle,
        workDescription,
        deadline,
        assignedTo,
        title = "",
        description = "",
        tags,
        madeForKids,
    } = req.body;


    const task = await client.task.findFirst({
        where: {
            taskTitle
        }
    })
    if (task) {
        return res.status(400).json({ message: "Task with this title already exists" });
    }

    if (!taskTitle || !deadline || !assignedTo || !workDescription) {
        return res.status(400).json({ message: "taskTitle, workDescription, deadline, and assignedTo are required" });
    }

    const editor = await client.user.findUnique({ where: { name: assignedTo } });
    if (!editor || editor.role !== Role.EDITOR) {
        return res.status(404).json({ message: "Editor not found" });
    }

    const uploadedUrls: string[] = [];

    if (req.files && Array.isArray(req.files.files)) {
        for (const file of req.files.files) {
            const url = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
            uploadedUrls.push(url);
        }
    }

    let thumbnailUrl = "";
    if (req.files?.thumbnail && req.files.thumbnail[0]) {
        thumbnailUrl = await uploadToCloudinary(
            req.files.thumbnail[0].buffer,
            req.files.thumbnail[0].originalname,
            req.files.thumbnail[0].mimetype
        );
    }

    console.log("tags: ", tags);
    const newTask = await client.task.create({
        data: {
            taskTitle,
            workDescription,
            deadline: new Date(deadline),
            title,
            description,
            editorId: editor.id,
            youtuberId: user.id,
            attachments: uploadedUrls,
            tags: tags ? JSON.parse(tags) : [],
            madeForKids: madeForKids === "true" || madeForKids === true,
            thumbnail: thumbnailUrl,
        },
    });

    res.status(201).json({ message: "Task created", task: newTask });
})

const fetchTasks = asyncHandler(async (req: any, res: Response) => {
    const { id, role } = req.user;

    if (role === Role.YOUTUBER) {
        const tasks = await client.task.findMany({
            where: { youtuberId: id },
            include: {
                editor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profileImgUrl: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json(new ApiResponse(tasks, "Successfully fetched tasks for youtuber"));

    }
    else if (role === Role.EDITOR) {
        const tasks = await client.task.findMany({
            where: { editorId: id },
            select: {
                youtuber: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profileImgUrl: true,
                    }
                },
                id: true,
                attachments: true,
                deadline: true,
                isCompleted: true,
                taskTitle: true,
                workDescription: true,
                rating: true,
                review: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json(new ApiResponse(tasks, "Successfully fetched tasks for editor"));
    }


    return res.status(403).json({ message: "You do not have permission to view tasks" });

});

const uploadEditedVideoToServer = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.user;
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
        return res.status(404).json({ message: "user not authenticated, go to login" });
    }

    if (user.role !== Role.EDITOR) {
        return res.status(403).json({ message: "Only editors can upload edited videos" });
    }

    const { taskId } = req.body;
    const task = await client.task.findUnique({ where: { id: taskId } });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (task.editorId !== user.id) {
        return res.status(403).json({ message: "You are not assigned to this task" });
    }

    if (!req.files || !req.files.video) {
        return res.status(400).json({ message: "Video file is required" });
    }

    const videoFile = req.files.video[0];
    const videoUrl = await uploadToCloudinary(videoFile.buffer, videoFile.originalname, videoFile.mimetype);

    await client.task.update({
        where: { id: taskId },
        data: {
            editedVideoUrl: videoUrl,
            onServer: true,
        },
    });

    res.status(200).json(new ApiResponse(null, "Edited video uploaded to server successfully"));
})

const getVideoPreview = asyncHandler(async (req: any, res: Response) => {
    const { taskId } = req.params;
    const { id } = req.user;
    if (!taskId) {
        return res.status(400).json({ message: "task ID is required" });
    }

    const task = await client.task.findFirst({
        where: { id: taskId, onServer: true },
        select: {
            editedVideoUrl: true,
            taskTitle: true,
            youtuberId: true,
            id: true,
        }
    });

    if (!task) {
        return res.status(404).json(new ApiResponse(null, "Task not found or video not uploaded to server"));
    }

    if (id !== task?.youtuberId) {
        return res.status(403).json(new ApiResponse(null, "You do not have permission to view this task's video preview"));
    }

    res.status(200).json(new ApiResponse(task, "Video preview fetched successfully"));
})

export { createTask, fetchTasks, uploadEditedVideoToServer, getVideoPreview };