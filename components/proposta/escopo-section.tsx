"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EscopoSectionProps {
  nomeCliente: string;
  cidadeCliente: string;
  telefone: string;
  condominio: string;
  cidadeObra: string;
  objetoProposta: string;
  areaPretendida: string;
  areaTerreno: string;
}

function Block({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("animate-item cinematic-middle-left duration-700", className)}>
      <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-primary md:text-sm">
        {title}
      </h3>
      <div className="mt-4 space-y-2 text-base leading-relaxed text-foreground/80 md:text-lg">
        {children}
      </div>
    </div>
  );
}

export function EscopoSection({
  nomeCliente,
  cidadeCliente,
  telefone,
  condominio,
  cidadeObra,
  objetoProposta,
  areaPretendida,
  areaTerreno,
}: EscopoSectionProps) {
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
      { threshold: 0.1 },
    );

    const elements = contentRef.current?.querySelectorAll(".animate-item");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="escopo"
      className="section-gradient noise-overlay relative min-h-screen w-full overflow-hidden bg-background py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none lg:left-20">
        <span className="text-[25vw] font-extralight leading-none text-foreground/[0.03]">ES</span>
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 lg:pl-32">
        <div className="animate-item cinematic-middle-left mb-12 duration-500">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-extralight text-primary lg:text-7xl">—</span>
            <div className="elegant-divider h-px flex-1 max-w-28" />
          </div>
          <span className="mt-8 block text-xs uppercase tracking-[0.16em] text-foreground/40 md:text-sm">
            Escopo
          </span>
          <h2 className="mt-2 text-3xl font-medium uppercase tracking-wide text-foreground sm:text-4xl lg:text-5xl">
            Escopo
          </h2>
        </div>

        <div className="space-y-10">
          <Block title="Dados do Cliente">
            <p className="text-xl font-medium text-foreground md:text-2xl">{nomeCliente}</p>
            <p>{cidadeCliente}</p>
            <p>Tel {telefone}</p>
          </Block>

          <Block title="Endereço da Obra">
            <p className="text-lg font-medium text-foreground">{condominio}</p>
            <p>{cidadeObra}</p>
          </Block>

          <Block title="Objeto da Proposta">
            <p className="text-lg font-medium text-foreground">{objetoProposta}</p>
            <p>Área pretendida: {areaPretendida}</p>
            <p>Área do Terreno: {areaTerreno}</p>
          </Block>
        </div>
      </div>
    </section>
  );
}
