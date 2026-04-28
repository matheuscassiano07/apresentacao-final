"use client";

import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";

interface InvestmentSectionProps {
  valorTotal: string;
  valorM2: string;
  metragem: string;
}

export function InvestmentSection({
  valorTotal,
  valorM2,
  metragem,
}: InvestmentSectionProps) {
  const bevilacquaLogoUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-9mRrvj28aRZ67rPbc0QVFN9MRd8ZjD.webp";

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

    const elements = sectionRef.current?.querySelectorAll(".animate-item");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const valorNumerico = parseFloat(valorTotal.replace(/\./g, "").replace(",", "."));
  const parcela20 = (valorNumerico * 0.2).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const parcelas = [
    { numero: "1", descricao: "No ato da assinatura", prazo: "Imediato" },
    { numero: "2", descricao: "Segunda parcela", prazo: "30 dias" },
    { numero: "3", descricao: "Terceira parcela", prazo: "60 dias" },
    { numero: "4", descricao: "Quarta parcela", prazo: "90 dias" },
    { numero: "5", descricao: "Na entrega do executivo", prazo: "Final" },
  ];

  const incluso = [
    "Todas as 8 etapas do projeto arquitetônico",
    "Visita e análise do local",
    "Aprovação na Prefeitura e Condomínio",
    "Coordenação e compatibilização de projetos",
    "Anotação de Responsabilidade Técnica (ART)",
    "Visitas técnicas na obra",
    "Arquivos digitais (DWG e PDF)",
  ];

  const naoIncluso = [
    "Registro na Prefeitura, taxas, emolumentos",
    "Plotagens, placa de obra, cópias",
    "Imagens foto-renderizadas",
    "Projeto técnico de elétrica",
    "Projeto técnico de hidráulica",
    "Projeto técnico estrutural",
  ];

  return (
    <section
      ref={sectionRef}
      id="investimento"
      className="section-gradient noise-overlay relative min-h-screen bg-background py-16 lg:py-28"
    >
      {/* Large Number Background */}
      <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none lg:left-20">
        <span className="text-[25vw] font-extralight leading-none text-foreground/[0.03]">
          09
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 lg:pl-32">
        {/* Header */}
        <div className="animate-item cinematic-middle-left mb-16 duration-500">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-extralight text-primary lg:text-7xl">09</span>
            <div className="elegant-divider h-px flex-1 max-w-28" />
          </div>
          <span className="mt-8 block text-xs uppercase tracking-[0.16em] text-foreground/40 md:text-sm">
            Investimento
          </span>
          <h2 className="mt-2 text-3xl font-medium uppercase tracking-wide text-foreground sm:text-4xl lg:text-5xl">
            Condições Comerciais
          </h2>
        </div>

        {/* Valor Principal */}
        <div className="animate-item cinematic-middle-zoom mb-16 duration-500" style={{ transitionDelay: "100ms" }}>
          <div className="overflow-hidden rounded-2xl border border-foreground/30 bg-foreground p-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.2)] lg:p-16">
            <span className="text-xs uppercase tracking-[0.16em] text-background/40 md:text-sm">
              Valor Total do Projeto
            </span>
            <p className="mt-4 text-4xl font-medium tracking-tight text-background sm:text-5xl lg:text-7xl">
              R$ {valorTotal}
            </p>
            <p className="mt-4 text-base text-background/75 sm:text-xl">
              {metragem} x R$ {valorM2}/m²
            </p>
          </div>
        </div>

        {/* Parcelas */}
        <div className="animate-item cinematic-middle-right mb-16 duration-500" style={{ transitionDelay: "200ms" }}>
          <h3 className="mb-6 text-xs uppercase tracking-[0.16em] text-foreground/40 md:text-sm">
            Forma de Pagamento - 5x de 20%
          </h3>
          <div className="grid gap-4 md:grid-cols-5">
            {parcelas.map((parcela, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-foreground/20 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-5xl font-extralight text-primary">
                  {parcela.numero}
                </span>
                <p className="mt-4 text-xs uppercase tracking-[0.13em] text-foreground/40 md:text-sm">
                  {parcela.prazo}
                </p>
                <p className="mt-2 text-lg font-medium text-foreground sm:text-xl">
                  R$ {parcela20}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Incluso / Não Incluso */}
        <div
          className="animate-item cinematic-middle-zoom grid gap-8 lg:grid-cols-2 duration-500"
          style={{ transitionDelay: "300ms" }}
        >
          {/* Incluso */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.13em] text-foreground md:text-sm">
              <div className="flex h-7 w-7 items-center justify-center bg-primary">
                <Check className="h-4 w-4 text-background" />
              </div>
              Incluso no Valor
            </h3>
            <ul className="space-y-4">
              {incluso.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-foreground/75">
                  <span className="text-primary">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Não Incluso */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.13em] text-foreground md:text-sm">
              <div className="flex h-7 w-7 items-center justify-center bg-muted">
                <X className="h-4 w-4 text-foreground/60" />
              </div>
              Não Incluso
            </h3>
            <ul className="space-y-4">
              {naoIncluso.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-foreground/60">
                  <span className="text-foreground/30">-</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-foreground/45 md:text-base">
              Projetos técnicos serão elaborados por profissionais indicados.
            </p>
          </div>
        </div>

        {/* Observação */}
        <div
          className="animate-item cinematic-outro-left mt-12 rounded-r-lg border-l-2 border-primary bg-background py-4 pl-6 duration-500"
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-base text-foreground/70 md:text-lg">
            <strong className="text-foreground">Acréscimo de área:</strong> Para cada metro
            quadrado aumentado no projeto será acrescido R$ {valorM2}. Valor pode sofrer
            alteração conforme metragem final.
          </p>
        </div>

        <div className="animate-item mt-10 flex justify-center" style={{ transitionDelay: "480ms" }}>
          <Image
            src={bevilacquaLogoUrl}
            alt="Bevilacqua Arquitetura e Engenharia"
            width={420}
            height={88}
            className="h-auto w-56 opacity-90 sm:w-64"
          />
        </div>
      </div>
    </section>
  );
}
