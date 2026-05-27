"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: "yellow" | "cyan" | "purple" | "gradient";
  align?: "left" | "center";
  className?: string;
}

const accentGradientMap = {
  yellow: "from-neon-yellow to-neon-yellow/60",
  cyan: "from-neon-cyan to-neon-cyan/60",
  purple: "from-neon-purple to-neon-purple/60",
  gradient: "from-neon-yellow via-neon-cyan to-neon-purple",
};

const underlineColorMap = {
  yellow: "from-neon-yellow/60 via-neon-yellow/20 to-transparent",
  cyan: "from-neon-cyan/60 via-neon-cyan/20 to-transparent",
  purple: "from-neon-purple/60 via-neon-purple/20 to-transparent",
  gradient: "from-neon-yellow/60 via-neon-cyan/40 to-neon-purple/20",
};

export default function SectionHeading({
  title,
  subtitle,
  accent = "gradient",
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Decorative dot */}
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse-glow" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">
          {subtitle || "—"}
        </span>
        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
      </div>

      {/* Title */}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
          "bg-gradient-to-r bg-clip-text text-transparent",
          accentGradientMap[accent]
        )}
      >
        {title}
      </h2>

      {/* Animated underline */}
      <motion.div
        className={cn(
          "h-[2px] mt-4 rounded-full",
          "bg-gradient-to-r",
          underlineColorMap[accent],
          align === "center" ? "mx-auto" : ""
        )}
        initial={{ width: 0 }}
        whileInView={{ width: align === "center" ? 120 : 100 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
}
