import { buildPropostaData } from "@/lib/proposta-data";
import { applyImageOverrides, parseImageOverrides } from "@/lib/proposta-images";
import { buildPhasesForVariant } from "@/lib/proposta-phases";
import { carregarProposta, propostaSalvaParaSearchParams } from "@/lib/proposta-store";
import { resolveApresentacaoView } from "@/lib/resolve-apresentacao-view";

const BACKEND_URL = process.env.BACKEND_URL?.trim().replace(/\/$/, "");

async function carregarPayloadRemoto(slug: string): Promise<Record<string, string> | null> {
  if (!BACKEND_URL) return null;
  const response = await fetch(`${BACKEND_URL}/proposta-dados/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!response.ok) return null;
  const payload = await response.json();
  if (!payload || typeof payload !== "object") return null;
  return payload as Record<string, string>;
}

export async function resolvePropostaPorSlug(slug: string, destinoPreferido?: "proposta" | "apresentacao") {
  const salva = await carregarProposta(slug);
  if (salva) {
    const variant = destinoPreferido ?? salva.destino;
    const searchParams = propostaSalvaParaSearchParams(salva);
    const view = resolveApresentacaoView(searchParams, variant);
    return { view, salva };
  }

  const remoto = await carregarPayloadRemoto(slug);
  if (remoto) {
    const view = resolveApresentacaoView(remoto, destinoPreferido ?? "apresentacao");
    return { view, salva: null };
  }

  return null;
}

export function buildPropostaDataFromPayload(payload: Record<string, string>) {
  return buildPropostaData(payload);
}

export function buildPhasesFromPayload(
  payload: Record<string, string>,
  variant: "apresentacao" | "proposta" = "proposta",
) {
  const imageOverrides = parseImageOverrides(payload, variant);
  return applyImageOverrides(buildPhasesForVariant(variant), imageOverrides);
}
