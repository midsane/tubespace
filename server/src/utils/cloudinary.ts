import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import axios from 'axios';
import { cloudinaryConfig } from '../config';

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
  throw new Error("Cloudinary configuration is not set properly.");
}

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

const uploadToCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      folder: 'tubespace',
    })
    fs.unlinkSync(localFilePath);
    return response
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
}

interface VideoFileConfigs {
  fileSize: number;
  mimeType: string;
}

export const getVideoFileConfigs = async (videoUrl: string): Promise<VideoFileConfigs> => {
  if (!cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    throw new Error("Cloudinary API credentials are not set.");
  }
  const response = await axios.head(videoUrl);
  const contentLength = response.headers['content-length'];
  const mimeType = response.headers['content-type']?.split(";")[0]; 
  if (!contentLength || !mimeType) {
    throw new Error("invalid header in the video url response.");
  }

  const bytes = parseInt(contentLength, 10);
  return {
    fileSize: bytes,
    mimeType: mimeType
  }
}



export { uploadToCloudinary };