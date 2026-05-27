"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, popIn } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import NeonButton from "@/components/ui/NeonButton";
import { GitBranch, GitPullRequest, GitFork, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Create static contribution levels (representing a mini mock contribution history)
// 12 columns by 7 rows representing a responsive 3-month grid
const ROWS = 7;
const COLS = 24;

export default function OpenSourceSection() {
  const [gridData, setGridData] = useState<number[][]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number; val: number } | null>(null);

  // Initialize randomized grid data once on client mount
  useEffect(() => {
    const data = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => {
        const rand = Math.random();
        if (rand < 0.3) return 0; // zero commits
        if (rand < 0.6) return 1; // low commits
        if (rand < 0.8) return 2; // medium
        return 3; // high
      })
    );
    setGridData(data);
  }, []);

  // Intensity classes maps
  const cellColorMap: Record<number, string> = {
    0: "bg-bg-primary border-glass-border hover:border-glass-border-hover",
    1: "bg-neon-cyan/20 border-neon-cyan/10 hover:bg-neon-cyan/35 hover:shadow-[0_0_8px_rgba(0,229,255,0.2)]",
    2: "bg-neon-purple/35 border-neon-purple/20 hover:bg-neon-purple/50 hover:shadow-[0_0_8px_rgba(180,77,255,0.2)]",
    3: "bg-neon-yellow/60 border-neon-yellow/30 hover:bg-neon-yellow/80 hover:shadow-[0_0_12px_rgba(255,228,77,0.4)]",
  };

  const getIntensityLabel = (val: number) => {
    if (val === 0) return "No contributions";
    if (val === 1) return "1-3 commits (Learning)";
    if (val === 2) return "4-6 commits (Building)";
    return "7+ commits (Deploying!)";
  };

  return (
    <section id="opensource" className="relative overflow-hidden py-24 sm:py-32 bg-bg-secondary/15">
      {/* Background cyber lines grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#090915_1px,transparent_1px),linear-gradient(to_bottom,#090915_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35" />

      <div className="section-container relative z-10">
        <SectionHeading
          title="Open Source & Contributions"
          subtitle="BUILDING IN PUBLIC"
          accent="gradient"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Content - Left Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-neon-yellow/5 border border-neon-yellow/10 text-xs font-mono text-neon-yellow">
              <GitBranch size={14} />
              <span>LEARNING IN PUBLIC</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Committed to <span className="text-neon-cyan text-glow-cyan">Collaboration</span>
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed">
              We strongly believe that writing clean software and developing cutting-edge AI shouldn&apos;t happen behind closed doors. By modularizing systems, documentation, and bioinformatics tools, we collaborate transparently.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-1 text-neon-cyan text-glow-cyan">
                  <GitPullRequest size={16} />
                  <span className="font-mono font-bold text-sm">38+</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-text-muted">PRs Merged</span>
              </div>

              <div className="text-left space-y-1">
                <div className="flex items-center gap-1 text-neon-yellow text-glow-yellow">
                  <GitFork size={16} />
                  <span className="font-mono font-bold text-sm">12+</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-text-muted">Forks Made</span>
              </div>

              <div className="text-left space-y-1">
                <div className="flex items-center gap-1 text-neon-purple text-glow-purple">
                  <Heart size={16} />
                  <span className="font-mono font-bold text-sm">50+</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-text-muted">Stars Given</span>
              </div>
            </div>

            <div className="pt-4">
              <NeonButton
                variant="cyan"
                size="md"
                href="https://github.com"
                className="font-mono font-bold"
              >
                Fork Our Journey
              </NeonButton>
            </div>
          </motion.div>

          {/* GitHub Style Contribution Grid - Right Column */}
          <div className="lg:col-span-7">
            <GlassCard
              accent="cyan"
              className="p-8 flex flex-col justify-between"
              animate={true}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-text-primary font-mono flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan shadow-[0_0_8px_var(--neon-cyan)]"></span>
                    </span>
                    pacmen_learning_log.json
                  </h4>
                  <span className="text-[10px] font-mono text-text-muted">
                    Commits Activity (2025)
                  </span>
                </div>

                {/* Grid container */}
                <div className="overflow-x-auto pb-4 scrollbar-thin">
                  <div className="min-w-[420px] flex flex-col gap-1.5 select-none">
                    {gridData.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-1.5">
                        {row.map((cell, cIdx) => (
                          <motion.div
                            key={cIdx}
                            variants={popIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: (rIdx * COLS + cIdx) * 0.002 }}
                            onMouseEnter={() =>
                              setHoveredCell({ r: rIdx, c: cIdx, val: cell })
                            }
                            onMouseLeave={() => setHoveredCell(null)}
                            className={cn(
                              "w-3.5 h-3.5 rounded-sm border transition-all duration-150 cursor-pointer flex-shrink-0",
                              cellColorMap[cell]
                            )}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid legend / tooltips */}
                <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary h-6">
                  {/* Tooltip info */}
                  <div>
                    {hoveredCell !== null ? (
                      <span className="text-neon-cyan animate-pulse">
                        &gt; {getIntensityLabel(hoveredCell.val)}
                      </span>
                    ) : (
                      <span className="text-text-muted">&gt; Hover over cell for commit info</span>
                    )}
                  </div>

                  {/* Legend keys */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted mr-1">Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm border bg-bg-primary border-glass-border" />
                    <div className="w-2.5 h-2.5 rounded-sm border bg-neon-cyan/20 border-neon-cyan/10" />
                    <div className="w-2.5 h-2.5 rounded-sm border bg-neon-purple/35 border-neon-purple/20" />
                    <div className="w-2.5 h-2.5 rounded-sm border bg-neon-yellow/60 border-neon-yellow/30" />
                    <span className="text-text-muted ml-1">More</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
