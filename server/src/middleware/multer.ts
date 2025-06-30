import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // buffer for Cloudinary upload
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});
