import { Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiresponse';
import { client } from '../../db/connectToDb';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { youtubeConfig } from '../../config';

const clientId = youtubeConfig.clientId
const redirectUri = youtubeConfig.redirectUri
const client_secret = youtubeConfig.client_secret
const state = 'some_random_state_value';


const updateMetaDataYoutube = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.user;
    const { taskId: taskid } = req.body;
    const taskId = Number(taskid);
    const { title, description, tags, madeForKids } = req.body;
    if (!taskId) {
        return res.status(400).json(new ApiResponse(null, "taskId is required"));
    }
    const task = await client.task.findFirst({
        where: {
            id: taskId
        }
    })

    if (!task || !task.onServer || task.isCompleted) {
        return res.status(400).json(new ApiResponse(null, "Invalid task or task already completed"));
    }

    if (task.youtuberId !== id) {
        return res.status(403).json(new ApiResponse(null, "You are not authorized to update this task"));
    }

    let thumnailUrl = null;
    if (req.file) {
        const response = await uploadToCloudinary(req.file.path);
        if (response && response.secure_url) {
            thumnailUrl = response.secure_url;
        }
        else {
            return res.status(500).json(new ApiResponse(null, "Failed to upload thumbnail to Cloudinary"));
        }

    }

    const updatedTask = await client.task.update({
        where: {
            id: taskId
        },
        data: {
            title: title || task.title,
            description: description || task.description,
            tags: JSON.parse(tags) || task.tags,
            madeForKids: madeForKids === "true" || madeForKids === true,
            thumbnail: thumnailUrl || task.thumbnail
        },
        include: {
            editor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImgUrl: true,
                }
            }
        }
    });
    return res.status(200).json(new ApiResponse(updatedTask, "Youtube video details updated successfully"));
})

const authorize = asyncHandler(async (req: any, res: Response) => {
    if (!clientId || !redirectUri || !client_secret) {
        return res.status(500).json(new ApiResponse(null, "Google OAuth credentials are not set"));
    }

    const scope = 'https://www.googleapis.com/auth/youtube.upload';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}&` +
        `access_type=offline&` +
        `prompt=consent&` + // force consent every time
        `state=${encodeURIComponent(state)}`;


    res.status(200).json(new ApiResponse(authUrl, "Authorization URL generated successfully"));

});

export {
    authorize,
    updateMetaDataYoutube,
}