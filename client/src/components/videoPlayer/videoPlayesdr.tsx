// import { useEffect, useRef, useState } from "react"
// import {
//     Play,
//     Pause,
//     Volume2,
//     VolumeX,
//     SkipBack,
//     SkipForward,
//     Download,
//     Settings,
//     Maximize,
//     Minimize,
// } from "lucide-react"

// import ReactPlayer from 'react-player/lazy'
// import cloudinary from 'cloudinary-video-player';
// // Also possible:
// // import { videoPlayer } from 'cloudinary-video-player';
// import 'cloudinary-video-player/cld-video-player.min.css';




// export default function VideoPlayer({ videoUrl }: { videoUrl: string }) {
//     const videoRef = useRef<HTMLVideoElement>(null)
//     const progressRef = useRef<HTMLDivElement>(null)
//     const [isPlaying, setIsPlaying] = useState(false)
//     const [volume, setVolume] = useState(1)
//     const [isMuted, setIsMuted] = useState(false)
//     const [currentTime, setCurrentTime] = useState(0)
//     const [duration, setDuration] = useState(0)
//     const [isFullscreen, setIsFullscreen] = useState(false)
//     const [showSettings, setShowSettings] = useState(false)
//     const [playbackSpeed, setPlaybackSpeed] = useState(1)
//     const [currentQuality, setCurrentQuality] = useState("720p")


//     const videoQuality: { [key: string]: string } = {
//         "Auto": "q_auto",/         "360p": "q_30",
//         "480p": "q_50",
//         "720p": "q_70",
//         "1080p": "q_90"
//     }


//     const getVideoUrl = (baseUrl: string, quality: string): string => {

//         const urlArr = baseUrl.split("/");
//         console.log(baseUrl)
//         if (urlArr.length < 7) {
//             throw new Error("Invalid base URL");
//         }

//         const prefix = urlArr.slice(0, 6).join("/") + "/";
//         const qualityParam = videoQuality[quality as keyof typeof videoQuality] ?? videoQuality["Auto"];
//         const suffix = urlArr.slice(6).join("/");
//         console.log(`${prefix}${qualityParam}/${suffix}`);

//         return `${prefix}${qualityParam}/${suffix}`;
//     };

//     useEffect(() => {
//         const video = videoRef.current
//         if (!video) return

//         const updateTime = () => {
//             setCurrentTime(video.currentTime)
//             setDuration(video.duration)
//         }

//         video.addEventListener("timeupdate", updateTime)
//         video.addEventListener("loadedmetadata", updateTime)

//         return () => {
//             video.removeEventListener("timeupdate", updateTime)
//             video.removeEventListener("loadedmetadata", updateTime)
//         }
//     }, [])


//     useEffect(() => {
//         const video = videoRef.current
//         if (!video) return

//         const handlePlay = () => setIsPlaying(true)
//         const handlePause = () => setIsPlaying(false)

//         video.addEventListener("play", handlePlay)
//         video.addEventListener("pause", handlePause)

//         return () => {
//             video.removeEventListener("play", handlePlay)
//             video.removeEventListener("pause", handlePause)
//         }
//     }, [])


//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             setIsFullscreen(!!document.fullscreenElement)
//         }

//         document.addEventListener("fullscreenchange", handleFullscreenChange)

//         return () => {
//             document.removeEventListener("fullscreenchange", handleFullscreenChange)
//         }
//     }, [])

//     const playVideo = () => {
//         videoRef.current?.play()
//         setIsPlaying(true)
//     }

//     const pauseVideo = () => {
//         videoRef.current?.pause()
//         setIsPlaying(false)
//     }

//     const togglePlay = () => {
//         if (isPlaying) {
//             pauseVideo()
//         } else {
//             playVideo()
//         }
//     }

//     const skipForward = () => {
//         if (videoRef.current) {
//             videoRef.current.currentTime += 10
//         }
//     }

//     const skipBackward = () => {
//         if (videoRef.current) {
//             videoRef.current.currentTime -= 10
//         }
//     }

//     const adjustVolume = (value: number) => {
//         if (videoRef.current) {
//             videoRef.current.volume = value
//             setVolume(value)
//             if (value === 0) {
//                 setIsMuted(true)
//             } else {
//                 setIsMuted(false)
//             }
//         }
//     }

//     const toggleMute = () => {
//         if (videoRef.current) {
//             videoRef.current.muted = !isMuted
//             setIsMuted(!isMuted)
//         }
//     }

//     const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
//         const progressBar = progressRef.current
//         if (!progressBar || !videoRef.current) return

//         const position = e.nativeEvent.offsetX
//         const totalWidth = progressBar.offsetWidth
//         const percentage = position / totalWidth

//         videoRef.current.currentTime = percentage * videoRef.current.duration
//     }


//     const toggleFullscreen = () => {
//         const videoContainer = document.getElementById("video-container")

//         if (!document.fullscreenElement) {
//             videoContainer?.requestFullscreen().catch((err) => {
//                 console.error(`Error attempting to enable fullscreen: ${err.message}`)
//             })
//         } else {
//             document.exitFullscreen()
//         }
//     }

//     const changePlaybackSpeed = (speed: number) => {
//         if (videoRef.current) {
//             videoRef.current.playbackRate = speed
//             setPlaybackSpeed(speed)
//             setShowSettings(false)
//         }
//     }

//     const changeQuality = (quality: string) => {
//         if (videoRef.current) {
//             const currentTime = videoRef.current.currentTime
//             const wasPlaying = !videoRef.current.paused

//             setCurrentQuality(quality)

//             setTimeout(() => {
//                 if (videoRef.current) {
//                     videoRef.current.currentTime = currentTime
//                     if (wasPlaying) {
//                         videoRef.current.play()
//                     }
//                 }
//             }, 100)
//         }
//         setShowSettings(false)
//     }

//     const downloadVideo = () => {
//         const link = document.createElement("a")
//         // link.href = videoSources[currentQuality as keyof typeof videoSources]
//         // link.download = `video-${currentQuality}.mp4`
//         // document.body.appendChild(link)
//         // link.click()
//         // document.body.removeChild(link)
//     }

//     const formatTime = (time: number) => {
//         const minutes = Math.floor(time / 60)
//         const seconds = Math.floor(time % 60)
//         return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//     }

//     return(
//         <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
//     )

// }

