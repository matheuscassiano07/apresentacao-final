"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const phases = [
  { id: "intro", number: "00", label: "Introdução" },
  { id: "etapa-1", number: "01", label: "Etapa 1" },
  { id: "etapa-2", number: "02", label: "Etapa 2" },
  { id: "etapa-3", number: "03", label: "Etapa 3" },
  { id: "etapa-4", number: "04", label: "Etapa 4" },
  { id: "etapa-5", number: "05", label: "Etapa 5" },
  { id: "visual-projeto", number: "06", label: "Visual" },
  { id: "prazos", number: "07", label: "Prazos" },
  { id: "obrigacoes", number: "08", label: "Obrigações" },
  { id: "investimento", number: "09", label: "Investimento" },
];

export function PhaseNavigation() {
  const [activePhase, setActivePhase] = useState("intro");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Detect active section
      const sections = phases.map((p) => document.getElementById(p.id));
      const currentSection = sections.find((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActivePhase(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between border-r border-background/10 bg-foreground/95 py-8 backdrop-blur lg:flex">
        {/* Progress Bar */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-background/10">
          <div
            className="w-full bg-gradient-to-b from-primary to-primary/40 transition-all duration-500"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        <div className="h-12 w-12" />

        {/* Phase Numbers */}
        <div className="flex flex-col items-center gap-3">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => scrollToSection(phase.id)}
              className={cn(
                "group relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                activePhase === phase.id
                  ? "bg-primary/15 text-primary shadow-[0_0_0_1px_rgba(145,20,25,0.35)]"
                  : "text-background/40 hover:bg-background/10 hover:text-background"
              )}
            >
              <span className="relative z-10">{phase.number}</span>
              
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded border border-background/10 bg-foreground px-3 py-2 text-xs uppercase tracking-wider text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {phase.label}
              </span>
            </button>
          ))}
        </div>

        {/* Current Phase Indicator */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-background/40">
            Fase
          </span>
          <p className="mt-1 text-xl font-light text-background">
            {phases.find((p) => p.id === activePhase)?.number}
          </p>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-t border-background/10 bg-foreground/95 px-3 backdrop-blur lg:hidden">
        {/* Progress Bar */}
        <div className="absolute left-0 top-0 h-0.5 w-full bg-foreground">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs uppercase tracking-wide text-background/60">
            Fase {phases.find((p) => p.id === activePhase)?.number}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          {phases.slice(0, 5).map((phase) => (
            <button
              key={phase.id}
              onClick={() => scrollToSection(phase.id)}
              className={cn(
                "flex h-6 w-6 items-center justify-center text-[10px] transition-all",
                activePhase === phase.id
                  ? "text-primary"
                  : "text-background/40"
              )}
            >
              {phase.number}
            </button>
          ))}
          <span className="text-xs text-background/40">...</span>
        </div>
      </nav>
    </>
  );
}
