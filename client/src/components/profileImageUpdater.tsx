import { Avatar } from "@mui/material";
import { Edit } from "lucide-react";
import React, { useState } from "react";

export const ProfileImageUploader: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
    const [currentImage, setCurrentImage] = useState<string>(imgUrl);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedImg = e.target.files?.[0];
        if (uploadedImg) {
            const imageUrl = URL.createObjectURL(uploadedImg);
            setCurrentImage(imageUrl);
        }
    }
    return (
        <div className="relative w-[4rem] sm:w-[4.5rem] aspect-square group">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full z-30 h-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center border border-dashed rounded-full transition">
                <Avatar
                    className="w-20 group-hover:opacity-55 h-20"
                    src={currentImage}
                    sx={{ width: "4rem", height: "4rem" }}
                />
                <Edit
                    className="absolute opacity-0 group-hover:opacity-100 transition bg-primary text-accent p-1 rounded-lg"
                    size={32}
                />
            </div>
        </div>
    );
};
