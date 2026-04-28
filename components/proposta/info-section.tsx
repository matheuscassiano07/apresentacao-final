"use client";

import { useEffect, useRef } from "react";

interface InfoSectionProps {
  nomeCliente: string;
  cpf: string;
  condominio: string;
  cidade: string;
  metragem: string;
}

export function InfoSection({
  nomeCliente,
  cpf,
  condominio,
  cidade,
  metragem,
}: InfoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left Column - Title */}
          <div className="animate-on-scroll relative duration-700">
            <span className="absolute -left-4 -top-8 font-sans text-[120px] font-light leading-none text-muted/60 md:-left-8 md:-top-12 md:text-[180px]">
              01
            </span>
            <h2 className="relative z-10 pt-16 font-sans text-2xl font-medium uppercase tracking-widest text-primary md:pt-24 md:text-3xl">
              Informações
            </h2>
          </div>

          {/* Right Column - Info Blocks */}
          <div className="animate-on-scroll space-y-0 duration-700">
            {/* Block A - Client */}
            <div className="border-b border-border py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Cliente
                  </span>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {nomeCliente}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    CPF
                  </span>
                  <p className="mt-1 text-lg font-medium text-foreground">{cpf}</p>
                </div>
              </div>
            </div>

            {/* Block B - Location */}
            <div className="border-b border-border py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Local da Obra
                  </span>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {condominio}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Cidade
                  </span>
                  <p className="mt-1 text-lg font-medium text-foreground">{cidade}</p>
                </div>
              </div>
            </div>

            {/* Block C - Project */}
            <div className="py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Objeto
                  </span>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    Projeto Residencial
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Área Construída
                  </span>
                  <p className="mt-1 text-lg font-medium text-foreground">
                    {metragem} m²
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
