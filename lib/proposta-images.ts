import { buildPhasesForVariant, type PropostaPhase } from "@/lib/proposta-phases";
import {
  type ImageAdjustments,
  criarAjusteImagem,
  normalizarAjusteImagem,
  parseAjustesLista,
  serializarAjustesLista,
} from "@/lib/proposta-image-fit";

type QueryValue = string | string[] | undefined;

export type PropostaPhaseView = PropostaPhase & {
  gallery: ImageAdjustments[];
};

export interface PropostaImageOverrides {
  hero?: string;
  heroAdjustments?: ImageAdjustments;
  phaseImages: Record<string, string[]>;
  phaseAdjustments: Record<string, ImageAdjustments[]>;
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

function combinarUrlsEAjustes(urls: string[], ajustesBase: ImageAdjustments[]): ImageAdjustments[] {
  return urls.map((url, index) =>
    normalizarAjusteImagem({
      url,
      fit: ajustesBase[index]?.fit,
      posX: ajustesBase[index]?.posX,
      posY: ajustesBase[index]?.posY,
      scale: ajustesBase[index]?.scale,
      shape: ajustesBase[index]?.shape,
      fullBleed: ajustesBase[index]?.fullBleed,
    }),
  );
}

export function parseImageOverrides(
  searchParams: Record<string, QueryValue>,
  variant: "apresentacao" | "proposta" = "apresentacao",
): PropostaImageOverrides {
  const phaseImages: Record<string, string[]> = {};
  const phaseAdjustments: Record<string, ImageAdjustments[]> = {};
  const total = buildPhasesForVariant(variant).length;

  for (let i = 1; i <= total; i += 1) {
    const key = String(i).padStart(2, "0");
    const urls = parsePhaseImages(searchParams, key);
    if (urls.length > 0) {
      phaseImages[key] = urls;
      const metaRaw = getFirstValue(searchParams[`img_${key}_meta`]).trim();
      phaseAdjustments[key] = combinarUrlsEAjustes(urls, parseAjustesLista(metaRaw, urls.length));
    }
  }

  const heroUrl = getFirstValue(searchParams.img_hero).trim();
  const heroMetaRaw = getFirstValue(searchParams.img_hero_meta).trim();
  let heroAdjustments: ImageAdjustments | undefined;
  if (heroUrl) {
    try {
      const meta = heroMetaRaw ? (JSON.parse(heroMetaRaw) as Partial<ImageAdjustments>) : {};
      heroAdjustments = normalizarAjusteImagem({ ...meta, url: heroUrl });
    } catch {
      heroAdjustments = normalizarAjusteImagem(heroUrl);
    }
  }

  return {
    hero: heroUrl || undefined,
    heroAdjustments,
    phaseImages,
    phaseAdjustments,
  };
}

export function applyImageOverrides(
  phases: PropostaPhase[],
  overrides: PropostaImageOverrides,
): PropostaPhaseView[] {
  return phases.map((phase) => {
    const customImages = overrides.phaseImages[phase.number];
    if (!customImages?.length) {
      return { ...phase, gallery: [criarAjusteImagem(phase.image)] };
    }

    const gallery =
      overrides.phaseAdjustments[phase.number] ??
      combinarUrlsEAjustes(customImages, []);

    return {
      ...phase,
      image: gallery[0]?.url ?? customImages[0],
      images: gallery.map((item) => item.url),
      gallery,
    };
  });
}

export function resolveHeroImage(overrides: PropostaImageOverrides): ImageAdjustments {
  if (overrides.heroAdjustments) return overrides.heroAdjustments;
  if (overrides.hero) return normalizarAjusteImagem(overrides.hero);
  return normalizarAjusteImagem(DEFAULT_PROPOSTA_IMAGES.hero);
}

export function defaultPhaseImageLists(
  variant: "apresentacao" | "proposta" = "apresentacao",
): Record<string, ImageAdjustments[]> {
  return Object.fromEntries(
    buildPhasesForVariant(variant).map((phase) => [
      phase.number,
      [criarAjusteImagem(phase.image)],
    ]),
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

export function serializePhaseAdjustments(
  phases: Record<string, ImageAdjustments[]>,
): Record<string, string> {
  const serialized: Record<string, string> = {};
  Object.entries(phases).forEach(([key, ajustes]) => {
    const filtered = ajustes.filter((item) => item.url.trim());
    if (filtered.length > 0) {
      serialized[`img_${key}_meta`] = serializarAjustesLista(filtered);
    }
  });
  return serialized;
}

export function serializeHeroAdjustments(hero: ImageAdjustments): Record<string, string> {
  if (!hero.url.trim()) return {};
  return {
    img_hero: hero.url,
    img_hero_meta: JSON.stringify({
      fit: hero.fit,
      posX: hero.posX,
      posY: hero.posY,
      scale: hero.scale,
      shape: hero.shape,
      fullBleed: hero.fullBleed,
    }),
  };
}
