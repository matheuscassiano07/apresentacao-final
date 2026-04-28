"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface HeroSectionProps {
  nomeCliente: string;
}

export function HeroSection({ nomeCliente }: HeroSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Arquitetura moderna"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10 md:top-12 md:left-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bevilacqua-Logo-48-yr2vRaMDSk4LfkZYxs0kxKufdEc6g4.png"
          alt="Bevilacqua Arquitetura e Engenharia"
          width={280}
          height={60}
          className="h-auto w-48 md:w-72"
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="absolute bottom-12 left-8 z-10 md:bottom-20 md:left-12 duration-700"
      >
        <h1 className="font-sans text-4xl font-light uppercase tracking-widest text-white md:text-6xl lg:text-7xl">
          Proposta Comercial
        </h1>
        <div className="mt-6 border-l-2 border-primary pl-6">
          <p className="text-sm uppercase tracking-widest text-white/80">
            Preparado exclusivamente para
          </p>
          <p className="mt-2 text-2xl font-medium uppercase tracking-wide text-white md:text-3xl">
            {nomeCliente}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
          <svg
            className="h-6 w-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
