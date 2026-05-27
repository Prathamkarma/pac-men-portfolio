"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  title: string;
  time: string;
  status: "completed" | "in-progress" | "target";
  desc: string;
  players: string[];
  color: "yellow" | "cyan" | "purple";
}

const MILESTONES: Milestone[] = [
  {
    title: "AI Foundations & Deep Learning",
    time: "Phase 1: June 2025",
    status: "in-progress",
    desc: "Mastering PyTorch, neural architectures, weights/biases optimization, computer vision try-on systems, and bioinformatics DB querying engines.",
    players: ["Pratham", "Amitesh", "Chaitanya"],
    color: "yellow",
  },
  {
    title: "AI Engineering & LLM Workflows",
    time: "Phase 2: July 2025",
    status: "in-progress",
    desc: "Orchestrating agentic models, semantic vector database search indexes, RAG prompt tuning, and structured JSON parsing automation.",
    players: ["Pratham", "Amitesh"],
    color: "cyan",
  },
  {
    title: "Full Stack Systems & Web Apps",
    time: "Phase 3: July 2025",
    status: "in-progress",
    desc: "Designing responsive fluid interfaces, state management, complex database query architectures, and practical charging aggregating frameworks.",
    players: ["Chaitanya", "Amitesh"],
    color: "purple",
  },
  {
    title: "Cloud Infrastructure & DevOps",
    time: "Phase 4: August 2025",
    status: "target",
    desc: "Deploying dockerized microservices, setting up resilient CI/CD GitHub workflows, using cloud infrastructure (AWS/Vercel), and optimizing query latency.",
    players: ["Chaitanya"],
    color: "cyan",
  },
  {
    title: "Scalable ML Systems & Design",
    time: "Phase 5: Late August 2025",
    status: "target",
    desc: "Building highly concurrent bioinformatics systems, low-latency API layers, customized data ingestion, and scalable systems.",
    players: ["Pratham", "Amitesh"],
    color: "yellow",
  },
];

export default function LearningGoalsSection() {
  return (
    <section id="goals" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background neon orb accent */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neon-cyan/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          title="Our Learning Roadmap"
          subtitle="SUMMER ROADMAP & GOALS"
          accent="gradient"
        />

        {/* Vertical Timeline container */}
        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Vertical central spine line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-yellow/30 via-neon-cyan/30 to-neon-purple/10 -translate-x-1/2 pointer-events-none" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 sm:space-y-20"
          >
            {MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              const statusBadgeMap = {
                completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                "in-progress": "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20 animate-pulse",
                target: "bg-text-muted/10 text-text-muted border-glass-border",
              };

              const statusIconMap = {
                completed: <CheckCircle2 size={12} />,
                "in-progress": <Play size={10} className="fill-neon-yellow" />,
                target: <Calendar size={12} />,
              };

              const accentGlowText = {
                yellow: "text-neon-yellow text-glow-yellow",
                cyan: "text-neon-cyan text-glow-cyan",
                purple: "text-neon-purple text-glow-purple",
              };

              return (
                <div
                  key={milestone.title}
                  className={cn(
                    "relative flex flex-col sm:flex-row items-start sm:items-center w-full",
                    isEven ? "sm:flex-row-reverse" : ""
                  )}
                >
                  {/* Left / Right Card wrapper */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-12">
                    <GlassCard
                      accent={milestone.color}
                      className="p-6 text-left relative overflow-hidden group"
                      hover={true}
                      animate={true}
                    >
                      {/* Sub-accent timeline link indicator */}
                      <div className="absolute top-6 -left-3.5 sm:left-auto sm:-right-3.5 group-hover:scale-110 transition-transform duration-300 pointer-events-none hidden sm:block">
                        <ChevronRight
                          size={24}
                          className={cn(
                            "text-text-muted rotate-180",
                            isEven ? "sm:rotate-0" : "sm:rotate-180"
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        {/* Header metadata row */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                            {milestone.time}
                          </span>
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5",
                              statusBadgeMap[milestone.status]
                            )}
                          >
                            {statusIconMap[milestone.status]}
                            {milestone.status.replace("-", " ")}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-text-primary">
                          {milestone.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {milestone.desc}
                        </p>

                        <div className="h-[1px] bg-glass-border" />

                        {/* Collaborating Players */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-text-muted block">
                            Milestone Target For
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {milestone.players.map((player) => (
                              <span
                                key={player}
                                className="px-2 py-0.5 rounded bg-bg-primary border border-glass-border text-[9px] text-text-secondary font-mono"
                              >
                                {player}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Pulsating timeline node dot */}
                  <div className="absolute left-4 sm:left-1/2 top-4 sm:top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full bg-bg-card border-2 flex items-center justify-center shadow-lg transition-transform duration-300",
                        milestone.status === "in-progress" ? "scale-110" : "",
                        milestone.color === "yellow" && "border-neon-yellow",
                        milestone.color === "cyan" && "border-neon-cyan",
                        milestone.color === "purple" && "border-neon-purple"
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          milestone.status === "in-progress" ? "animate-ping absolute" : "",
                          milestone.color === "yellow" && "bg-neon-yellow shadow-neon-yellow/30",
                          milestone.color === "cyan" && "bg-neon-cyan shadow-neon-cyan/30",
                          milestone.color === "purple" && "bg-neon-purple shadow-neon-purple/30"
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
