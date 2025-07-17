
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const CLIENT_URL1 = process.env.CLIENT_URL1
export const CLIENT_URL2 = process.env.CLIENT_URL2

export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const jwtSecretConfig = process.env.JWT_SECRET;
export const REDIS_API_KEY = process.env.REDIS_API_KEY;

export const PORT = process.env.PORT || 3000;
export const mode = process.env.MODE || "development";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
const api_key = process.env.CLOUDINARY_API_KEY
const api_secret = process.env.CLOUDINARY_API_SECRET
export const cloudinaryConfig = {
    cloud_name,
    api_key,
    api_secret
}

const clientId = process.env.YT_GOOGLE_CLIENT_ID
const redirectUri = process.env.YT_YOUR_REDIRECT_URI
const client_secret = process.env.YT_GOOGLE_CLIENT_SECRET

export const youtubeConfig = {
    clientId,
    redirectUri,
    client_secret
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const YOUR_REDIRECT_URI = process.env.YOUR_REDIRECT_URI;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const OauthConfig = {
    GOOGLE_CLIENT_ID,
    YOUR_REDIRECT_URI,
    GOOGLE_CLIENT_SECRET
}