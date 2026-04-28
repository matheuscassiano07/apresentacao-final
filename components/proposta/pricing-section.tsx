"use client";

import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

interface PricingSectionProps {
  valorTotal: string;
  valorM2: string;
  metragem: string;
}

export function PricingSection({
  valorTotal,
  valorM2,
  metragem,
}: PricingSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "zoom-in-95");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calcula as parcelas (20% cada)
  const valorNumerico = parseFloat(valorTotal.replace(/\./g, "").replace(",", "."));
  const parcela20 = (valorNumerico * 0.2).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-8 md:px-12">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-medium uppercase tracking-widest text-foreground md:text-3xl">
            O Investimento
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Condições de pagamento para seu projeto de {metragem}
          </p>
        </div>

        {/* Pricing Card */}
        <div
          ref={cardRef}
          className="mt-12 bg-card shadow-xl duration-700"
        >
          {/* Header */}
          <div className="bg-primary px-8 py-10 text-center">
            <span className="text-sm uppercase tracking-widest text-primary-foreground/80">
              Valor Total do Projeto
            </span>
            <p className="mt-4 text-5xl font-light text-primary-foreground md:text-6xl">
              R$ {valorTotal}
            </p>
            <p className="mt-2 text-lg text-primary-foreground/80">
              R$ {valorM2}/m² x {metragem}
            </p>
          </div>

          {/* Parcelas */}
          <div className="px-8 py-10 md:px-12">
            <h3 className="font-sans text-sm font-medium uppercase tracking-widest text-foreground">
              Forma de Pagamento
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4 border-b border-border pb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  1ª
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">20% no ato da assinatura</p>
                  <p className="mt-1 text-2xl font-light text-primary">R$ {parcela20}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 border-b border-border pb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  2ª
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">20% em 30 dias</p>
                  <p className="mt-1 text-2xl font-light text-primary">R$ {parcela20}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 border-b border-border pb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  3ª
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">20% em 60 dias</p>
                  <p className="mt-1 text-2xl font-light text-primary">R$ {parcela20}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 border-b border-border pb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  4ª
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">20% em 90 dias</p>
                  <p className="mt-1 text-2xl font-light text-primary">R$ {parcela20}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-medium text-primary-foreground">
                  5ª
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">20% na entrega do Projeto Executivo</p>
                  <p className="mt-1 text-2xl font-light text-primary">R$ {parcela20}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pagamento pode ser via boleto. Valor pode sofrer alteração conforme metragem final.
                  </p>
                </div>
              </li>
            </ul>

            {/* Acréscimos */}
            <div className="mt-8 border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Acréscimo de área:</strong> Para cada metro quadrado aumentado no projeto será acrescido R$ {valorM2}.
              </p>
            </div>
          </div>
        </div>

        {/* O que está incluso / não incluso */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Incluso */}
          <div className="bg-card p-8 shadow-lg">
            <h3 className="font-sans text-sm font-medium uppercase tracking-widest text-foreground">
              Incluso no Valor
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                "Todas as 5 etapas do projeto arquitetônico",
                "Visita e análise do local",
                "Aprovação na Prefeitura e Condomínio",
                "Coordenação e compatibilização de projetos",
                "Anotação de Responsabilidade Técnica (ART)",
                "Visitas técnicas na obra (locação, concretagens)",
                "Arquivos digitais (DWG e PDF) e cópia impressa",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Não Incluso */}
          <div className="bg-card p-8 shadow-lg">
            <h3 className="font-sans text-sm font-medium uppercase tracking-widest text-foreground">
              Não Incluso (responsabilidade do contratante)
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                "Registro na Prefeitura, taxas, emolumentos, impostos",
                "Plotagens, placa de obra, cópias, maquetes físicas",
                "Imagens foto-renderizadas",
                "Viagens com motoboy",
                "Projeto técnico de elétrica (detalhamento)",
                "Projeto técnico de hidráulica (detalhamento)",
                "Projeto técnico estrutural",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-muted">
                    <X className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Os projetos técnicos serão elaborados por profissionais indicados pelo escritório Bevilacqua ou pelo cliente.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border border-border bg-secondary/50 px-8 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Proposta válida por 30 dias a partir da data de emissão
          </p>
        </div>
      </div>
    </section>
  );
}
