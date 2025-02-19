
import { Button } from "@mui/material"
import { Play } from "lucide-react"
import { ShineBorder } from "../ui/shineboard"
import { InteractiveGrid } from "../ui/interactivegrid"
import { SplitText } from "../textAnimations/splitText"

export function HeroSection() {
    return (
        <section className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-black">
            <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />

            <ShineBorder
                className="relative z-10 max-w-6xl mx-auto px-6"
                borderClassName="border border-white/10 rounded-xl overflow-hidden"
            >
                <div className="text-center pt-4 mb-16">
                    <h1 className="max-[400px]:text-3xl text-4xl text-white md:text-6xl font-bold mb-6 tracking-tight">
                        streamlining your Youtube workflow with
                    </h1>
                    <h1 className="text-4xl max-[400px]:text-3xl bg-clip-text text-transparent font-bold mb-6 tracking-tight 
                     md:text-6xl animate-gradient bg-[length:200%_200%] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        Review and automated uploading
                    </h1>
                    <SplitText
                        text={"assign work -> review -> confirm for uploading"}
                        className="text-gray-400 max-[400px]:text-sm text-lg mb-8 max-w-2xl mx-auto"
                        delay={50}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        threshold={0.1}
                        rootMargin="-50px"
                    />
                    <div className="flex gap-4 mt-4 justify-center">
                        <Button variant="outlined" className="gap-2 border-white/10 bg-white/5 hover:bg-white/10">
                            <Play className="w-4 h-4" />
                            Enter
                        </Button>
                        <Button variant="outlined" className="bg-white text-black hover:bg-label">
                            see pricing
                        </Button>
                    </div>
                </div>

                <ShineBorder className="relative mx-auto" borderClassName="border border-white/10 rounded-xl overflow-hidden">
                    <div className="relative">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20image.jpg-mE5vAT4d864MlVhdkcrk1Vn2WcNONq.jpeg"
                            alt="Background Gradient"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 flex items-end justify-center pb-16">
                            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl w-[90%] h-[70%] flex">
                                <div className="flex-1 pr-2">
                                    <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Browser-HZNDOssbyLixIa4lABR27yelWXveQ0.png"
                                        alt="Browser Preview"
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Editor%20Window-sJ4sXlXpgDhv7gLvQylqH5VTb3L0rc.png"
                                        alt="Code Editor"
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ShineBorder>
            </ShineBorder>
        </section>
    )
}
