import { NotificationCard } from "./notificationCard"

const dummyNotifications = [
    {
        title: "",
        description: `  editor lavru has ediited the video, go to this link to 
        preview and upload your video to youtube. You have 
        10 hours to do this, after that link will expire, and you
        will need to ask your editor to reupload the video.
        http://baseurl;/preview/video=8kdfj  `,
        read: false,
        userPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        userId: 12,
        time: +new Date("2023-10-01T12:00:00Z")

    },
    {
        title: "",
        description: `video pushed to editor lavru has been deleted from our
        server, ask him too upload again, make sure review and
        upload before the expriy time .  `,
        read: false,
        userPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        userId: 12,
        time: +new Date("2023-10-01T12:00:00Z")

    },
    {
        title: "",
        description: `  editor lavru has ediited the video, go to this link to 
        preview and upload your video to youtube.
        http://baseurl;/preview/video=8kdfj `,
        read: true,
        time: +new Date("2023-10-01T12:00:00Z")

    },
    {
        title: "",
        description: `  youtube adi has assigned you a task . check it out.
        http://baseurl/task  `,
        read: true,
        time: +new Date("2023-10-01T12:00:00Z")

    },
    {
        title: "",
        description: `  youtuber adi rejected your video saying --
        make better b-rolls and color grading. `,
        read: true,
        userPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        userId: 12,
        time: +new Date("2023-10-01T12:00:00Z")

    },
    {
        title: "",
        description: `your video got successfully uploaded to youtube.
        check it out. http:lkalasdkfj `,
        read: true,
        time: +new Date("2023-10-01T12:00:00Z")

    }
]

export const LeftContent = () => {
    return (<div className="h-full  w-full flex flex-col justify-center items-center " >
        <div className="flex h-full py-5 items-center w-full flex-col gap-5 overflow-y-scroll">
            {dummyNotifications.map((notification, index) => (
                <NotificationCard
                    key={index}
                    {...notification}
                />
            ))}
        </div>

    </div>)
}






