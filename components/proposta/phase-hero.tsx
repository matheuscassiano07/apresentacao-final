"use client";

import Image from "next/image";

interface PhaseHeroProps {
  nomeCliente: string;
  dataValidade: string;
  backgroundImage?: string;
}

export function PhaseHero({ backgroundImage }: PhaseHeroProps) {
  return (
    <section id="intro" className="section-gradient relative h-screen w-full overflow-hidden bg-foreground">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Imagem de capa da proposta"
            fill
            className="object-cover opacity-45 cinematic-image-intro"
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
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="max-w-4xl text-center font-light leading-tight text-background">
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-letter-slide-up animate-text-glow">Apresentação</span>
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-2 animate-letter-slide-up animate-floating-text" style={{ animationDelay: "200ms" }}>Bevilacqua</span>
        </h1>
      </div>

    </section>
  );
}
