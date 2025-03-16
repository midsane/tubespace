import { count } from "console";
import client from "../../db/db";
import { RequestType } from "../../types/types";
import { ApiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const fetchAllAssignedTasks = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    const { workspaceid } = req.body;

    let assignedTasks: any = null;
    const workspaceIdNum = parseInt(workspaceid);
    if (!workspaceIdNum || isNaN(workspaceIdNum)) {

        assignedTasks = await client.tasks.findMany({
            where: {

                youtuberId: user.Youtuber.youtuberId,

            },
        });
    }
    else {
        assignedTasks = await client.tasks.findMany({
            where: {
                youtuberId: user.Youtuber.youtuberId,
                workspaceId: workspaceIdNum
            }
        });
    }


    if (!assignedTasks) {
        res.status(400).json(new ApiResponse(false, null, "could not fetch assigned tasks successfully"));
    }
    res.status(200).json(new ApiResponse(true, assignedTasks, "assigned tasks fetched successfully"));
})

const assignTask = asyncHandler(async (req: RequestType, res) => {
    const user = req.user;
    const {
        workspaceId,
        collaboratorId,
        draftVideoId,
        taskType,
        deadline
    } = req.body;

    const alreadyAssignedTask = await client.tasks.findFirst({
        where: {
            workspaceId,
            youtuberId: user.Youtuber.youtuberId,
            draftVideoId,
            taskType,
        }
    })

    if (alreadyAssignedTask) {
        return res.status(400).json(new ApiResponse(false, null, "Task is already assigned to someone!"));

    }

    const task = await client.tasks.create({
        data: {
            workspaceId,
            youtuberId: user.Youtuber.youtuberId,
            collaboratorId,
            draftVideoId,
            taskType,
            deadline
        }
    });

    if (!task) {
        res.status(400).json(new ApiResponse(false, null, "could not assign task"));
    }
    res.status(200).json(new ApiResponse(true, task, "task assigned successfully"));
})

const unassignTask = asyncHandler(async (req: RequestType, res) => {

    const {
        taskId
    } = req.body;

    const assignedTask = await client.tasks.findFirst({
        where: {
            taskId
        }
    })

    if (!assignedTask) {
        return res.status(400).json(new ApiResponse(false, null, "Task doesn't exist"));

    }

    const unAssignedtask = await client.tasks.delete({
        where: {
            taskId
        }
    });

    if (!unAssignedtask) {
        res.status(400).json(new ApiResponse(false, null, "could not unassign task"));
    }
    res.status(200).json(new ApiResponse(true, unAssignedtask, "task unassigned successfully"));
})

const fetchYoutubers = asyncHandler(async (req: RequestType, res) => {
    let { searchQuery, limit, start } = req.query;

    const take = limit ? parseInt(limit as string, 10) : 10;
    const skip = start ? parseInt(start as string, 10) : 0;

    if (searchQuery && typeof searchQuery !== "string") {
        return res.status(400).json(new ApiResponse(false, null, "search query must be a string"));
    }

    let youtubers: any = null;

    const countOfYoutubers = await client.user.count({
        where: searchQuery ? {
            role: "youtuber",
            username: {
                contains: searchQuery as string,
                mode: "insensitive",
            },
        } : {
            role: "youtuber"
        },
    });

    youtubers = await client.user.findMany({
        where: searchQuery ? {
            role: "youtuber",
            username: {
                contains: searchQuery as string,
                mode: "insensitive",
            },
        } : {
            role: "youtuber"
        },
        include: {
            Youtuber: {
                include: {
                    tasksAssigned: true,
                    workspaces: true,
                    draftVideos: true,
                },
            },
        },
        skip,
        take,
    });

    if (!youtubers || youtubers.length === 0) {
        return res.status(400).json(new ApiResponse(false, null, "could not fetch youtubers"));
    }

    const sanitizedData = youtubers.map(({ password, ...user }) => user);

    const dataToSend = {
        ytData: sanitizedData,
        count: countOfYoutubers,
    }

    res.status(200).json(new ApiResponse(true, dataToSend, "youtubers fetched successfully"));
});


const fetchYoutubersShallow = asyncHandler(async (req: RequestType, res) => {
    const { searchQuery } = req.query;

    if (searchQuery && typeof searchQuery !== "string") {
        return res.status(400).json(new ApiResponse(false, null, "search query is required"));
    }

    let youtubers: any = null;
    if (typeof searchQuery === "string") {
        youtubers = await client.user.findMany({
            where: {
                role: "youtuber",

                username: {
                    contains: searchQuery as string,
                    mode: "insensitive",
                }
            },

        });
    }
    else {
        youtubers = await client.user.findMany({
            where: {
                role: "youtuber"
            },

        });
    }



    if (!youtubers) {
        res.status(400).json(new ApiResponse(false, null, "could not fetch youtubers"));
    }

    const dataToSend = youtubers.map(({ password, ...user }) => user);

    res.status(200).json(new ApiResponse(true, {
        ytData: dataToSend
    }, "youtubers fetched successfully"));
})

const updateTasks = asyncHandler(async (req: RequestType, res) => {

    const { taskId, ...updateFields } = req.body;

    const task = await client.tasks.update({
        where: {
            taskId
        },
        data: {
            ...updateFields,

        }
    });

    if (!task) {
        res.status(400).json(new ApiResponse(false, null, "could not update task"));
    }

    res.status(200).json(new ApiResponse(true, task, "task updated successfully"));

})

export {
    fetchAllAssignedTasks,
    assignTask,
    fetchYoutubers,
    fetchYoutubersShallow,
    updateTasks,
    unassignTask,
}