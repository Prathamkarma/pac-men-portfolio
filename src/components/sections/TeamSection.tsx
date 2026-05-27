"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { teamMembers, TeamMember } from "@/data/team";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Code2, Compass, Briefcase, GraduationCap, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamSection() {
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);

  const activeMember = teamMembers.find((m) => m.id === activeMemberId) || null;

  return (
    <section id="team" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          title="Meet the PAC-Men"
          subtitle="OUR TEAM PLAYERS"
          accent="gradient"
        />

        {/* 3-Column Grid of Member Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {teamMembers.map((member) => {
            const isYellow = member.accentColor === "yellow";
            const isCyan = member.accentColor === "cyan";
            const isPurple = member.accentColor === "purple";

            const shadowColorMap = {
              yellow: "shadow-[0_0_20px_rgba(255,228,77,0.15)]",
              cyan: "shadow-[0_0_20px_rgba(0,229,255,0.15)]",
              purple: "shadow-[0_0_20px_rgba(180,77,255,0.15)]",
            };

            const borderMap = {
              yellow: "border-neon-yellow/30",
              cyan: "border-neon-cyan/30",
              purple: "border-neon-purple/30",
            };

            const avatarBgMap = {
              yellow: "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20",
              cyan: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
              purple: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
            };

            const glowTextMap = {
              yellow: "text-neon-yellow text-glow-yellow",
              cyan: "text-neon-cyan text-glow-cyan",
              purple: "text-neon-purple text-glow-purple",
            };

            return (
              <GlassCard
                key={member.id}
                accent={member.accentColor}
                className={cn(
                  "p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group h-full",
                  "border-t-2",
                  borderMap[member.accentColor]
                )}
                hover={true}
                onClick={() => setActiveMemberId(member.id)}
              >
                {/* Visual Accent Glow on Hover */}
                <div
                  className={cn(
                    "absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
                    isYellow && "bg-neon-yellow",
                    isCyan && "bg-neon-cyan",
                    isPurple && "bg-neon-purple"
                  )}
                />

                <div className="space-y-6 w-full">
                  {/* Initials Avatar */}
                  <div className="flex justify-between items-start">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-extrabold text-xl border",
                        avatarBgMap[member.accentColor],
                        shadowColorMap[member.accentColor]
                      )}
                    >
                      {member.avatar}
                    </div>
                    {/* Tiny arcade arrow indicator */}
                    <div className="text-text-muted group-hover:translate-x-1.5 transition-transform duration-300">
                      <span className={cn("text-xs font-mono font-semibold uppercase tracking-wider", glowTextMap[member.accentColor])}>
                        Details &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-text-primary">
                      {member.name}
                    </h3>
                    <p className={cn("text-xs font-mono font-semibold uppercase tracking-widest", glowTextMap[member.accentColor])}>
                      {member.role}
                    </p>
                  </div>

                  {/* Bio summary */}
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="h-[1px] bg-glass-border w-full" />

                  {/* Quick Tags (Hobbies / Wants to learn) */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted block">
                      Main Focus / Hobbies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.hobbies.slice(0, 3).map((hobby) => (
                        <span
                          key={hobby}
                          className="px-2 py-0.5 rounded bg-bg-primary border border-glass-border text-[10px] text-text-secondary font-mono"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Button CTA */}
                <div className="mt-8 w-full">
                  <button
                    className={cn(
                      "w-full py-2.5 rounded-xl border font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                      isYellow && "bg-neon-yellow/5 border-neon-yellow/20 text-neon-yellow group-hover:bg-neon-yellow/10 group-hover:border-neon-yellow/40",
                      isCyan && "bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/40",
                      isPurple && "bg-neon-purple/5 border-neon-purple/20 text-neon-purple group-hover:bg-neon-purple/10 group-hover:border-neon-purple/40"
                    )}
                  >
                    Inspect Profile
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </motion.div>

        {/* Expandable Member Detail Overlay (Modal-style layout but matching glass/retro styling) */}
        <AnimatePresence>
          {activeMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-md overflow-y-auto"
            >
              {/* Backing panel container for layout alignment */}
              <div className="min-h-screen py-10 w-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={cn(
                    "w-full max-w-4xl rounded-3xl bg-bg-card/90 border border-glass-border shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden relative",
                    `border-t-4 border-t-neon-${activeMember.accentColor}`
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveMemberId(null)}
                    className="absolute top-6 right-6 p-2 rounded-xl bg-glass-bg border border-glass-border hover:bg-glass-bg-hover hover:border-glass-border-hover text-text-secondary hover:text-text-primary transition-all z-10"
                    aria-label="Close profile"
                  >
                    <X size={20} />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Profile Left Sidebar */}
                    <div className="lg:col-span-4 bg-bg-secondary/50 border-r border-glass-border p-8 flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Huge initials avatar */}
                        <div
                          className={cn(
                            "w-24 h-24 rounded-3xl flex items-center justify-center font-mono font-extrabold text-4xl border mx-auto shadow-lg",
                            activeMember.accentColor === "yellow" && "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20 shadow-neon-yellow/10",
                            activeMember.accentColor === "cyan" && "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20 shadow-neon-cyan/10",
                            activeMember.accentColor === "purple" && "bg-neon-purple/10 text-neon-purple border-neon-purple/20 shadow-neon-purple/10"
                          )}
                        >
                          {activeMember.avatar}
                        </div>

                        <div className="text-center space-y-2">
                          <h3 className="text-2xl font-bold tracking-tight text-text-primary">
                            {activeMember.name}
                          </h3>
                          <p className={cn(
                            "text-xs font-mono font-semibold uppercase tracking-wider",
                            activeMember.accentColor === "yellow" && "text-neon-yellow text-glow-yellow",
                            activeMember.accentColor === "cyan" && "text-neon-cyan text-glow-cyan",
                            activeMember.accentColor === "purple" && "text-neon-purple text-glow-purple"
                          )}>
                            {activeMember.role}
                          </p>
                        </div>

                        <div className="h-[1px] bg-glass-border" />

                        {/* Hobbies list */}
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted flex items-center gap-2">
                            <Compass size={12} />
                            Hobbies
                          </span>
                          <ul className="space-y-2 text-sm text-text-secondary font-medium">
                            {activeMember.hobbies.map((hobby) => (
                              <li key={hobby} className="flex items-center gap-2">
                                <div className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  activeMember.accentColor === "yellow" && "bg-neon-yellow",
                                  activeMember.accentColor === "cyan" && "bg-neon-cyan",
                                  activeMember.accentColor === "purple" && "bg-neon-purple"
                                )} />
                                {hobby}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Accent details for interests */}
                      {activeMember.interests && activeMember.interests.length > 0 && (
                        <div className="space-y-3 mt-8">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted flex items-center gap-2">
                            <Briefcase size={12} />
                            Special Interests
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeMember.interests.map((interest) => (
                              <span
                                key={interest}
                                className="px-2 py-1 rounded bg-bg-primary/60 border border-glass-border text-xs text-text-secondary"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Profile Right Body content */}
                    <div className="lg:col-span-8 p-8 sm:p-10 space-y-8 max-h-[75vh] overflow-y-auto">
                      {/* Bio */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                          Biography
                        </h4>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {activeMember.bio}
                        </p>
                      </div>

                      {/* Technical Skills Levels */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary flex items-center gap-2">
                          <Code2 size={16} />
                          Skill Matrix
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeMember.skills.map((skill) => (
                            <div key={skill.name} className="space-y-1.5">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-text-secondary font-medium">{skill.name}</span>
                                <span className={cn(
                                  activeMember.accentColor === "yellow" && "text-neon-yellow",
                                  activeMember.accentColor === "cyan" && "text-neon-cyan",
                                  activeMember.accentColor === "purple" && "text-neon-purple"
                                )}>{skill.level}%</span>
                              </div>
                              {/* Glowing level progress bar */}
                              <div className="h-1.5 w-full bg-bg-primary rounded-full overflow-hidden border border-glass-border">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                                  className={cn(
                                    "h-full rounded-full",
                                    activeMember.accentColor === "yellow" && "bg-neon-yellow shadow-[0_0_8px_rgba(255,228,77,0.4)]",
                                    activeMember.accentColor === "cyan" && "bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.4)]",
                                    activeMember.accentColor === "purple" && "bg-neon-purple shadow-[0_0_8px_rgba(180,77,255,0.4)]"
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Projects & Leadership double grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Projects */}
                        {activeMember.projects && activeMember.projects.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                              Key Projects
                            </h4>
                            <div className="space-y-2">
                              {activeMember.projects.map((proj) => (
                                <div key={proj.name} className="p-3.5 rounded-xl bg-bg-secondary/40 border border-glass-border">
                                  <h5 className="text-xs font-bold text-text-primary">{proj.name}</h5>
                                  {proj.description && (
                                    <p className="text-[11px] text-text-secondary mt-1">{proj.description}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Leadership or wants to learn */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary flex items-center gap-2">
                            <GraduationCap size={16} />
                            {activeMember.leadership && activeMember.leadership.length > 0 ? "Leadership Roles" : "Wants to Learn"}
                          </h4>
                          <div className="space-y-2">
                            {(activeMember.leadership && activeMember.leadership.length > 0
                              ? activeMember.leadership
                              : activeMember.wantsToLearn
                            ).map((item) => (
                              <div key={item} className="px-3.5 py-2.5 rounded-xl bg-bg-secondary/40 border border-glass-border text-xs text-text-secondary flex items-center gap-2">
                                <div className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                  activeMember.accentColor === "yellow" && "bg-neon-yellow",
                                  activeMember.accentColor === "cyan" && "bg-neon-cyan",
                                  activeMember.accentColor === "purple" && "bg-neon-purple"
                                )} />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
