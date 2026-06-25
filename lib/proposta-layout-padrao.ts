import type { ImageAdjustments, PropostaImagensPayload } from "@/lib/proposta-image-fit";
import { normalizarAjusteImagem } from "@/lib/proposta-image-fit";
import type { PropostaDestino } from "@/lib/proposta-store";

export interface PropostaLayoutPadrao {
  destino: PropostaDestino;
  hero: ImageAdjustments;
  phases: Record<string, ImageAdjustments[]>;
  atualizadoEm: string;
}

export type LayoutPadraoPayload = {
  destino: PropostaDestino;
  imagens: PropostaImagensPayload;
};

const STORAGE_PREFIX = "bevilacqua-layout-padrao";

export function chaveLayoutLocal(destino: PropostaDestino): string {
  return `${STORAGE_PREFIX}-${destino}`;
}

export function normalizarLayoutPadrao(input: LayoutPadraoPayload): PropostaLayoutPadrao {
  const hero = normalizarAjusteImagem(input.imagens.hero);
  const phasesComSlots: Record<string, ImageAdjustments[]> = {};

  Object.entries(input.imagens.phases ?? {}).forEach(([key, slots]) => {
    const lista = Array.isArray(slots) ? slots : [];
    if (lista.length === 0) return;
    phasesComSlots[key] = lista.map((slot) => normalizarAjusteImagem(slot));
  });

  return {
    destino: input.destino,
    hero,
    phases: phasesComSlots,
    atualizadoEm: new Date().toISOString(),
  };
}

export function layoutParaPayload(layout: PropostaLayoutPadrao): LayoutPadraoPayload {
  return {
    destino: layout.destino,
    imagens: { hero: layout.hero, phases: layout.phases },
  };
}

export function salvarLayoutLocal(layout: PropostaLayoutPadrao): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(chaveLayoutLocal(layout.destino), JSON.stringify(layout));
  } catch {
    // quota ou modo privado
  }
}

export function carregarLayoutLocal(destino: PropostaDestino): PropostaLayoutPadrao | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(chaveLayoutLocal(destino));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PropostaLayoutPadrao;
    return normalizarLayoutPadrao({
      destino: parsed.destino ?? destino,
      imagens: { hero: parsed.hero, phases: parsed.phases ?? {} },
    });
  } catch {
    return null;
  }
}
