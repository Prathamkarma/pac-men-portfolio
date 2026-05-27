"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cardHover, fadeInUp } from "@/lib/animations";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: "yellow" | "cyan" | "purple" | "none";
  hover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

const accentBorderMap = {
  yellow: "hover:border-neon-yellow/30",
  cyan: "hover:border-neon-cyan/30",
  purple: "hover:border-neon-purple/30",
  none: "hover:border-glass-border-hover",
};

const accentGlowMap = {
  yellow: "hover:shadow-[0_0_30px_rgba(255,228,77,0.08)]",
  cyan: "hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]",
  purple: "hover:shadow-[0_0_30px_rgba(180,77,255,0.08)]",
  none: "",
};

export default function GlassCard({
  children,
  className,
  accent = "none",
  hover = true,
  animate = true,
  onClick,
}: GlassCardProps) {
  const Component = animate ? motion.div : "div";

  const baseClasses = cn(
    "relative rounded-2xl",
    "bg-glass-bg border border-glass-border",
    "backdrop-blur-xl",
    "transition-all duration-300 ease-out",
    hover && accentBorderMap[accent],
    hover && accentGlowMap[accent],
    hover && "hover:bg-glass-bg-hover",
    onClick && "cursor-pointer",
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={hover ? cardHover.hover : undefined}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}
