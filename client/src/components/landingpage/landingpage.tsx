import Footer from "./footer"
import editorUploadsVideo from "@/assets/editor-uploadVIdeo.mp4"
import notifiedVideo from "@/assets/notified.mp4"
import uploadRealTime from "@/assets/uploadWorkerRealTime.mp4"
import createTaskVideo from "@/assets/create-task.mp4"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion";
import "./style.css"
import { Flame } from "lucide-react";
import { GetStartedButton } from "./getStartedButton";
import { logo } from "@/constast";
import { GradientText, LandingPara } from "../text-animation/text-animations";


export const LandingPage = () => {
    return (<div className="flex justify-center items-center overflow-hidden w-full flex-col bg mix-blend-hard bg-background
        bg-[radial-gradient(circle_at_center,theme(colors.chart-bg)_20%,transparent_90%)]">
        <div className="flex
        flex-col gap-10 items-center justify-center h-screen" >
            <Badge
                variant="outline"
                className="border border-chart-4/60 py-1 px-5 bg-background/10 rounded-3xl"
            >
                <Flame fill="red" className="text-red-400" />
                <p className="text-muted-foreground  text-sm" >Tubespace.studio</p>
            </Badge>

            <div className="flex gap-1 sm:gap-2 justify-center items-center">
                <motion.img
                    initial={{ opacity: 0, rotate: 30 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    alt="TubeSpace Logo"
                    className="h-16 md:h-20" src={logo} />
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl font-bold text-balance">
                    <GradientText text="TubeSpace" />
                </motion.h1>
            </div>
            <LandingPara />
            <GetStartedButton />
        </div>

        {/* <div className="flex gap-4 py-5 sm:px-12 w-full max-w-[900px]">
            <div className="flex flex-col gap-2 w-[40%] ">
                <img src={gif} className="rounded-xl w-full border-accent border-2 shadow-2xl shadow-label h-72" />
                <h2>Scaling</h2>
                <SelectSeparator />
                <p>Focus on building applications with time and money-saving features like instant provisioning, autoscaling according to load, and scale to zero.</p>
            </div>
            <div className="flex flex-col gap-2 w-[60%] ">
                <img src={gif} className="rounded-xl  border-accent border-2 shadow-2xl shadow-label h-72 object-cover" />
                <h2>Scaling</h2>
                <SelectSeparator />
                <p>Focus on building applications with time and money-saving features like instant provisioning, autoscaling according to load, and scale to zero.</p>
            </div>
        </div> */}

        <HowToUseSections
            id="features"
            title="Create Task / Assign Editor"
            imgPath={createTaskVideo}
            text="Fill in video details such as title, work description, deadline, and attach files for the editor. Also provide YouTube-specific info like title, description, tags, and thumbnail — either before assigning the task or before uploading the video."
        />

        <HowToUseSections
            id="features"
            title="Editors uploads the video"
            imgPath={editorUploadsVideo}
            text="After editing, the video is uploaded to secure storage and made available for preview by the YouTuber."
        />

        <HowToUseSections
            title="Preview and Publish"
            imgPath={uploadRealTime}
            text="Preview your video with the assigned editor, make necessary changes, and publish it to your channel with just a few clicks."
        />

        <HowToUseSections
            title="RealTime notifications"
            imgPath={notifiedVideo}
            text="Get real-time notifications about task updates, and video status changes to stay informed and engaged with your projects."
        />

        <div className="flex flex-col gap-4 border items-center justify-center px-4 h-screen pt-20" >
            <div className="flex flex-col justify-center items-center gap-10" >
                <GradientText text="What are you Waiting For?" size="small" />
                <GetStartedButton />

            </div>
            <Footer />
        </div>
    </div>)
}

import arrowImg from "@/assets/arrow.gif"
const HowToUseSections = ({
    id,
    imgPath,
    title,
    text,
}: {
    id?: string;
    imgPath: string;
    title: string;
    text: string;
}) => {
    return (
        <div
            id={id}
            className="h-fit py-20 flex px-5 sm:px-20 justify-center items-center"
        >
            <div
                className="flex relative md:flex-row md:max-w-full max-[340px]:max-w-[95%] max-w-[400px] flex-col gap-4 sm:items-start items-center justify-center h-fit"
            >
                <motion.video
                    autoPlay
                    loop
                    muted
                    playsInline
                    initial={{ opacity: 0.5, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-[340px]:max-w-[90%] max-w-[350px] lg:max-w-[600px] rounded-2xl border"
                    src={imgPath}
                />

                <img
                    className="absolute -scale-y-100 -scale-x-100 left-0 -top-5 sm:-top-8 transform -translate-y-1/2 w-8 sm:w-12 flip"
                    src={arrowImg}
                />

                <div className="flex px-2 flex-col gap-2 justify-start items-start sm:w-[80%] md:w-[70%] h-full">
                    <h1 className="text-lg md:text-2xl font-semibold">{title}</h1>

                    <motion.div
                        className="w-full h-[2px] bg-foreground/30"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.5 }} 
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ originX: 0 }}
                    />

                    <p className="leading-7 lg:text-lg text-md text-accent-foreground [&:not(:first-child)]:mt-1">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};



