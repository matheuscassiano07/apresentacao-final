import { buildPropostaData } from "@/lib/proposta-data";
import { buildPhasesForVariant } from "@/lib/proposta-phases";
import {
  applyImageOverrides,
  parseImageOverrides,
  resolveHeroImage,
  type PropostaPhaseView,
} from "@/lib/proposta-images";
import type { ImageAdjustments } from "@/lib/proposta-image-fit";

type QueryValue = string | string[] | undefined;

export function resolveApresentacaoView(
  searchParams: Record<string, QueryValue>,
  variant: "apresentacao" | "proposta",
) {
  const propostaData = buildPropostaData(searchParams);
  const imageOverrides = parseImageOverrides(searchParams, variant);
  const phases: PropostaPhaseView[] = applyImageOverrides(
    buildPhasesForVariant(variant),
    imageOverrides,
  );
  const heroImage: ImageAdjustments = resolveHeroImage(imageOverrides);
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
