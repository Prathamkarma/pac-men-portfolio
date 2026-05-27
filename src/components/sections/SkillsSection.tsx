"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Cpu, Database, Layout, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

// Skills categories for listing
const skillCategories = [
  {
    title: "Core Languages",
    icon: <Terminal size={20} className="text-neon-yellow" />,
    color: "yellow" as const,
    tags: ["C++", "Python", "C", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "AI/ML Systems",
    icon: <Cpu size={20} className="text-neon-cyan" />,
    color: "cyan" as const,
    tags: ["Bioinformatics", "Data Processing", "Deep Learning", "Machine Learning", "Computer Vision"],
  },
  {
    title: "Software Engineering",
    icon: <Database size={20} className="text-neon-purple" />,
    color: "purple" as const,
    tags: ["Data Systems", "DSA", "Competitive Programming", "JSON/FASTA Parsing", "Excel Systems"],
  },
  {
    title: "Web & Infrastructure",
    icon: <Layout size={20} className="text-neon-cyan" />,
    color: "cyan" as const,
    tags: ["Git", "GitHub", "Vite", "Next.js", "Tailwind CSS", "Cloud Computing"],
  },
];

// Radar chart dimensions
const CHART_SIZE = 300;
const CENTER = CHART_SIZE / 2;
const MAX_RADIUS = 100;

// Axes definition
const AXES = [
  { label: "Languages", key: "languages" },
  { label: "Algorithms", key: "algorithms" },
  { label: "AI/ML Foundations", key: "ai_ml" },
  { label: "Data Parsing", key: "data_parsing" },
  { label: "Web/Frontend", key: "web" },
  { label: "Systems Design", key: "systems" },
];

// Skill levels for Team and Members
type MemberKey = "team" | "pratham" | "amitesh" | "chaitanya";

const SKILL_DATA: Record<MemberKey, Record<string, number>> = {
  team: { languages: 90, algorithms: 88, ai_ml: 75, data_parsing: 82, web: 78, systems: 70 },
  pratham: { languages: 92, algorithms: 90, ai_ml: 80, data_parsing: 85, web: 60, systems: 75 },
  amitesh: { languages: 70, algorithms: 75, ai_ml: 70, data_parsing: 50, web: 55, systems: 60 },
  chaitanya: { languages: 80, algorithms: 78, ai_ml: 65, data_parsing: 60, web: 82, systems: 65 },
};

export default function SkillsSection() {
  const [selectedProfile, setSelectedProfile] = useState<MemberKey>("team");

  // Generate SVG Polygon path string based on selected profile
  const generatePath = (profile: MemberKey) => {
    const data = SKILL_DATA[profile];
    const points = AXES.map((axis, i) => {
      const value = data[axis.key] || 0;
      const radius = (value / 100) * MAX_RADIUS;
      const angle = (i * 60 - 90) * (Math.PI / 180);
      const x = CENTER + radius * Math.cos(angle);
      const y = CENTER + radius * Math.sin(angle);
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")} Z`;
  };

  const getAxisPosition = (index: number, multiplier = 1) => {
    const radius = MAX_RADIUS * multiplier;
    const angle = (index * 60 - 90) * (Math.PI / 180);
    return {
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle),
    };
  };

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32 bg-bg-secondary/10">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#12122a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          title="Team Skill Index"
          subtitle="OUR TECH CAPABILITIES"
          accent="gradient"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Radar Chart Visual - Left Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Profiles Selection Selector */}
            <div className="flex gap-1.5 p-1 rounded-2xl bg-bg-secondary border border-glass-border mb-8 backdrop-blur-md">
              {(["team", "pratham", "amitesh", "chaitanya"] as MemberKey[]).map((profile) => (
                <button
                  key={profile}
                  onClick={() => setSelectedProfile(profile)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold capitalize transition-all duration-300",
                    selectedProfile === profile
                      ? profile === "pratham" || profile === "team"
                        ? "bg-neon-yellow/10 text-neon-yellow border border-neon-yellow/20"
                        : profile === "amitesh"
                        ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                        : "bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover border border-transparent"
                  )}
                >
                  {profile === "team" ? "Team" : profile.charAt(0).toUpperCase() + profile.slice(1)}
                </button>
              ))}
            </div>

            {/* Premium Custom SVG Radar Chart */}
            <div className="relative w-[300px] h-[300px] flex items-center justify-center p-4 rounded-3xl bg-bg-card/50 border border-glass-border shadow-2xl backdrop-blur-md">
              <svg width={CHART_SIZE} height={CHART_SIZE} className="overflow-visible select-none">
                {/* Background Radar Grid Circles */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => {
                  const points = AXES.map((_, idx) => {
                    const pos = getAxisPosition(idx, scale);
                    return `${pos.x},${pos.y}`;
                  });
                  return (
                    <polygon
                      key={i}
                      points={points.join(" ")}
                      fill="none"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axis lines */}
                {AXES.map((_, i) => {
                  const end = getAxisPosition(i, 1);
                  return (
                    <line
                      key={i}
                      x1={CENTER}
                      y1={CENTER}
                      x2={end.x}
                      y2={end.y}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Animated Data Area path */}
                <motion.path
                  d={generatePath(selectedProfile)}
                  fill={
                    selectedProfile === "pratham" || selectedProfile === "team"
                      ? "rgba(255, 228, 77, 0.12)"
                      : selectedProfile === "amitesh"
                      ? "rgba(0, 229, 255, 0.12)"
                      : "rgba(180, 77, 255, 0.12)"
                  }
                  stroke={
                    selectedProfile === "pratham" || selectedProfile === "team"
                      ? "var(--neon-yellow)"
                      : selectedProfile === "amitesh"
                      ? "var(--neon-cyan)"
                      : "var(--neon-purple)"
                  }
                  strokeWidth="2"
                  animate={{ d: generatePath(selectedProfile) }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="filter drop-shadow-[0_0_8px_rgba(0,229,255,0.2)]"
                />

                {/* Axis Labels */}
                {AXES.map((axis, i) => {
                  const labelPos = getAxisPosition(i, 1.25);
                  let textAnchor: "middle" | "end" | "start" = "middle";
                  if (labelPos.x < CENTER - 10) textAnchor = "end";
                  if (labelPos.x > CENTER + 10) textAnchor = "start";

                  return (
                    <text
                      key={i}
                      x={labelPos.x}
                      y={labelPos.y + 4}
                      fill="var(--text-secondary)"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      fontWeight="bold"
                      textAnchor={textAnchor}
                      className="transition-colors duration-300"
                    >
                      {axis.label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Skill Tag list categories - Right Column */}
          <div className="lg:col-span-7">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {skillCategories.map((category) => (
                <GlassCard
                  key={category.title}
                  accent={category.color}
                  className="p-6 text-left flex flex-col justify-between"
                  hover={true}
                  animate={true}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-bg-primary border border-glass-border flex items-center justify-center">
                        {category.icon}
                      </div>
                      <h4 className="font-bold text-text-primary">{category.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "px-3 py-1 rounded-xl bg-bg-primary/50 border text-xs font-mono font-medium transition-all duration-300",
                            category.color === "yellow" && "border-neon-yellow/10 text-neon-yellow/85 hover:border-neon-yellow/30 hover:shadow-[0_0_8px_rgba(255,228,77,0.15)]",
                            category.color === "cyan" && "border-neon-cyan/10 text-neon-cyan/85 hover:border-neon-cyan/30 hover:shadow-[0_0_8px_rgba(0,229,255,0.15)]",
                            category.color === "purple" && "border-neon-purple/10 text-neon-purple/85 hover:border-neon-purple/30 hover:shadow-[0_0_8px_rgba(180,77,255,0.15)]"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
