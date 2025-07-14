export const DownloadImgFromCloudinaryUrl = (url: string): string => {
    const cloudinaryBaseUrl = "https://res.cloudinary.com/your-cloud-name/image/upload/";
    const publicId = url.split("/").pop()?.split(".")[0]; // Extract public ID from URL
    if (!publicId) {
        throw new Error("Invalid Cloudinary URL");
    }
    return `${cloudinaryBaseUrl}${publicId}.jpg`; // Assuming the image is in JPG format
}