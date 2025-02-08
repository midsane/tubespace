interface CircularProgressBarProps {
  progress: number
  size?: number
  strokeWidth?: number
  gradientStart?: string
  gradientEnd?: string
  backgroundColor?: string
  textColor?: string
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 200,
  strokeWidth = 16,
  gradientStart = "#3b82f6",
  gradientEnd = "#10b981",
  backgroundColor = "#e5e7eb",
  textColor = "#1f2937",
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }}
      >
        <span className="text-lg font-bold" style={{ color: textColor }}>
          {`${Math.round(progress)}%`}
        </span>
      </div>
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, ${gradientStart}20 0%, transparent 70%)`,
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
    </div>
  )
}

