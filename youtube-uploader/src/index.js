import fs from 'fs';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

export function getOAuth2Client() {
    const content = fs.readFileSync(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

export async function authorizeAndGetUrl() {
    const oAuth2Client = getOAuth2Client();
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    return authUrl;
}

export async function uploadVideo(code, ytVideo) {
    const oAuth2Client = getOAuth2Client();

    try {
        console.log("code: ", code);
        const { tokens } = await oAuth2Client.getToken(code);
        console.log("got token, tokens: ", tokens);
        oAuth2Client.setCredentials(tokens);

    } catch (err) {
        console.error('Error retrieving access token:', err);
        return;
    }

    const youtube = google.youtube({ version: 'v3', auth: oAuth2Client });

    try {
        const res = await youtube.videos.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: ytVideo.title,
                    description: ytVideo.description,
                },
                status: {
                    privacyStatus: 'public',
                },
            },
            media: {
                body: fs.createReadStream(ytVideo.filePath),
            },
        });

        console.log('Video uploaded. Video ID:', res.data.id);
    } catch (err) {
        console.error('Error uploading video:', err);
    }
}
