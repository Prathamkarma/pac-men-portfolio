"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks, teamMembers } from "@/data/team";
import { Heart, ArrowUp } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-glass-border bg-bg-secondary/50">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="section-container !py-12 sm:!py-16">
        <FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full bg-neon-yellow shadow-[0_0_10px_rgba(255,228,77,0.3)]"
                  style={{
                    clipPath: "polygon(100% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)",
                  }}
                />
                <span className="text-lg font-bold">
                  <span className="text-neon-yellow">PAC</span>
                  <span className="text-text-primary">-Men</span>
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                Navigating the AI maze, one power-up at a time. Summer of AI
                Internship — 2025.
              </p>

              {/* Pac dot trail */}
              <div className="flex items-center gap-2 pt-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-full bg-neon-yellow",
                      i < 3 ? "w-1 h-1 opacity-20" : "w-1.5 h-1.5",
                    )}
                    style={{
                      opacity: 0.2 + i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                Navigate
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-neon-cyan transition-colors duration-200 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-text-muted" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                The Team
              </h4>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border",
                        member.accentColor === "yellow" &&
                          "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20",
                        member.accentColor === "cyan" &&
                          "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
                        member.accentColor === "purple" &&
                          "bg-neon-purple/10 text-neon-purple border-neon-purple/20"
                      )}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-text-primary font-medium">
                        {member.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Divider */}
        <div className="section-divider my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            Crafted with{" "}
            <Heart size={12} className="text-neon-pink fill-neon-pink animate-pulse" />{" "}
            by PAC-Men &middot; Summer of AI 2025
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-text-muted hover:text-neon-cyan transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
