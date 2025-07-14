import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion";
import { baseUrl, googleIcon, logo } from "@/constast";
import { LoadingTitle } from "@/components/loadingUI/loadingTitle";
import { useUploadVideo } from "@/store/uploadVideo.store";
import { toast } from "sonner";
import axios from "axios";

export function YtOAuthPage() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const taskId = useUploadVideo((state) => state.taskId);
    const navigate = useNavigate()
    console.log("code", code);
    console.log("taskId", taskId);

    useEffect(() => {

        if (!code) {
            toast.error("no code was provided");
            return;
        }
        if (!taskId) {
            toast.error("no taskId was provided");
            return;
        }

        const startVideoUploadSession = async () => {
            console.log("first");
            const response = await axios.post(`${baseUrl}yt-upload/start-session`, {
                code,
                taskId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log("response", response);

            if (response.status === 200) {
                toast.success("Successfully started video upload session");
                navigate(`/check-progress/${taskId}`);
            } else {
                toast.error("Failed to start video upload session");
            }

        }

        try {
            startVideoUploadSession();
        }
        catch (error) {
            console.error("Error during OAuth login/register:", error);
            alert("Failed to login/register with OAuth. Please try again.");

        }

    }, [code, taskId])

    return (
        <div className="h-dvh w-full bg mix-blend-hard bg-background
        bg-[radial-gradient(circle_at_center,theme(colors.chart-bg)_10%,transparent_80%)] flex items-center justify-center">
            <div className="flex
        flex-col gap-10 items-center justify-center h-dvh" >

                <div className="flex gap-2 justify-center items-center">
                    <motion.img
                        initial={{ opacity: 0, rotate: 30 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        alt="TubeSpace Logo"
                        className="h-20" src={logo} />
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl font-bold text-balance">TubeSpace</motion.h1>
                </div>
                <div className="flex flex-col w-screen px-5 justify-center text-center items-center gap-5" >
                    Starting an upload session for your youtube video using google Oauth... <img className="shadow-border w-10 shadow-2xl" src={googleIcon} />
                    <LoadingTitle />

                </div>

            </div>
        </div>
    )

}



