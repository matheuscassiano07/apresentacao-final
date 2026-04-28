"use client";

import { useMemo, useState } from "react";
import { Link2 } from "lucide-react";
import { PhaseNavigation } from "@/components/proposta/phase-navigation";
import { PhaseHero } from "@/components/proposta/phase-hero";
import { PhaseSection } from "@/components/proposta/phase-section";
import { InvestmentSection } from "@/components/proposta/investment-section";
import { FooterCTA } from "@/components/proposta/footer-cta";
import { propostaDataToPayload } from "@/lib/proposta-data";

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
  variant: "light" | "dark";
  note?: string;
}

interface PropostaData {
  nomeCliente: string;
  cpf: string;
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
}

export function PropostaEditorPage({
  propostaData,
  phases,
  isReadonly = false,
}: PropostaEditorPageProps) {
  const [heroImage, setHeroImage] = useState(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
  );
  const [phaseImages, setPhaseImages] = useState<Record<string, string>>(
    Object.fromEntries(phases.map((phase) => [phase.id, phase.image]))
  );

  const phaseLabels = useMemo(
    () => phases.map((phase) => ({ id: phase.id, label: `${phase.number} - ${phase.title}` })),
    [phases]
  );
  const [clientViewLink, setClientViewLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [linkStatus, setLinkStatus] = useState("");

  const onPickImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: "hero" | string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === "string" ? reader.result : "";
      if (!content) return;

      if (target === "hero") {
        setHeroImage(content);
      } else {
        setPhaseImages((prev) => ({ ...prev, [target]: content }));
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const resetImages = () => {
    setHeroImage("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80");
    setPhaseImages(Object.fromEntries(phases.map((phase) => [phase.id, phase.image])));
  };

  const gerarLinkCliente = async () => {
    setLinkError("");
    try {
      const payload = propostaDataToPayload(propostaData);
      const response = await fetch("/api/share-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.erro || "Falha ao gerar link.");
      }
      const body = await response.json();
      const url = body.url || "";
      setClientViewLink(url);
      if (url) {
        await navigator.clipboard.writeText(url);
        setLinkStatus("Link copiado!");
        setTimeout(() => setLinkStatus(""), 2500);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado.";
      setLinkError(message);
    }
  };

  return (
    <main className="relative pb-20 lg:pb-0 lg:pl-20">
      <PhaseNavigation />

      {!isReadonly && (
        <div className="fixed right-3 top-3 z-50 max-h-[85vh] w-[320px] overflow-auto rounded border border-foreground/20 bg-background/95 p-4 shadow-lg backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
            Editar Fotos
          </p>
          <p className="mt-1 text-xs text-foreground/50">
            Envie imagens do seu computador e veja a proposta atualizar na hora.
          </p>

          <label className="mt-4 block text-xs uppercase tracking-widest text-foreground/50">
            Capa (Hero)
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-xs"
              onChange={(event) => onPickImage(event, "hero")}
            />
          </label>

          {phaseLabels.map((phase) => (
            <label
              key={phase.id}
              className="mt-3 block border-t border-foreground/10 pt-3 text-xs uppercase tracking-widest text-foreground/50"
            >
              {phase.label}
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-xs"
                onChange={(event) => onPickImage(event, phase.id)}
              />
            </label>
          ))}

          <button
            type="button"
            className="mt-4 w-full border border-foreground/20 px-3 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
            onClick={resetImages}
          >
            Resetar Fotos
          </button>

          {clientViewLink && (
            <div className="mt-4 border-t border-foreground/10 pt-4">
              <p className="text-[11px] uppercase tracking-widest text-foreground/50">
                Último link de visualização gerado
              </p>
              <input
                readOnly
                value={clientViewLink}
                className="mt-2 w-full border border-foreground/20 bg-background px-2 py-2 text-xs text-foreground"
              />
            </div>
          )}
          {linkError && <p className="mt-3 text-xs text-red-600">{linkError}</p>}
        </div>
      )}

      {!isReadonly && (
        <div className="fixed bottom-24 right-4 z-50 sm:bottom-6 sm:right-6">
          {linkStatus && (
            <div className="mb-2 rounded border border-primary/40 bg-background px-3 py-2 text-xs text-foreground shadow-lg">
              {linkStatus}
            </div>
          )}
          <button
            type="button"
            onClick={gerarLinkCliente}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background shadow-[0_16px_34px_rgba(145,20,25,0.45)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            aria-label="Gerar link para cliente"
            title="Gerar link para cliente"
          >
            <Link2 className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
          </button>
        </div>
      )}

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
            image={isReadonly ? phase.image : (phaseImages[phase.id] ?? phase.image)}
            variant={phase.variant}
            note={phase.note}
            sectionIndex={phases.findIndex((p) => p.id === phase.id)}
          />
        </div>
      ))}

      <InvestmentSection
        valorTotal={propostaData.valorTotal}
        valorM2={propostaData.valorM2}
        metragem={propostaData.metragem}
      />

      <FooterCTA
        dataDia={propostaData.dataDia}
        dataMes={propostaData.dataMes}
        dataAno={propostaData.dataAno}
        nomeCliente={propostaData.nomeCliente}
        cpf={propostaData.cpf}
        downloadUrl={propostaData.downloadUrl}
      />
    </main>
  );
}
