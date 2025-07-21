import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import path from "path"
import fs from "fs";
export const DownloadImgFromCloudinaryUrl: (url: string) => Promise<string> = async (url: string) => {
    const extension = path.extname(url)
    const endpoint = uuidv4() + extension;
    const rootDir = path.resolve(__dirname, "../../../")
    const tempDir = path.join(rootDir, "public", "temp")

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }


    const filePath = path.join(tempDir, endpoint);

    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
    })
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(filePath))
        writer.on("error", (err) => reject(err));
    });
}