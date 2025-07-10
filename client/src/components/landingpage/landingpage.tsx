import Footer from "./footer"
import gif from "@/assets/form.gif"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion";
import "./style.css"
import { Globe } from "lucide-react";
import { GetStartedButton } from "./getStartedButton";
import { logo } from "@/constast";
export const LandingPage = () => {

    return (<div className="flex overflow-hidden w-full flex-col bg mix-blend-hard bg-background
        bg-[radial-gradient(circle_at_center,theme(colors.chart-bg)_20%,transparent_90%)]">
        <div className="flex
        flex-col gap-10 items-center justify-center h-dvh" >
            <Badge
                variant="outline"
                className="border border-chart-4/60 py-1 px-5 bg-background/10 rounded-3xl"
            >
                <Globe className="text-chart-3" />
                <p className="text-muted-foreground text-sm" >Tubespace.midsane.tech</p>
            </Badge>
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
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="scroll-m-20 text-foreground/80 text-center text-lg sm:text-xl md:text-3xl font-semibold tracking-tight text-balance">
                Upload once. Review and publish to YouTube. No re-uploads, no internet waste.
            </motion.h1>
            <GetStartedButton />
        </div>

        <HowToUseSections
            title="Create Task / Assign Editor"
            imgPath={gif}
            text="Fill out Video details like title, description, tags, and thumbnail before assigning editing task to someone or fill it out before uploading the video."
        />

        {/* <HowToUseSections
            title="Get Notified When Task is Completed"
            imgPath={gif}
            text="Fill out Video details like title, description, tags, and thumbnail before assigning editing task to someone or fill it out before uploading the video."
        />

          <HowToUseSections
            title="Preview and Publish"
            imgPath={gif}
            text="Fill out Video details like title, description, tags, and thumbnail before assigning editing task to someone or fill it out before uploading the video."
        /> */}

        <div className="flex flex-col gap-4 border items-center justify-center h-dvh" >
            <div className="hidden md:flex h-3/4  flex-col justify-center items-center gap-10" >
                <h1 className="scroll-m-20 text-center text-xl md:text-3xl font-extrabold tracking-tight text-balance">
                    What are you waiting for?
                </h1>
                <GetStartedButton />
            </div>
            <Footer />
        </div>
    </div>)
}

const HowToUseSections = ({ imgPath, title, text }: { imgPath: string, title: string, text: string }) => {
    return (<div className="flex flex-col gap-4  items-center justify-center h-dvh" >
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {title}
        </h4>
        <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[90%] md:h-[60%] rounded-2xl border " src={imgPath} />
        <p className="leading-7  max-w-[90%] md:max-w-1/2 [&:not(:first-child)]:mt-6">
            F{text}
        </p>
    </div>)
}

