"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { buttonTap } from "@/lib/animations";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "yellow" | "cyan" | "purple" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const variantStyles = {
  yellow: [
    "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30",
    "hover:bg-neon-yellow/20 hover:border-neon-yellow/50",
    "hover:shadow-[0_0_25px_rgba(255,228,77,0.2)]",
  ].join(" "),
  cyan: [
    "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
    "hover:bg-neon-cyan/20 hover:border-neon-cyan/50",
    "hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]",
  ].join(" "),
  purple: [
    "bg-neon-purple/10 text-neon-purple border-neon-purple/30",
    "hover:bg-neon-purple/20 hover:border-neon-purple/50",
    "hover:shadow-[0_0_25px_rgba(180,77,255,0.2)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-secondary border-glass-border",
    "hover:text-text-primary hover:bg-glass-bg-hover hover:border-glass-border-hover",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-4 py-1.5 text-xs gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
};

export default function NeonButton({
  children,
  variant = "cyan",
  size = "md",
  href,
  className,
  ...props
}: NeonButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center",
    "rounded-xl border font-medium",
    "transition-all duration-300 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 focus:ring-offset-2 focus:ring-offset-bg-primary",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={buttonTap}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileTap={buttonTap}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
