import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import axios from 'axios';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary API credentials are not set.");
  }
  const response = await axios.head(videoUrl);
  const contentLength = response.headers['content-length'];
  const mimeType = response.headers['content-type']
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