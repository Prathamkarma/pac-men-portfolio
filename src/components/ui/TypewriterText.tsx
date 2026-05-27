"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterText({
  texts,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
  className,
  cursorClassName,
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const fullText = texts[currentTextIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      setCurrentText(fullText.substring(0, currentText.length + 1));

      if (currentText === fullText) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      setCurrentText(fullText.substring(0, currentText.length - 1));

      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{currentText}</span>
      <span
        className={cn(
          "inline-block w-[2px] h-[1em] ml-1 bg-neon-cyan animate-pulse",
          cursorClassName
        )}
        aria-hidden="true"
      />
    </span>
  );
}
