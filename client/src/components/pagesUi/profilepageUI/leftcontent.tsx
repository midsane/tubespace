import { Button } from "@/components/ui/button"
import { EditIcon, LinkIcon, MessageCircleIcon, StickyNote, VideoIcon } from "lucide-react"
import { FullTextDialogView } from "../common/fullTextDialogView";
import { useFetch } from "@/hooks/useFetch";
import type { profileDataType } from "@/types/types";
import { getProfileData } from "@/httpfnc/user";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import fallback_profileImg from "@/assets/pfp.png"
import { useUserStore } from "@/store/user.store";

const CHAR_LIMIT = 200;
const fallback_bannerImg = "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const LeftContent = () => {

    const { username } = useParams();
    const { setState } = useUserStore((state) => state);
    if (!username) {
        return <div className="h-full w-full flex items-center justify-center">404</div>;
    }

    const fetchProfile = useCallback(() => {
        return getProfileData(username!);
    }, [username]);

    const { data, loading, error } = useFetch<profileDataType>(fetchProfile);

    useEffect(() => {
        if (data)
            setState(data);
    }, [data])

    if (loading) return <div className="h-full w-full flex items-center justify-center">Loading...</div>;
    if (error) return <div className="h-full w-full flex items-center justify-center text-red-500">{error}</div>;
    if (!data) return <div className="h-full w-full flex items-center justify-center">No Data Found</div>;

    const isBioLong = data.bio && data.bio?.length > CHAR_LIMIT;
    let truncatedBio = "No bio available!";
    truncatedBio = data.bio && (isBioLong ? data.bio.slice(0, CHAR_LIMIT) + "..." : data.bio) || truncatedBio;

    return <div className="h-full w-full" >
        <div className="w-full h-1/2 relative rounded-lg">
            <img
                className="w-full h-full border-b border-border object-cover"
                src={data.bannerImgUrl || fallback_bannerImg}>
            </img>
            <div className="absolute h-fit -bottom-0 translate-y-1/2 left-5  flex gap-2 items-center" >
                <img
                    className="h-24 rounded-full border border-border aspect-square object-cover "
                    src={data.profileImgUrl || fallback_profileImg}
                />
                <div className="mt-8 flex w-full" >
                    <h1>{data.name ? data.name : data.email}</h1>
                </div>
            </div>

            <div className="absolute h-fit -bottom-1 translate-y-[100%] right-5  flex gap-2 items-center" >
                {data.editable ?
                    <Button className="flex gap-2 w-full" >
                        <EditIcon />
                        <h1>Edit Profile</h1>
                    </Button>
                    :

                    <Button className="flex gap-2 w-full" >
                        <MessageCircleIcon />
                        <h1>chat</h1>
                    </Button>}
            </div>

        </div>

        <div className="w-[95%] m-auto flex flex-col gap-2 rounded-xl mt-14 py-5 px-10 bg-popover text-popover-foreground ">
            {truncatedBio}
            {isBioLong && <FullTextDialogView text={data.bio as string} />}
        </div>
        <br />

        <div className="px-10  flex flex-col gap-2">
            <div className="flex gap-2 opacity-80 items-center">
                <LinkIcon size={15} />
                <p>No Attached Link</p>
            </div>

            {(data.tasksCompleted || data.tasksCompleted === 0) && <div className="flex gap-2 opacity-80 items-center">
                <StickyNote size={15} />
                <p>{`Task completed: ${data.tasksCompleted}`}</p>
            </div>}

            {(data.videosUploaded || data.videosUploaded === 0) && <div className="flex gap-2 opacity-80 items-center">
                <VideoIcon size={15} />
                <p>{`Videos uploaded: ${data.videosUploaded}`}</p>
            </div>}

        </div>
    </div>
}