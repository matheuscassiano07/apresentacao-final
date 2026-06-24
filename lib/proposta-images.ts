import { buildPropostaPhases } from "@/lib/proposta-phases";

type QueryValue = string | string[] | undefined;

export interface PropostaImageOverrides {
  hero?: string;
  phaseImages: Record<string, string[]>;
}

export const DEFAULT_PROPOSTA_IMAGES = {
  hero: "/images/hero-bg.jpg",
  phases: {
    "01": "/images/phase-01.jpg",
    "02": "/images/phase-02.png",
    "03": "/images/phase-03.jpg",
    "04": "/images/phase-04.jpg",
    "05": "/images/phase-05.jpg",
    "06": "/images/phase-06.jpg",
    "07": "/images/phase-07.jpg",
    "08": "/images/phase-08.jpg",
    "09": "/images/phase-09.jpg",
    "10": "/images/phase-10.jpg",
    "11": "/images/phase-11.jpg",
    "12": "/images/phase-12.jpg",
  },
} as const;

function getFirstValue(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function parseImageList(raw: string): string[] {
  return raw
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parsePhaseImages(searchParams: Record<string, QueryValue>, phaseKey: string): string[] {
  const images: string[] = [];
  const main = getFirstValue(searchParams[`img_${phaseKey}`]).trim();
  if (main) images.push(...parseImageList(main));

  for (let index = 2; index <= 12; index += 1) {
    const legacy = getFirstValue(searchParams[`img_${phaseKey}_${index}`]).trim();
    if (legacy) images.push(legacy);
  }

  return images;
}

export function parseImageOverrides(
  searchParams: Record<string, QueryValue>,
): PropostaImageOverrides {
  const phaseImages: Record<string, string[]> = {};

  for (let i = 1; i <= 12; i += 1) {
    const key = String(i).padStart(2, "0");
    const list = parsePhaseImages(searchParams, key);
    if (list.length > 0) phaseImages[key] = list;
  }

  const hero = getFirstValue(searchParams.img_hero).trim();

  return {
    hero: hero || undefined,
    phaseImages,
  };
}

export function applyImageOverrides(
  phases = buildPropostaPhases(),
  overrides: PropostaImageOverrides,
) {
  return phases.map((phase) => {
    const customImages = overrides.phaseImages[phase.number];
    if (!customImages?.length) return phase;

    return {
      ...phase,
      image: customImages[0],
      images: customImages,
    };
  });
}

export function resolveHeroImage(overrides: PropostaImageOverrides): string {
  return overrides.hero || DEFAULT_PROPOSTA_IMAGES.hero;
}

export function defaultPhaseImageLists(): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(DEFAULT_PROPOSTA_IMAGES.phases).map(([key, value]) => [key, [value]]),
  );
}

export function serializePhaseImages(phaseImages: Record<string, string[]>): Record<string, string> {
  const serialized: Record<string, string> = {};
  Object.entries(phaseImages).forEach(([key, urls]) => {
    const filtered = urls.map((url) => url.trim()).filter(Boolean);
    if (filtered.length > 0) serialized[`img_${key}`] = filtered.join("|");
  });
  return serialized;
}
