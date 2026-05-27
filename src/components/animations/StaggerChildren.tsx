"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
  once?: boolean;
}

export default function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  childDelay = 0.1,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: childDelay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap each direct child with this to inherit stagger animation.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}
