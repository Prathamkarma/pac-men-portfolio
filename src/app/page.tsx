import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import TeamSection from "@/components/sections/TeamSection";
import SkillsSection from "@/components/sections/SkillsSection";
import LearningGoalsSection from "@/components/sections/LearningGoalsSection";
import OpenSourceSection from "@/components/sections/OpenSourceSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import FunSection from "@/components/sections/FunSection";

export default function Home() {
  return (
    <>
      {/* Premium Sticky Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Landing Section */}
        <HeroSection />

        <div className="section-divider" />

        {/* 2. About Team */}
        <AboutSection />

        {/* 3. Team Stats Section Banner */}
        <StatsSection />

        <div className="section-divider" />

        {/* 4. Meet the Team */}
        <TeamSection />

        <div className="section-divider" />

        {/* 5. Team Skills Index (SVG Radar + Cards) */}
        <SkillsSection />

        <div className="section-divider" />

        {/* 6. Learning Goals Timeline */}
        <LearningGoalsSection />

        <div className="section-divider" />

        {/* 7. Open Source Contributions */}
        <OpenSourceSection />

        <div className="section-divider" />

        {/* 8. Product Engineering Workflow */}
        <WorkflowSection />

        <div className="section-divider" />

        {/* 9. Interactive Retro Arcade Fun Zone */}
        <FunSection />
      </main>

      {/* Premium Pacman themed Footer */}
      <Footer />
    </>
  );
}
