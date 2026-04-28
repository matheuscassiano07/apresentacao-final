"use client";

import Image from "next/image";

interface PhaseHeroProps {
  nomeCliente: string;
  dataValidade: string;
  backgroundImage?: string;
}

export function PhaseHero({ nomeCliente, dataValidade, backgroundImage }: PhaseHeroProps) {
  return (
    <section id="intro" className="section-gradient relative h-screen w-full overflow-hidden bg-foreground">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Imagem de capa da proposta"
            fill
            className="object-cover opacity-45"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            rgba(255,255,255,0.1) 100px,
            rgba(255,255,255,0.1) 101px
          )`
        }} />
      </div>

      {/* Large Number Background */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none sm:-right-16">
        <span className="text-[34vw] font-extralight leading-none text-background/[0.03] sm:text-[38vw]">
          00
        </span>
      </div>

      {/* Main Content */}
      <div className="absolute bottom-18 left-5 right-5 z-10 sm:bottom-16 sm:left-6 sm:right-6 lg:bottom-28 lg:left-32 lg:right-auto">
        <div className="mb-8">
          <span className="animate-soft-float animate-fade-lift-elegant inline-block border border-primary bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary md:px-5 md:py-3 md:text-sm">
            Proposta Comercial
          </span>
        </div>
        
        <h1 className="cinematic-intro-zoom max-w-4xl text-3xl font-light leading-tight text-background sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block text-background/60">Projeto para</span>
          <span className="block text-background">{nomeCliente}</span>
        </h1>

        <div className="cinematic-intro-left mt-8 flex flex-wrap items-center gap-5 md:mt-10 md:gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-background/40 md:text-sm">
              Validade
            </span>
            <p className="mt-1 text-lg text-background md:text-xl">{dataValidade}</p>
          </div>
          <div className="h-8 w-px bg-background/20" />
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-background/40 md:text-sm">
              Fases
            </span>
            <p className="mt-1 text-lg text-background md:text-xl">08 Etapas</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="cinematic-intro-right absolute bottom-24 right-5 sm:bottom-8 sm:right-8 lg:right-12">
        <div className="flex flex-col items-center gap-3 text-background/40">
          <span className="text-sm uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-background/40 to-transparent" />
        </div>
      </div>

      {/* Phase Index */}
      <div className="cinematic-intro-right absolute right-5 top-6 text-right sm:right-8 sm:top-8 lg:right-12">
        <span className="text-xs uppercase tracking-[0.14em] text-background/40 sm:text-sm sm:tracking-widest">
          Introdução
        </span>
        <p className="mt-1 text-3xl font-extralight text-background/20 sm:text-5xl">00</p>
      </div>
    </section>
  );
}
