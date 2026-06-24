"use client";

import { useMemo } from "react";import { PhaseHero } from "@/components/proposta/phase-hero";
import { PhaseSection } from "@/components/proposta/phase-section";
import { CallToAction } from "@/components/proposta/call-to-action";
import { InvestmentSection } from "@/components/proposta/investment-section";
import { TermsSection } from "@/components/proposta/terms-section";
import { FooterCTA } from "@/components/proposta/footer-cta";

interface PhaseItem {
  title: string;
  description: string;
}

interface PhaseData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: PhaseItem[];
  image: string;
  images?: string[];
  variant: "light" | "dark";
  note?: string;
}

interface PropostaData {
  nomeCliente: string;
  cpf: string;
  condominio: string;
  cidade: string;
  metragem: string;
  valorM2: string;
  valorTotal: string;
  dataValidade: string;
  dataDia: string;
  dataMes: string;
  dataAno: string;
  downloadUrl: string;
}

interface PropostaEditorPageProps {
  propostaData: PropostaData;
  phases: PhaseData[];
  isReadonly?: boolean;
  variant?: "apresentacao" | "proposta";
}

export function PropostaEditorPage({
  propostaData,
  phases,
  isReadonly = false,
  variant = "apresentacao",
}: PropostaEditorPageProps) {
  // Imagens estáticas configuradas para uso direto do public
  const heroImage = "/images/hero-bg.jpg";
  const phaseImages = useMemo(() => ({
    "phase-1": "/images/phase-01.jpg",
    "phase-2": "/images/phase-02.png", 
    "phase-3": "/images/phase-03.jpg",
    "phase-4": "/images/phase-04.jpg",
    "phase-5": "/images/phase-05.jpg",
    "phase-6": "/images/phase-06.jpg",
    "phase-7": "/images/phase-07.jpg",
    "phase-8": "/images/phase-08.jpg",
  }), []);

  return (
    <main className="relative pb-20 lg:pb-0">
      <PhaseHero
        nomeCliente={propostaData.nomeCliente}
        dataValidade={propostaData.dataValidade}
        backgroundImage={heroImage}
      />

      {phases.map((phase) => (
        <div key={phase.id}>
          <PhaseSection
            id={phase.id}
            number={phase.number}
            title={phase.title}
            subtitle={phase.subtitle}
            description={phase.description}
            items={phase.items}
            image={phaseImages[phase.id as keyof typeof phaseImages] || phase.image}
            images={phase.images}
            variant={phase.variant}
            note={phase.note}
            sectionIndex={phases.findIndex((p) => p.id === phase.id)}
          />
        </div>
      ))}

      {variant === "proposta" ? (
        <>
          <InvestmentSection
            valorTotal={propostaData.valorTotal}
            valorM2={propostaData.valorM2}
            metragem={propostaData.metragem}
          />
          <TermsSection cidade={propostaData.cidade} condominio={propostaData.condominio} />
          <FooterCTA
            dataDia={propostaData.dataDia}
            dataMes={propostaData.dataMes}
            dataAno={propostaData.dataAno}
            nomeCliente={propostaData.nomeCliente}
            cpf={propostaData.cpf}
            downloadUrl={propostaData.downloadUrl}
          />
        </>
      ) : (
        <CallToAction />
      )}
    </main>
  );
}
