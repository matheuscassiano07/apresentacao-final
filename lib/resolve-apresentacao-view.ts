import { buildPropostaData } from "@/lib/proposta-data";
import { buildPropostaPhases } from "@/lib/proposta-phases";
import {
  applyImageOverrides,
  parseImageOverrides,
  resolveHeroImage,
} from "@/lib/proposta-images";

type QueryValue = string | string[] | undefined;

export function resolveApresentacaoView(
  searchParams: Record<string, QueryValue>,
  variant: "apresentacao" | "proposta",
) {
  const propostaData = buildPropostaData(searchParams);
  const imageOverrides = parseImageOverrides(searchParams);
  const phases = applyImageOverrides(buildPropostaPhases(), imageOverrides);
  const heroImage = resolveHeroImage(imageOverrides);
  const rawReadonly = searchParams.readonly;
  const readonlyValue = Array.isArray(rawReadonly) ? rawReadonly[0] : rawReadonly;
  const isReadonly = readonlyValue === "1";

  return {
    propostaData,
    phases,
    heroImage,
    isReadonly,
    variant,
  };
}
