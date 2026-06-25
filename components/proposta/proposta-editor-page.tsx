"use client";

import { PhaseHero } from "@/components/proposta/phase-hero";
import { EscopoSection } from "@/components/proposta/escopo-section";
import { PhaseSection } from "@/components/proposta/phase-section";
import { CallToAction } from "@/components/proposta/call-to-action";
import { InvestmentSection } from "@/components/proposta/investment-section";
import { TermsSection } from "@/components/proposta/terms-section";
import { FooterCTA } from "@/components/proposta/footer-cta";
import type { ImageAdjustments } from "@/lib/proposta-image-fit";
import { criarAjusteImagem } from "@/lib/proposta-image-fit";

interface PhaseData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  images?: string[];
  gallery?: ImageAdjustments[];
  variant: "light" | "dark";
}

interface PropostaData {
  nomeCliente: string;
  cpf: string;
  condominio: string;
  cidade: string;
  cidadeCliente: string;
  cidadeObra: string;
  telefone: string;
  objetoProposta: string;
  areaPretendida: string;
  areaTerreno: string;
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
  heroImage?: ImageAdjustments;
  isReadonly?: boolean;
  variant?: "apresentacao" | "proposta";
}

export function PropostaEditorPage({
  propostaData,
  phases,
  heroImage = criarAjusteImagem("/images/hero-bg.jpg"),
  isReadonly = false,
  variant = "apresentacao",
}: PropostaEditorPageProps) {
  return (
    <main id="proposta-export-root" className="proposta-compact relative pb-16 lg:pb-0">
      <div className="proposta-section">
        <PhaseHero
          nomeCliente={propostaData.nomeCliente}
          dataValidade={propostaData.dataValidade}
          backgroundImage={heroImage}
          headline={variant === "proposta" ? "Proposta" : "Apresentação"}
        />
      </div>

      {variant === "proposta" ? (
        <div className="proposta-section">
          <EscopoSection
            nomeCliente={propostaData.nomeCliente}
            cidadeCliente={propostaData.cidadeCliente}
            telefone={propostaData.telefone}
            condominio={propostaData.condominio}
            cidadeObra={propostaData.cidadeObra}
            objetoProposta={propostaData.objetoProposta}
            areaPretendida={propostaData.areaPretendida}
            areaTerreno={propostaData.areaTerreno}
          />
        </div>
      ) : null}

      {phases.map((phase, index) => (
        <div key={phase.id} className="proposta-section">
          <PhaseSection
            id={phase.id}
            number={phase.number}
            title={phase.title}
            subtitle={phase.subtitle}
            description={phase.description}
            image={phase.image}
            images={phase.images}
            gallery={phase.gallery}
            variant={phase.variant}
            sectionIndex={index}
          />
        </div>
      ))}

      {variant === "proposta" ? (
        <>
          <div className="proposta-section">
            <InvestmentSection
              valorTotal={propostaData.valorTotal}
              valorM2={propostaData.valorM2}
              metragem={propostaData.metragem}
            />
          </div>
          <div className="proposta-section">
            <TermsSection
              cidade={propostaData.cidade}
              condominio={propostaData.condominio}
              metragem={propostaData.metragem}
              valorM2={propostaData.valorM2}
              valorTotal={propostaData.valorTotal}
            />
          </div>
          <div className="proposta-section">
            <FooterCTA
              dataDia={propostaData.dataDia}
              dataMes={propostaData.dataMes}
              dataAno={propostaData.dataAno}
              nomeCliente={propostaData.nomeCliente}
              cpf={propostaData.cpf}
            />
          </div>
        </>
      ) : (
        <div className="proposta-section">
          <CallToAction nomeCliente={propostaData.nomeCliente} />
        </div>
      )}
    </main>
  );
}
