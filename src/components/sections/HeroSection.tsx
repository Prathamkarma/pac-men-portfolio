"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/animations";
import { teamDescription } from "@/data/team";
import NeonButton from "@/components/ui/NeonButton";
import TypewriterText from "@/components/ui/TypewriterText";
import ParticleField from "@/components/ui/ParticleField";
import FloatingElement from "@/components/animations/FloatingElement";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const typewriterTexts = [
    teamDescription.tagline,
    "Ambitious Developers Navigating AI, Software & Open-Source.",
    "Solving Complex Engineering Challenges Together.",
    "PS-I Internship @ Swecha Team Portfolio 2026.",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background Interactive Particles */}
      <ParticleField particleCount={60} connectDistance={110} maxSpeed={0.4} />

      {/* Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-neon-yellow/10 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-neon-cyan/8 animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10 w-full flex flex-col items-center justify-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glass-border bg-glass-bg text-xs font-mono text-text-secondary mb-6 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-yellow shadow-[0_0_8px_var(--neon-yellow)]"></span>
            </span>
            <span>PS-I Internship @ Swecha Team Portfolio &middot; 2026</span>
          </motion.div>

          {/* Main Hero Header */}
          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter mb-6 relative select-none leading-none"
          >
            <span className="text-neon-yellow text-glow-yellow filter drop-shadow-[0_0_20px_rgba(255,228,77,0.3)]">
              PAC
            </span>
            <span className="text-text-primary">
              -Men
            </span>
          </motion.h1>

          {/* Subtitle / Typewriter taglines */}
          <motion.div
            variants={fadeInUp}
            className="h-[72px] sm:h-[48px] flex items-center justify-center mb-8 px-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-text-secondary max-w-2xl text-center leading-normal">
              <TypewriterText
                texts={typewriterTexts}
                typingSpeed={50}
                deletingSpeed={30}
                pauseDuration={2500}
                className="text-glow-cyan text-text-primary font-medium"
              />
            </p>
          </motion.div>

          {/* Retro PAC-Man Eating Animation Visual */}
          <motion.div
            variants={fadeIn}
            className="relative w-72 h-12 mb-12 flex items-center justify-start border border-glass-border rounded-2xl bg-bg-secondary/40 px-6 overflow-hidden backdrop-blur-sm"
          >
            {/* Retro Maze Line Accent */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-neon-cyan/20 -translate-y-1/2 pointer-events-none" />

            <div className="relative w-full h-full flex items-center justify-between">
              {/* PAC-Man chomper moving */}
              <motion.div
                className="w-6 h-6 rounded-full bg-neon-yellow relative z-10 shadow-[0_0_12px_rgba(255,228,77,0.5)]"
                style={{
                  clipPath: "polygon(100% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)",
                  animation: "chomp 0.25s linear infinite",
                }}
                animate={{
                  x: [0, 210, 0],
                  scaleX: [1, 1, -1, -1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Pac dots being eaten */}
              {[...Array(5)].map((_, i) => {
                const dotPositionX = 40 + i * 40; // positions of dots
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2.5 h-2.5 rounded-full bg-neon-yellow shadow-[0_0_6px_rgba(255,228,77,0.6)]"
                    style={{
                      left: `${dotPositionX}px`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    // Dim/hide dots as pacman moves over them
                    // Since Pacman moves from x=0 to x=210 (left to right) and back:
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                      // Delay based on location
                      times: [
                        0,
                        (dotPositionX / 210) * 0.5,
                        0.5 + ((210 - dotPositionX) / 210) * 0.5,
                      ],
                    }}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <NeonButton
              variant="yellow"
              size="lg"
              onClick={() => handleScroll("about")}
              className="group font-bold"
            >
              Enter the Maze
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </NeonButton>
            <NeonButton
              variant="ghost"
              size="lg"
              onClick={() => handleScroll("team")}
            >
              Meet the PAC-Men
            </NeonButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <FloatingElement amplitude={8} duration={4}>
            <button
              onClick={() => handleScroll("about")}
              className="flex flex-col items-center gap-1.5 text-text-muted hover:text-neon-cyan transition-colors"
              aria-label="Scroll to next section"
            >
              <span className="text-[10px] uppercase font-mono tracking-widest">
                Scroll Down
              </span>
              <ChevronDown size={18} className="animate-bounce" />
            </button>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
}
