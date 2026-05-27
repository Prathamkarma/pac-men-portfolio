"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Search, PenTool, Code, CheckCircle, Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  num: string;
  title: string;
  icon: React.ReactNode;
  metaphor: string;
  desc: string;
  tools: string[];
  color: "yellow" | "cyan" | "purple";
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Research & Plan",
    icon: <Search size={22} />,
    metaphor: "Spotting routes through the maze.",
    desc: "We analyze algorithm complexity, system scalability bounds, bioinformatics database patterns, and draft architectural schemas.",
    tools: ["Jupyter", "Notion", "NCBI API", "Excalidraw"],
    color: "yellow",
  },
  {
    num: "02",
    title: "Design & Spec",
    icon: <PenTool size={22} />,
    metaphor: "Drafting the safe paths.",
    desc: "Specifying strict API schemas, detailing data flow protocols, structuring frontend component maps, and designing glassmorphic UI systems.",
    tools: ["Figma", "Postman", "Markdown Specs"],
    color: "cyan",
  },
  {
    num: "03",
    title: "Engineered Builds",
    icon: <Code size={22} />,
    metaphor: "Activating the power pellets.",
    desc: "Assembling reactive Next.js systems, writing performance-critical algorithms in C++, and modeling PyTorch ML pipelines.",
    tools: ["VS Code", "Next.js", "PyTorch", "C++"],
    color: "purple",
  },
  {
    num: "04",
    title: "Resilient Testing",
    icon: <CheckCircle size={22} />,
    metaphor: "Dodging the ghost traps.",
    desc: "Running static type-check compiles, unit testing data parsing functions, and simulating visual latency benchmarks.",
    tools: ["Jest", "ESLint", "TypeScript", "PyTest"],
    color: "cyan",
  },
  {
    num: "05",
    title: "Continuous Deploy",
    icon: <Rocket size={22} />,
    metaphor: "Advancing to the next level!",
    desc: "Shipping optimized bundles to Vercel, dockerizing ML runtimes, and configuring automated test-on-push pipelines.",
    tools: ["GitHub Actions", "Vercel", "Docker", "Streamlit"],
    color: "yellow",
  },
];

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="workflow" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[200px] bg-neon-yellow/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          title="Product Engineering Pipeline"
          subtitle="HOW PAC-MEN BUILD"
          accent="gradient"
        />

        {/* Horizontal step connector buttons row (responsive) */}
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 mb-16">
          {/* Connector line behind */}
          <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-glass-border -translate-y-1/2 pointer-events-none hidden md:block" />

          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isYellow = step.color === "yellow";
            const isCyan = step.color === "cyan";
            const isPurple = step.color === "purple";

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "relative z-10 flex items-center gap-3.5 px-6 py-3.5 rounded-2xl border transition-all duration-300 font-mono text-sm font-bold w-full md:w-auto",
                  isActive
                    ? isYellow
                      ? "bg-neon-yellow/10 border-neon-yellow text-neon-yellow shadow-[0_0_15px_rgba(255,228,77,0.3)]"
                      : isCyan
                      ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : "bg-neon-purple/10 border-neon-purple text-neon-purple shadow-[0_0_15px_rgba(180,77,255,0.3)]"
                    : "bg-bg-card/60 border-glass-border text-text-secondary hover:text-text-primary hover:border-glass-border-hover"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border",
                    isActive
                      ? isYellow
                        ? "border-neon-yellow/30 bg-neon-yellow/20"
                        : isCyan
                        ? "border-neon-cyan/30 bg-neon-cyan/20"
                        : "border-neon-purple/30 bg-neon-purple/20"
                      : "border-glass-border bg-bg-primary"
                  )}
                >
                  {step.num}
                </div>
                {step.title}
              </button>
            );
          })}
        </div>

        {/* Selected step details container */}
        <div className="max-w-3xl mx-auto">
          <GlassCard
            accent={STEPS[activeStep].color}
            className="p-8 md:p-12 text-left relative overflow-hidden"
            animate={false}
          >
            {/* Ambient watermarked step number */}
            <div className="absolute right-6 bottom-4 text-9xl font-mono font-black text-white/[0.02] pointer-events-none select-none">
              {STEPS[activeStep].num}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
              {/* Step Icon & Metaphor */}
              <div className="md:col-span-4 space-y-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-glow shadow-md border",
                    STEPS[activeStep].color === "yellow" && "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20 shadow-neon-yellow/10",
                    STEPS[activeStep].color === "cyan" && "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20 shadow-neon-cyan/10",
                    STEPS[activeStep].color === "purple" && "bg-neon-purple/10 text-neon-purple border-neon-purple/20 shadow-neon-purple/10"
                  )}
                >
                  {STEPS[activeStep].icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted">
                    METAPHOR
                  </span>
                  <p className={cn(
                    "text-xs font-mono font-semibold mt-1",
                    STEPS[activeStep].color === "yellow" && "text-neon-yellow text-glow-yellow",
                    STEPS[activeStep].color === "cyan" && "text-neon-cyan text-glow-cyan",
                    STEPS[activeStep].color === "purple" && "text-neon-purple text-glow-purple"
                  )}>
                    ᗧ {STEPS[activeStep].metaphor}
                  </p>
                </div>
              </div>

              {/* Step narrative description */}
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-extrabold text-text-primary">
                    {STEPS[activeStep].title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {STEPS[activeStep].desc}
                  </p>
                </div>

                <div className="h-[1px] bg-glass-border" />

                {/* Step tools */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted block">
                    Technologies & Environments
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {STEPS[activeStep].tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-xl bg-bg-primary/50 border border-glass-border text-xs font-mono text-text-secondary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
