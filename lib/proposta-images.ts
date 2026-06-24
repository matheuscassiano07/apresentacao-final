import { buildPropostaPhases } from "@/lib/proposta-phases";

type QueryValue = string | string[] | undefined;

export interface PropostaImageOverrides {
  hero?: string;
  phases: Record<string, string>;
  phaseExtras: Record<string, string[]>;
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
  phase10Extra: "/images/phase-13.jpg",
} as const;

function getFirstValue(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function parseImageOverrides(
  searchParams: Record<string, QueryValue>,
): PropostaImageOverrides {
  const phases: Record<string, string> = {};
  const phaseExtras: Record<string, string[]> = {};

  for (let i = 1; i <= 12; i += 1) {
    const key = String(i).padStart(2, "0");
    const value = getFirstValue(searchParams[`img_${key}`]).trim();
    if (value) phases[key] = value;
  }

  const hero = getFirstValue(searchParams.img_hero).trim();
  const phase10Extra = getFirstValue(searchParams.img_10_2).trim();
  if (phase10Extra) {
    phaseExtras["10"] = [phase10Extra];
  }

  return {
    hero: hero || undefined,
    phases,
    phaseExtras,
  };
}

export function applyImageOverrides(
  phases = buildPropostaPhases(),
  overrides: PropostaImageOverrides,
) {
  return phases.map((phase) => {
    const key = phase.number;
    const customImage = overrides.phases[key];
    const extras = overrides.phaseExtras[key];

    const image = customImage || phase.image;
    const images = extras?.length
      ? [image, ...extras]
      : customImage
        ? [customImage, ...(phase.images?.slice(1) ?? [])]
        : phase.images;

    return {
      ...phase,
      image,
      images,
    };
  });
}

export function resolveHeroImage(overrides: PropostaImageOverrides): string {
  return overrides.hero || DEFAULT_PROPOSTA_IMAGES.hero;
}

export function imageFieldsFromDefaults() {
  return {
    img_hero: DEFAULT_PROPOSTA_IMAGES.hero,
    ...Object.fromEntries(
      Object.entries(DEFAULT_PROPOSTA_IMAGES.phases).map(([key, value]) => [`img_${key}`, value]),
    ),
    img_10_2: DEFAULT_PROPOSTA_IMAGES.phase10Extra,
  };
}
