import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function ScoreRing({
  score,
  size = 180,
  strokeWidth = 12,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "oklch(0.72 0.17 155)";
    if (s >= 60) return "oklch(0.78 0.18 80)";
    if (s >= 40) return "oklch(0.7 0.2 50)";
    return "oklch(0.63 0.24 25)";
  };

  const getLabel = (s: number) => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    if (s >= 40) return "Fair";
    return "Needs Work";
  };

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1500;
    const to = score;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayScore(Math.round(to * eased));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current !== null)
        cancelAnimationFrame(animFrameRef.current);
    };
  }, [score]);

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{ boxShadow: `0 0 40px ${color}` }}
        />
        {/* Background track */}
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          role="img"
          aria-label={`Resume score: ${displayScore} out of 100`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(0.22 0.04 275)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            transition={{ duration: 0.05 }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-bold" style={{ color }}>
            {displayScore}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            / 100
          </span>
        </div>
      </div>
      <div
        className="font-display text-sm font-semibold px-3 py-1 rounded-full"
        style={{ background: `${color}22`, color }}
      >
        {getLabel(score)}
      </div>
    </div>
  );
}
