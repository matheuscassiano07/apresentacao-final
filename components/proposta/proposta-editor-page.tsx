"use client";

import { PhaseHero } from "@/components/proposta/phase-hero";
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
  heroImage?: string;
  isReadonly?: boolean;
  variant?: "apresentacao" | "proposta";
}

export function PropostaEditorPage({
  propostaData,
  phases,
  heroImage = "/images/hero-bg.jpg",
  isReadonly = false,
  variant = "apresentacao",
}: PropostaEditorPageProps) {
  return (
    <main className="relative pb-20 lg:pb-0">
      <PhaseHero
        nomeCliente={propostaData.nomeCliente}
        dataValidade={propostaData.dataValidade}
        backgroundImage={heroImage}
      />

      {phases.map((phase, index) => (
        <div key={phase.id}>
          <PhaseSection
            id={phase.id}
            number={phase.number}
            title={phase.title}
            subtitle={phase.subtitle}
            description={phase.description}
            items={phase.items}
            image={phase.image}
            images={phase.images}
            variant={phase.variant}
            note={phase.note}
            sectionIndex={index}
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
