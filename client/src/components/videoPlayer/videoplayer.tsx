
import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronDown } from "lucide-react"
import { Button } from "@mui/material"

export const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)
    const seekBarRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const [showQualityMenu, setShowQualityMenu] = useState(false)
    const [showSpeedMenu, setShowSpeedMenu] = useState(false)
    const [selectedQuality, setSelectedQuality] = useState("1080p")
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [isControlsVisible, setIsControlsVisible] = useState(true)
    const controlsTimeoutRef = useRef<any>(null)

    console.log(videoUrl)

    const videoQuality: { [key: string]: string } = {
        "Auto": "q_auto",
        "360p": "q_30",
        "480p": "q_50",
        "720p": "q_70",
        "1080p": "q_90"
    }

    const qualities = ["Auto", "360p", "480p", "720p", "1080p"]


    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime)
        }

        const handleLoadedMetadata = () => {
            setDuration(video.duration)
        }

        const handleEnded = () => {
            setIsPlaying(false)
        }

        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("loadedmetadata", handleLoadedMetadata)
        video.addEventListener("ended", handleEnded)

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
            video.removeEventListener("ended", handleEnded)
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                togglePlay()
                e.preventDefault()
            } else if (e.code === "ArrowRight") {
                skip(10)
            } else if (e.code === "ArrowLeft") {
                skip(-10)
            } else if (e.code === "KeyM") {
                toggleMute()
            } else if (e.code === "KeyF") {
                toggleFullscreen()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isPlaying) {
            video.play()
        } else {
            video.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.volume = isMuted ? 0 : volume
    }, [volume, isMuted])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.playbackRate = playbackSpeed
    }, [playbackSpeed])

    useEffect(() => {
        const handleMouseMove = () => {
            setIsControlsVisible(true)

            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
            }

            if (isPlaying) {
                controlsTimeoutRef.current = setTimeout(() => {
                    setIsControlsVisible(false)
                }, 3000)
            }
        }

        const player = playerRef.current
        if (player) {
            player.addEventListener("mousemove", handleMouseMove)
            player.addEventListener("mouseleave", () => {
                if (isPlaying) {
                    setIsControlsVisible(false)
                }
            })
        }

        return () => {
            if (player) {
                player.removeEventListener("mousemove", handleMouseMove)
            }
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
            }
        }
    }, [isPlaying])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number.parseFloat(e.target.value)
        setVolume(newVolume)
        if (newVolume === 0) {
            setIsMuted(true)
        } else {
            setIsMuted(false)
        }
    }


    const getVideoUrl = (baseUrl: string, quality: string): string => {
        console.log(baseUrl)
        const urlArr = baseUrl.split("/");
        console.log(baseUrl)
        if (urlArr.length < 7) {
            throw new Error("Invalid base URL");
        }

        const prefix = urlArr.slice(0, 6).join("/") + "/";
        const qualityParam = videoQuality[quality as keyof typeof videoQuality] ?? videoQuality["Auto"];
        const suffix = urlArr.slice(6).join("/");
        console.log(`${prefix}${qualityParam}/${suffix}`);

        return `${prefix}${qualityParam}/${suffix}`;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const handleSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const seekBar = seekBarRef.current
        const video = videoRef.current
        if (!seekBar || !video) return

        const rect = seekBar.getBoundingClientRect()
        const position = (e.clientX - rect.left) / rect.width
        video.currentTime = position * video.duration
    }

    const toggleFullscreen = () => {
        const player = playerRef.current
        if (!player) return

        if (!document.fullscreenElement) {
            player
                .requestFullscreen()
                .then(() => {
                    setIsFullscreen(true)
                })
                .catch((err) => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`)
                })
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false)
            })
        }
    }

    const skip = (seconds: number) => {
        const video = videoRef.current
        if (!video) return

        video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration)
    }

    const handleQualityChange = (quality: string) => {
        setSelectedQuality(quality)
        setShowQualityMenu(false)

    }

    const handleSpeedChange = (speed: number) => {
        setPlaybackSpeed(speed)
        setShowSpeedMenu(false)
    }

    return (
        <div
            ref={playerRef}
            className="relative w-full  max-[  mx-auto overflow-hidden rounded-lg bg-black aspect-video group"
            onMouseEnter={() => setIsControlsVisible(true)}
        >
            <video
                ref={videoRef}
                className="w-full h-full"
                src={getVideoUrl(videoUrl, selectedQuality)}
                onClick={togglePlay}
                playsInline
            />



            {/* Play/Pause Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white transition-transform hover:scale-110"
                        aria-label="Play"
                    >
                        <Play size={36} className="ml-2" />
                    </button>
                </div>
            )}

            {/* Controls */}
            <div
                className={`absolute bottom-0 left-0 right-0  bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
            >
                {/* Progress Bar */}
                <div
                    ref={seekBarRef}
                    className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer relative overflow-hidden"
                    onClick={handleSeekBarClick}
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                <div className="flex  items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Play/Pause Button */}
                        <Button
                            // variant="ghost"
                            // size="icon"
                            onClick={togglePlay}
                            className="text-white w-fit h-fit p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            {isPlaying ? <Pause className="h-4 w-4 sm:h-6 sm:w-6" /> : <Play className="h-4 w-4 sm:h-6 sm:w-6" />}
                            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                        </Button>

                        {/* Volume Control */}
                        <div className="flex items-center ">
                            <Button
                                // variant="ghost"
                                // size="icon"
                                onClick={toggleMute}
                                className="text-white hover:bg-white/20 rounded-full transition-colors"
                            >
                                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 sm:h-6 sm:w-6" /> : <Volume2 className="h-4 w-4 sm:h-6 sm:w-6" />}
                                <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                            </Button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 md:w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                aria-label="Volume"
                            />
                        </div>

                        {/* Time Display */}
                        <div className="text-white text-sm hidden sm:block">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 ">
                        {/* Playback Speed */}
                        <div className="relative">
                            <Button
                                // variant="ghost"
                                // size="sm"
                                className="text-white hover:bg-white/20 text-xs transition-colors rounded-md"
                                onClick={() => {
                                    setShowSpeedMenu(!showSpeedMenu)
                                    setShowQualityMenu(false)

                                }}
                            >
                                {playbackSpeed}x
                                <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                            {showSpeedMenu && (
                                <div className="absolute bottom-full mb-2 right-0 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg p-2 w-24">
                                    {speeds.map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => handleSpeedChange(speed)}
                                            className={`block w-full text-left px-3 py-1 text-sm rounded ${playbackSpeed === speed ? "bg-blue-600 text-white" : "text-white hover:bg-gray-700"}`}
                                        >
                                            {speed}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quality Selection */}
                        <div className="relative">
                            <Button
                                // variant="ghost"
                                // size="sm"
                                className="text-white hover:bg-white/20 text-xs transition-colors rounded-md hidden sm:flex"
                                onClick={() => {
                                    setShowQualityMenu(!showQualityMenu)
                                    setShowSpeedMenu(false)

                                }}
                            >
                                {selectedQuality}
                                <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                            {showQualityMenu && (
                                <div className="absolute bottom-full mb-2 right-0 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg p-2 w-24">
                                    {qualities.map((quality) => (
                                        <button
                                            key={quality}
                                            onClick={() => handleQualityChange(quality)}
                                            className={`block w-full text-left px-3 py-1 text-sm rounded ${selectedQuality === quality ? "bg-blue-600 text-white" : "text-white hover:bg-gray-700"}`}
                                        >
                                            {quality}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fullscreen Toggle */}
                        <Button
                            // variant="ghost"
                            // size="icon"
                            onClick={toggleFullscreen}
                            className="text-white hover:bg-white/20 rounded-full transition-colors"
                        >
                            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                            <span className="sr-only">{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

