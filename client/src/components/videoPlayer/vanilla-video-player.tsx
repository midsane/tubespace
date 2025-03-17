
import { useEffect, useRef } from "react"

export default function VanillaVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create HTML structure
    container.innerHTML = `
  <div class="video-player">
    <video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" class="video-element"></video>
    
    <div class="video-title">
      <h2>Big Buck Bunny</h2>
    </div>
    
    <div class="play-overlay">
      <button class="play-button" aria-label="Play">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </button>
    </div>
    
    <div class="controls">
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
      
      <div class="controls-row">
        <div class="left-controls">
          <button class="control-button play-pause-btn" aria-label="Play">
            <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg class="pause-icon hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          
          <div class="volume-container">
            <button class="control-button volume-btn" aria-label="Mute">
              <svg class="volume-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
              <svg class="mute-icon hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            </button>
            <input type="range" class="volume-slider" min="0" max="1" step="0.01" value="1" aria-label="Volume">
          </div>
          
          <div class="time-display">0:00 / 0:00</div>
        </div>
        
        <div class="right-controls">
          <div class="speed-container">
            <button class="speed-toggle" aria-label="Playback Speed" aria-expanded="false">
              <span>1x</span>
              <svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="speed-menu hidden">
              <button class="speed-option" data-speed="0.5">0.5x</button>
              <button class="speed-option" data-speed="0.75">0.75x</button>
              <button class="speed-option selected" data-speed="1">1x</button>
              <button class="speed-option" data-speed="1.25">1.25x</button>
              <button class="speed-option" data-speed="1.5">1.5x</button>
              <button class="speed-option" data-speed="2">2x</button>
            </div>
          </div>
          
          <div class="quality-container">
            <button class="quality-toggle" aria-label="Video Quality" aria-expanded="false">
              <span>1080p</span>
              <svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="quality-menu hidden">
              <button class="quality-option selected" data-quality="1080p">1080p</button>
              <button class="quality-option" data-quality="720p">720p</button>
              <button class="quality-option" data-quality="480p">480p</button>
              <button class="quality-option" data-quality="360p">360p</button>
            </div>
          </div>
          
          <button class="control-button fullscreen-btn" aria-label="Enter Fullscreen">
            <svg class="maximize-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            <svg class="minimize-icon hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
`

    // Add styles
    const style = document.createElement("style")
    style.textContent = `
  .video-player {
    position: relative;
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16/9;
    background-color: #000;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .video-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
    transition: opacity 0.3s ease;
    z-index: 10;
  }

  .video-title h2 {
    color: white;
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .play-button {
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    border: none;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .play-button:hover {
    transform: scale(1.1);
    background-color: rgba(255, 255, 255, 0.2);
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    padding: 1rem;
    transition: opacity 0.3s ease;
    z-index: 10;
  }

  .progress-container {
    width: 100%;
    margin-bottom: 1rem;
  }

  .progress-bar {
    width: 100%;
    height: 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    border-radius: 9999px;
    width: 0%;
  }

  .controls-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left-controls, .right-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .control-button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 9999px;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .control-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .volume-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .volume-slider {
    width: 5rem;
    height: 0.25rem;
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    outline: none;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
  }

  .time-display {
    color: white;
    font-size: 0.875rem;
    min-width: 5rem;
  }

  .speed-container, .quality-container {
    position: relative;
  }

  .speed-toggle, .quality-toggle {
    background: transparent;
    border: none;
    color: white;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .speed-toggle:hover, .quality-toggle:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .speed-menu, .quality-menu {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 0.5rem;
    background-color: rgba(23, 23, 23, 0.95);
    backdrop-filter: blur(4px);
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    width: 6rem;
    z-index: 30;
  }

  .speed-option, .quality-option {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    color: white;
    font-size: 0.875rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .speed-option:hover, .quality-option:hover {
    background-color: rgba(75, 85, 99, 0.7);
  }

  .selected {
    background-color: #3b82f6;
    color: white;
  }

  .hidden {
    display: none;
  }

  @media (max-width: 640px) {
    .time-display, .speed-container, .quality-container {
      display: none;
    }
  }
`
    document.head.appendChild(style)

    // Get elements
    const video = container.querySelector(".video-element") as HTMLVideoElement
    const playOverlay = container.querySelector(".play-overlay") as HTMLDivElement
    const playButton = container.querySelector(".play-button") as HTMLButtonElement
    const playPauseBtn = container.querySelector(".play-pause-btn") as HTMLButtonElement
    const playIcon = container.querySelector(".play-icon") as SVGElement
    const pauseIcon = container.querySelector(".pause-icon") as SVGElement
    const volumeBtn = container.querySelector(".volume-btn") as HTMLButtonElement
    const volumeIcon = container.querySelector(".volume-icon") as SVGElement
    const muteIcon = container.querySelector(".mute-icon") as SVGElement
    const volumeSlider = container.querySelector(".volume-slider") as HTMLInputElement
    const progressBar = container.querySelector(".progress-bar") as HTMLDivElement
    const progressFill = container.querySelector(".progress-fill") as HTMLDivElement
    const timeDisplay = container.querySelector(".time-display") as HTMLDivElement
    const fullscreenBtn = container.querySelector(".fullscreen-btn") as HTMLButtonElement
    const maximizeIcon = container.querySelector(".maximize-icon") as SVGElement
    const minimizeIcon = container.querySelector(".minimize-icon") as SVGElement
    const speedToggle = container.querySelector(".speed-toggle") as HTMLButtonElement
    const speedMenu = container.querySelector(".speed-menu") as HTMLDivElement
    const speedOptions = container.querySelectorAll(".speed-option") as NodeListOf<HTMLButtonElement>
    const qualityToggle = container.querySelector(".quality-toggle") as HTMLButtonElement
    const qualityMenu = container.querySelector(".quality-menu") as HTMLDivElement
    const qualityOptions = container.querySelectorAll(".quality-option") as NodeListOf<HTMLButtonElement>
    const videoTitle = container.querySelector(".video-title") as HTMLDivElement
    const controls = container.querySelector(".controls") as HTMLDivElement

    let controlsTimeout: number | null = null
    let isPlaying = false
    let isMuted = false
    let isFullscreen = false

    // Format time (convert seconds to MM:SS format)
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    // Update progress bar
    const updateProgress = () => {
      if (!video.duration) return
      const progress = (video.currentTime / video.duration) * 100
      progressFill.style.width = `${progress}%`
      timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`
    }

    // Toggle play/pause
    const togglePlay = () => {
      if (isPlaying) {
        video.pause()
        isPlaying = false
        playIcon.classList.remove("hidden")
        pauseIcon.classList.add("hidden")
        playOverlay.classList.remove("hidden")
      } else {
        video.play()
        isPlaying = true
        playIcon.classList.add("hidden")
        pauseIcon.classList.remove("hidden")
        playOverlay.classList.add("hidden")
      }
    }

    // Toggle mute
    const toggleMute = () => {
      if (isMuted) {
        video.muted = false
        isMuted = false
        video.volume = Number.parseFloat(volumeSlider.value)
        volumeIcon.classList.remove("hidden")
        muteIcon.classList.add("hidden")
      } else {
        video.muted = true
        isMuted = true
        volumeIcon.classList.add("hidden")
        muteIcon.classList.remove("hidden")
      }
    }

    // Toggle fullscreen
    const toggleFullscreen = () => {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          container.requestFullscreen()
        }
        isFullscreen = true
        maximizeIcon.classList.add("hidden")
        minimizeIcon.classList.remove("hidden")
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
        isFullscreen = false
        maximizeIcon.classList.remove("hidden")
        minimizeIcon.classList.add("hidden")
      }
    }

    // Show/hide controls based on mouse movement
    const showControls = () => {
      videoTitle.style.opacity = "1"
      controls.style.opacity = "1"

      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }

      if (isPlaying) {
        controlsTimeout = window.setTimeout(() => {
          videoTitle.style.opacity = "0"
          controls.style.opacity = "0"
        }, 3000)
      }
    }

    // Event listeners
    video.addEventListener("timeupdate", updateProgress)

    video.addEventListener("loadedmetadata", () => {
      timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`
    })

    video.addEventListener("ended", () => {
      isPlaying = false
      playIcon.classList.remove("hidden")
      pauseIcon.classList.add("hidden")
      playOverlay.classList.remove("hidden")
    })

    playButton.addEventListener("click", togglePlay)
    playPauseBtn.addEventListener("click", togglePlay)
    video.addEventListener("click", togglePlay)

    volumeBtn.addEventListener("click", toggleMute)

    volumeSlider.addEventListener("input", () => {
      video.volume = Number.parseFloat(volumeSlider.value)
      if (video.volume === 0) {
        volumeIcon.classList.add("hidden")
        muteIcon.classList.remove("hidden")
        isMuted = true
      } else {
        volumeIcon.classList.remove("hidden")
        muteIcon.classList.add("hidden")
        isMuted = false
      }
    })

    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      video.currentTime = pos * video.duration
    })

    fullscreenBtn.addEventListener("click", toggleFullscreen)

    // Speed menu
    speedToggle.addEventListener("click", () => {
      speedMenu.classList.toggle("hidden")
      qualityMenu.classList.add("hidden")
    })

    speedOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const speed = Number.parseFloat(option.dataset.speed || "1")
        video.playbackRate = speed
        speedToggle.querySelector("span")!.textContent = `${speed}x`

        speedOptions.forEach((opt) => opt.classList.remove("selected"))
        option.classList.add("selected")

        speedMenu.classList.add("hidden")
      })
    })

    // Quality menu
    qualityToggle.addEventListener("click", () => {
      qualityMenu.classList.toggle("hidden")
      speedMenu.classList.add("hidden")
    })

    qualityOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const quality = option.dataset.quality || "1080p"
        qualityToggle.querySelector("span")!.textContent = quality

        qualityOptions.forEach((opt) => opt.classList.remove("selected"))
        option.classList.add("selected")

        qualityMenu.classList.add("hidden")

        // In a real implementation, you would switch video sources here
        console.log(`Quality changed to ${quality}`)
      })
    })

    // Show/hide controls on mouse movement
    container.addEventListener("mousemove", showControls)
    container.addEventListener("mouseleave", () => {
      if (isPlaying) {
        videoTitle.style.opacity = "0"
        controls.style.opacity = "0"
      }
    })

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        togglePlay()
        e.preventDefault()
      } else if (e.code === "ArrowRight") {
        video.currentTime = Math.min(video.currentTime + 10, video.duration)
      } else if (e.code === "ArrowLeft") {
        video.currentTime = Math.max(video.currentTime - 10, 0)
      } else if (e.code === "KeyM") {
        toggleMute()
      } else if (e.code === "KeyF") {
        toggleFullscreen()
      }
    })

    // Close menus when clicking outside
    document.addEventListener("click", (e) => {
      if (!speedToggle.contains(e.target as Node) && !speedMenu.contains(e.target as Node)) {
        speedMenu.classList.add("hidden")
      }
      if (!qualityToggle.contains(e.target as Node) && !qualityMenu.contains(e.target as Node)) {
        qualityMenu.classList.add("hidden")
      }
    })

    return () => {
      // Clean up event listeners
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full max-w-4xl mx-auto"></div>
}

