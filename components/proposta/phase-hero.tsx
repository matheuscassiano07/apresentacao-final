"use client";

import { PropostaImage } from "@/components/proposta/proposta-image";
import type { ImageAdjustments } from "@/lib/proposta-image-fit";
import { ajusteImagemParaEstilo } from "@/lib/proposta-image-fit";

interface PhaseHeroProps {
  nomeCliente: string;
  dataValidade: string;
  backgroundImage?: ImageAdjustments;
  headline?: string;
}

export function PhaseHero({ backgroundImage, headline = "Apresentação" }: PhaseHeroProps) {
  const src = backgroundImage?.url;

  return (
    <section id="intro" className="section-gradient relative h-screen w-full overflow-hidden bg-foreground">
      {src ? (
        <div className="absolute inset-0 overflow-hidden">
          <PropostaImage
            src={src}
            alt="Imagem de capa da proposta"
            fill
            className="opacity-45 cinematic-image-intro"
            style={ajusteImagemParaEstilo(backgroundImage ?? { url: src })}
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ) : null}

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            rgba(255,255,255,0.1) 100px,
            rgba(255,255,255,0.1) 101px
          )`,
          }}
        />
      </div>

      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none sm:-right-16">
        <span className="text-[34vw] font-extralight leading-none text-background/[0.03] sm:text-[38vw]">
          00
        </span>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-4xl text-center">
          <h1 className="font-light leading-tight text-background px-4">
            <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl animate-letter-slide-up">
              {headline}
            </span>
            <span
              className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 sm:mt-3 animate-letter-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              Bevilacqua
            </span>
          </h1>
          <p
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-background/80 px-6 sm:px-0 animate-fade-lift"
            style={{ animationDelay: "400ms" }}
          >
            Paixão pelo essencial. Precisão no extraordinário.
          </p>
        </div>
      </div>
    </section>
  );
}
