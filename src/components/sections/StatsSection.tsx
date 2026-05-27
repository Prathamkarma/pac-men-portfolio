"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { teamStats } from "@/data/team";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlassCard from "@/components/ui/GlassCard";

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-bg-secondary/30 border-y border-glass-border">
      {/* Background neon orb accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[100px] bg-neon-purple/5 blur-[80px] pointer-events-none" />

      <div className="section-container !py-0 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {teamStats.map((stat, index) => {
            // Pick an accent color based on index
            const colors = ["yellow", "cyan", "purple"];
            const colorClass = colors[index % colors.length] as "yellow" | "cyan" | "purple";
            
            const colorTextMap = {
              yellow: "text-neon-yellow text-glow-yellow",
              cyan: "text-neon-cyan text-glow-cyan",
              purple: "text-neon-purple text-glow-purple",
            };

            return (
              <GlassCard
                key={stat.label}
                accent={colorClass}
                className="p-6 flex flex-col items-center justify-center text-center group"
                hover={true}
                animate={true}
              >
                <motion.div variants={fadeInUp} className="space-y-2">
                  <div className={`text-3xl sm:text-4xl font-extrabold font-mono ${colorTextMap[colorClass]}`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-text-secondary font-semibold font-sans group-hover:text-text-primary transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              </GlassCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
