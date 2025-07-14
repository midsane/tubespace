import multer from "multer";
import { randomUUID } from "crypto";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${randomUUID()}}${path.extname(file.originalname)}`);
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});