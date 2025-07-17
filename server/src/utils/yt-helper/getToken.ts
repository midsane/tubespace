import { youtubeConfig } from "../../config";
import { client } from "../../db/connectToDb";
import axios from "axios";
const clientId = youtubeConfig.clientId
const redirectUri = youtubeConfig.redirectUri
const client_secret = youtubeConfig.client_secret

export const getTokenForStartingVideoUploadSession = async (Encodedcode: string, taskId: number) => {

    console.log('Encoded code:', Encodedcode);
    if (!Encodedcode) throw new Error("Encoded code is required");
    const code = decodeURIComponent(Encodedcode);

    console.log('Decoded code:', code);
    if (!taskId) {
        throw new Error("taskId is required to get token");
    }

    const task = await client.task.findFirst({
        where: {
            id: taskId
        }
    })

    if (!task || !task?.onServer || task.isCompleted) {
        throw new Error("Invalid task or task already completed");
    }

    if (!clientId || !redirectUri || !client_secret) {
        throw new Error("Google OAuth credentials are not set");
    }
    try {
        const response = await axios({
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            })
        })

        console.log('Tokens received successfully!');
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        console.log('Access Token:', accessToken);
        return {
            accessToken,
            refreshToken,
        }
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        throw new Error("Error exchanging code for tokens");
    }

}
