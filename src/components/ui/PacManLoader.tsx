"use client";

import { cn } from "@/lib/utils";

interface PacManLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { pac: "w-5 h-5", dot: "w-1.5 h-1.5", gap: "gap-2", container: "gap-3" },
  md: { pac: "w-8 h-8", dot: "w-2 h-2", gap: "gap-3", container: "gap-4" },
  lg: { pac: "w-12 h-12", dot: "w-3 h-3", gap: "gap-4", container: "gap-5" },
};

export default function PacManLoader({
  size = "md",
  className,
}: PacManLoaderProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center justify-center", s.container, className)}>
      {/* PAC-Man */}
      <div className={cn(s.pac, "relative")}>
        <div
          className={cn(
            "w-full h-full rounded-full bg-neon-yellow",
            "shadow-[0_0_20px_rgba(255,228,77,0.4)]"
          )}
          style={{
            animation: "chomp 0.3s linear infinite",
          }}
        />
      </div>

      {/* Dots being eaten */}
      <div className={cn("flex items-center", s.gap)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              s.dot,
              "rounded-full bg-neon-yellow/80",
              "shadow-[0_0_6px_rgba(255,228,77,0.4)]"
            )}
            style={{
              animation: `pulse-glow 1s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
