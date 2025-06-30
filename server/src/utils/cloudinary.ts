// utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string, mimetype: string) => {
  const result = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: filename },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    ).end(fileBuffer);
  });

  return result;
};
