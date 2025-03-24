import { Avatar, Chip } from "@mui/material";
import { Edit, FolderLock } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { storeDispatchType } from "../store/store";
import { youtuberActions } from "../store/youtuberStore/youtuber.slice";
import { ACCOUNT_TYPE } from "../types/youtuberTypes";

export const ProfileImageUploader: React.FC<{
    setNewProfilepicFile: (pfp: File) => void,
    accountType: ACCOUNT_TYPE | undefined,
    imgUrl: string | null | undefined
}> = ({ imgUrl, accountType, setNewProfilepicFile }) => {

    const [currentImage, setCurrentImage] = useState<string>(imgUrl ? imgUrl : "");

    const dispatch: storeDispatchType = useDispatch()
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedImg = e.target.files?.[0];
        if (uploadedImg) {
            const imageUrl = URL.createObjectURL(uploadedImg);
            setCurrentImage(imageUrl);
            setNewProfilepicFile(uploadedImg);
            dispatch(youtuberActions.updateUserInfo({ profilepic: imageUrl }))
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
                {imgUrl === "" ? <></>
                    :
                    <Avatar
                        className="w-20 group-hover:opacity-55 h-20"
                        src={currentImage}
                        sx={{ width: "4rem", height: "4rem" }}
                    />}

                <div className="absolute right-[-60%] bottom-0">
                    <Chip
                        icon={<FolderLock size={15} />}
                        className="z-40 p-1 rounded-lg"
                        label={accountType} size="small" variant="filled" color={accountType === ACCOUNT_TYPE.PUBLIC ? "info" : "secondary"} />

                </div>

                <Edit
                    className="absolute opacity-0 group-hover:opacity-100 transition bg-primary text-accent p-1 rounded-lg"
                    size={32}
                />
            </div>

        </div>
    );
};
