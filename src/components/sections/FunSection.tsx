"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Gamepad2, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 12x12 simple maze map
// 0 = Empty space with dot
// 1 = Wall
// 2 = Empty space without dot
const MAZE_GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 2, 2, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 2, 2, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const CELL_SIZE = 24;

export default function FunSection() {
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pac-man game state
  const pacmanRef = useRef({
    x: 1, // grid units
    y: 1,
    dirX: 0,
    dirY: 0,
    mouthAngle: 0.2,
    mouthSpeed: 0.05,
    mouthOpening: true,
  });

  const mapRef = useRef<number[][]>([]);

  // Load and reset map
  const resetGame = () => {
    mapRef.current = MAZE_GRID.map((row) => [...row]);
    pacmanRef.current = {
      x: 1,
      y: 1,
      dirX: 0,
      dirY: 0,
      mouthAngle: 0.2,
      mouthSpeed: 0.05,
      mouthOpening: true,
    };
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setHasStarted(true);
  };

  // Handle movements
  const changeDirection = (dx: number, dy: number) => {
    if (!hasStarted) resetGame();
    
    const pac = pacmanRef.current;
    const nextX = pac.x + dx;
    const nextY = pac.y + dy;

    // Check bounds & walls
    if (
      nextY >= 0 &&
      nextY < mapRef.current.length &&
      nextX >= 0 &&
      nextX < mapRef.current[nextY].length &&
      mapRef.current[nextY][nextX] !== 1
    ) {
      pac.dirX = dx;
      pac.dirY = dy;
    }
  };

  // Listening to key press events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        changeDirection(0, -1);
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        changeDirection(0, 1);
      }
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        changeDirection(-1, 0);
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        changeDirection(1, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted]);

  // Main game rendering loop
  useEffect(() => {
    if (!hasStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let tickCount = 0;

    const gameLoop = () => {
      tickCount++;

      // Slow down physics update rate (every 10 frames)
      if (tickCount % 8 === 0) {
        const pac = pacmanRef.current;
        const map = mapRef.current;

        // Apply movement
        const nextX = pac.x + pac.dirX;
        const nextY = pac.y + pac.dirY;

        if (
          nextY >= 0 &&
          nextY < map.length &&
          nextX >= 0 &&
          nextX < map[nextY].length &&
          map[nextY][nextX] !== 1
        ) {
          pac.x = nextX;
          pac.y = nextY;

          // Eat dot
          if (map[pac.y][pac.x] === 0) {
            map[pac.y][pac.x] = 2; // set to empty
            setScore((prev) => prev + 10);
          }
        }

        // Win check (if no 0 left)
        let dotsLeft = false;
        for (let r = 0; r < map.length; r++) {
          if (map[r].includes(0)) {
            dotsLeft = true;
            break;
          }
        }

        if (!dotsLeft) {
          setGameWon(true);
        }
      }

      // Drawing map & characters
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const map = mapRef.current;
      if (!map || map.length === 0) return;

      // Draw Walls & Dots
      for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {
          const type = map[r][c];
          const x = c * CELL_SIZE;
          const y = r * CELL_SIZE;

          if (type === 1) {
            // Draw Blue wall
            ctx.fillStyle = "rgba(0, 229, 255, 0.25)";
            ctx.strokeStyle = "var(--neon-cyan)";
            ctx.lineWidth = 1.5;
            ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
            ctx.strokeRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          } else if (type === 0) {
            // Draw Dot
            ctx.beginPath();
            ctx.arc(x + CELL_SIZE / 2, y + CELL_SIZE / 2, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = "var(--neon-yellow)";
            ctx.shadowColor = "rgba(255, 228, 77, 0.4)";
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      // Update pacman mouth
      const pac = pacmanRef.current;
      if (pac.mouthOpening) {
        pac.mouthAngle += pac.mouthSpeed;
        if (pac.mouthAngle >= 0.4) pac.mouthOpening = false;
      } else {
        pac.mouthAngle -= pac.mouthSpeed;
        if (pac.mouthAngle <= 0.05) pac.mouthOpening = true;
      }

      // Draw Pac-man
      const pacX = pac.x * CELL_SIZE + CELL_SIZE / 2;
      const pacY = pac.y * CELL_SIZE + CELL_SIZE / 2;
      const radius = 9;

      let rotation = 0;
      if (pac.dirX === 1) rotation = 0;
      else if (pac.dirX === -1) rotation = Math.PI;
      else if (pac.dirY === 1) rotation = Math.PI / 2;
      else if (pac.dirY === -1) rotation = -Math.PI / 2;

      ctx.save();
      ctx.translate(pacX, pacY);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.arc(0, 0, radius, pac.mouthAngle, Math.PI * 2 - pac.mouthAngle);
      ctx.lineTo(0, 0);
      ctx.closePath();

      ctx.fillStyle = "var(--neon-yellow)";
      ctx.shadowColor = "rgba(255, 228, 77, 0.5)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      if (!gameOver && !gameWon) {
        animId = requestAnimationFrame(gameLoop);
      }
    };

    animId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animId);
  }, [hasStarted, gameOver, gameWon]);

  return (
    <section id="fun" className="relative overflow-hidden py-24 sm:py-32">
      {/* Grid backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(#12122a_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          title="The Retro Arcade"
          subtitle="TEAM INTERACTIVE EASTER EGG"
          accent="gradient"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Playable Mini Game Canvas - Left Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <GlassCard
              accent="yellow"
              className="p-6 flex flex-col items-center select-none w-full max-w-[340px]"
              animate={true}
              hover={false}
            >
              <div className="flex items-center justify-between w-full mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neon-yellow flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-yellow animate-ping" />
                  ARCADE CABINET
                </span>
                <span className="font-mono text-xs text-text-secondary font-bold">
                  Score: <span className="text-neon-cyan">{score}</span>
                </span>
              </div>

              {/* Game Window viewport */}
              <div className="relative border-4 border-neon-cyan/50 rounded-2xl bg-bg-primary overflow-hidden shadow-[0_0_25px_rgba(0,229,255,0.15)] flex items-center justify-center p-2">
                <canvas
                  ref={canvasRef}
                  width={288}
                  height={288}
                  className="bg-bg-primary rounded-lg"
                />

                {/* Overlays (Start / Win) */}
                {!hasStarted && (
                  <div className="absolute inset-0 bg-bg-primary/90 flex flex-col items-center justify-center gap-4 text-center p-4">
                    <span className="text-2xl font-black font-mono tracking-wider text-neon-yellow animate-pulse">
                      PAC-MEN ARCADE
                    </span>
                    <p className="text-[10px] font-mono text-text-secondary max-w-[200px]">
                      Navigate the maze, eat all dots. Spells PAC for: Pratham, Amitesh, Chaitanya!
                    </p>
                    <button
                      onClick={resetGame}
                      className="px-6 py-2 rounded-xl bg-neon-yellow/10 border border-neon-yellow text-neon-yellow font-mono text-xs font-bold uppercase tracking-wider hover:bg-neon-yellow/20 transition-all duration-300"
                    >
                      Insert Coin (Play)
                    </button>
                  </div>
                )}

                {gameWon && (
                  <div className="absolute inset-0 bg-bg-primary/95 flex flex-col items-center justify-center gap-4 text-center p-4">
                    <span className="text-2xl font-black font-mono tracking-wider text-neon-yellow animate-bounce">
                      VICTORY!
                    </span>
                    <p className="text-xs font-mono text-neon-cyan">
                      You devoured the tech maze!
                    </p>
                    <button
                      onClick={resetGame}
                      className="px-4 py-2 rounded-xl bg-neon-cyan/15 border border-neon-cyan text-neon-cyan font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <RotateCcw size={12} /> Play Again
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile D-Pad on-screen controllers */}
              <div className="grid grid-cols-3 gap-2 w-36 mt-6 select-none">
                <div />
                <button
                  onClick={() => changeDirection(0, -1)}
                  className="w-10 h-10 rounded-xl bg-bg-primary border border-glass-border hover:border-glass-border-hover hover:bg-glass-bg flex items-center justify-center active:scale-95 transition-all text-text-secondary"
                  aria-label="Up"
                >
                  ▲
                </button>
                <div />

                <button
                  onClick={() => changeDirection(-1, 0)}
                  className="w-10 h-10 rounded-xl bg-bg-primary border border-glass-border hover:border-glass-border-hover hover:bg-glass-bg flex items-center justify-center active:scale-95 transition-all text-text-secondary"
                  aria-label="Left"
                >
                  ◀
                </button>
                <div className="w-10 h-10 flex items-center justify-center text-text-muted font-mono text-[9px]">
                  ᗧ
                </div>
                <button
                  onClick={() => changeDirection(1, 0)}
                  className="w-10 h-10 rounded-xl bg-bg-primary border border-glass-border hover:border-glass-border-hover hover:bg-glass-bg flex items-center justify-center active:scale-95 transition-all text-text-secondary"
                  aria-label="Right"
                >
                  ▶
                </button>

                <div />
                <button
                  onClick={() => changeDirection(0, 1)}
                  className="w-10 h-10 rounded-xl bg-bg-primary border border-glass-border hover:border-glass-border-hover hover:bg-glass-bg flex items-center justify-center active:scale-95 transition-all text-text-secondary"
                  aria-label="Down"
                >
                  ▼
                </button>
                <div />
              </div>
            </GlassCard>
          </div>

          {/* Interactive Easter Eggs Trivia - Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-neon-purple/5 border border-neon-purple/10 text-xs font-mono text-neon-purple">
                <Sparkles size={14} />
                <span>EASTER EGG DECRYPT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                Arcade Legacy & <span className="text-neon-purple text-glow-purple">Secret Keys</span>
              </h3>

              <div className="space-y-4">
                <GlassCard accent="purple" className="p-5" animate={true}>
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <span className="text-neon-yellow font-bold">1.</span>
                    The PAC Initials Metaphor
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1.5">
                    Look closely at the team members&apos; names: **P**ratham Karma, **A**mitesh Garg, **C**haitanya Chalith. Spelled out in sequence, the first letters of their names spell **P-A-C**! Our team name is literally hardcoded into our DNA!
                  </p>
                </GlassCard>

                <GlassCard accent="cyan" className="p-5" animate={true}>
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <span className="text-neon-cyan font-bold">2.</span>
                    BioGenomics Data Crush
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1.5">
                    We designed customized regex and bioinformatics parsing engines in AlphavirusDB to process and parse bulk JSON, FASTA, and spreadsheet data arrays, crunching over 50,000 genomics records in under 2 seconds.
                  </p>
                </GlassCard>

                <GlassCard accent="yellow" className="p-5" animate={true}>
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <span className="text-neon-yellow font-bold">3.</span>
                    Station Prioritization Solves
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1.5">
                    Utilizing greedy sorting and station capacity weight matrices, our internship allocation solver processes prioritizing inputs to optimize student allocations under 100 milliseconds.
                  </p>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
