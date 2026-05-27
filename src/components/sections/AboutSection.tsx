"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { teamDescription } from "@/data/team";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Compass, Cpu, Gamepad2, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Maze-themed Grid Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c18_1px,transparent_1px),linear-gradient(to_bottom,#0c0c18_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      {/* SVG Neon Maze Line Accent */}
      <svg
        className="absolute top-1/4 right-0 w-96 h-96 opacity-10 pointer-events-none stroke-neon-cyan"
        viewBox="0 0 100 100"
        fill="none"
        strokeWidth="0.5"
      >
        <motion.path
          d="M 10 10 H 90 V 90 H 50 V 50 H 70 V 70 H 30 V 30"
          strokeDasharray="200"
          initial={{ strokeDashoffset: 200 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>

      <div className="section-container relative z-10">
        <SectionHeading
          title="Navigating the Tech Maze"
          subtitle="ABOUT THE PAC-MEN"
          accent="gradient"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Metaphor Narrative - Left Column */}
          <motion.div
            variants={fadeInLeft}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10 text-xs font-mono text-neon-cyan mb-2">
              <Compass size={14} className="animate-spin-slow" />
              <span>THE PAC-METAPHOR</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary leading-tight">
              Why <span className="text-neon-yellow text-glow-yellow">PAC-Men</span>?
            </h3>
            
            <p className="text-text-secondary leading-relaxed">
              {teamDescription.meaning}
            </p>

            <div className="h-[1px] bg-gradient-to-r from-glass-border to-transparent my-4" />

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neon-yellow/10 border border-neon-yellow/20 flex items-center justify-center text-neon-yellow text-glow-yellow font-bold">
                  •
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Pac-Dots = Knowledge Nodes</h4>
                  <p className="text-xs text-text-muted mt-1">Collecting frameworks, programming paradigms, and algorithms as we push forward.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan text-glow-cyan font-bold">
                  ᗧ
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Ghosts = Obstacles & Bugs</h4>
                  <p className="text-xs text-text-muted mt-1">System scaling bounds, hardware limitations, and deployment bottlenecks that we conquer.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Maze Pillars / Interactive Cards Grid - Right Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard
              accent="yellow"
              className="p-6 md:p-8 flex flex-col justify-between"
              animate={true}
            >
              <motion.div variants={fadeInUp} className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-neon-yellow/10 border border-neon-yellow/20 flex items-center justify-center text-neon-yellow shadow-[0_0_15px_rgba(255,228,77,0.1)]">
                  <Cpu size={24} />
                </div>
                <h4 className="text-lg font-bold text-text-primary">Our Mission</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {teamDescription.description}
                </p>
              </motion.div>
            </GlassCard>

            <GlassCard
              accent="purple"
              className="p-6 md:p-8 flex flex-col justify-between sm:translate-y-6"
              animate={true}
            >
              <motion.div variants={fadeInUp} className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple shadow-[0_0_15px_rgba(180,77,255,0.1)]">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-lg font-bold text-text-primary">Fun Fact</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {teamDescription.funFact}
                </p>
              </motion.div>
            </GlassCard>

            <GlassCard
              accent="cyan"
              className="p-6 md:p-8 flex flex-col justify-between sm:col-span-2"
              animate={true}
            >
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 text-left items-start sm:items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Co-op Synergy</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mt-2">
                    Coming from diverse backgrounds in Electrical, Biological Sciences, and Computer Engineering at BITS Pilani, we integrate theoretical foundations with pragmatic full-stack development to ship clean, robust codebases.
                  </p>
                </div>
              </motion.div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
