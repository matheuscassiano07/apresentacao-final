import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ImageFitMode = "cover" | "contain" | "fill";
export type ImageShape = "square" | "rounded" | "circle";

export interface ImageAdjustments {
  url: string;
  fit: ImageFitMode;
  posX: number;
  posY: number;
  scale: number;
  shape: ImageShape;
  fullBleed: boolean;
}

export const DEFAULT_IMAGE_ADJUSTMENTS: Omit<ImageAdjustments, "url"> = {
  fit: "cover",
  posX: 50,
  posY: 50,
  scale: 100,
  shape: "rounded",
  fullBleed: false,
};

export function criarAjusteImagem(url = ""): ImageAdjustments {
  return { url, ...DEFAULT_IMAGE_ADJUSTMENTS };
}

export function normalizarAjusteImagem(
  input: string | Partial<ImageAdjustments> | undefined | null,
): ImageAdjustments {
  if (!input) return criarAjusteImagem();
  if (typeof input === "string") return criarAjusteImagem(input.trim());

  const url = String(input.url ?? "").trim();
  const shape =
    input.shape === "square" || input.shape === "circle" || input.shape === "rounded"
      ? input.shape
      : DEFAULT_IMAGE_ADJUSTMENTS.shape;

  return {
    url,
    fit: input.fit === "contain" || input.fit === "fill" ? input.fit : "cover",
    posX: clampPercent(input.posX ?? DEFAULT_IMAGE_ADJUSTMENTS.posX),
    posY: clampPercent(input.posY ?? DEFAULT_IMAGE_ADJUSTMENTS.posY),
    scale: clampScale(input.scale ?? DEFAULT_IMAGE_ADJUSTMENTS.scale),
    shape,
    fullBleed: Boolean(input.fullBleed),
  };
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function clampScale(value: number): number {
  return Math.min(200, Math.max(100, Math.round(value)));
}

export function ajusteImagemParaEstilo(ajuste: Partial<ImageAdjustments>): CSSProperties {
  const fit = ajuste.fit ?? "cover";
  const posX = ajuste.posX ?? 50;
  const posY = ajuste.posY ?? 50;
  const scale = (ajuste.scale ?? 100) / 100;

  return {
    objectFit: fit,
    objectPosition: `${posX}% ${posY}%`,
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: `${posX}% ${posY}%`,
  };
}

export function classesMolduraImagem(ajuste: Partial<ImageAdjustments>): string {
  const shape = ajuste.shape ?? DEFAULT_IMAGE_ADJUSTMENTS.shape;
  if (shape === "circle") return "aspect-square rounded-full";
  if (shape === "square") return "aspect-[16/9] rounded-none";
  return "aspect-[16/9] rounded-2xl";
}

export function classesContainerImagem(
  ajuste: Partial<ImageAdjustments>,
  variant: "light" | "dark" = "light",
): string {
  const isDark = variant === "dark";
  return cn(
    "relative w-full overflow-hidden border shadow-[0_18px_40px_rgba(0,0,0,0.16)]",
    classesMolduraImagem(ajuste),
    isDark ? "border-background/20 bg-background/5" : "border-foreground/20 bg-background",
  );
}

export function serializarAjustesLista(ajustes: ImageAdjustments[]): string {
  return JSON.stringify(
    ajustes.map((item) => ({
      fit: item.fit,
      posX: item.posX,
      posY: item.posY,
      scale: item.scale,
      shape: item.shape,
      fullBleed: item.fullBleed,
    })),
  );
}

export function parseAjustesLista(raw: string | undefined, quantidade: number): ImageAdjustments[] {
  if (!raw?.trim()) {
    return Array.from({ length: quantidade }, () => criarAjusteImagem());
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ImageAdjustments>[];
    if (!Array.isArray(parsed)) return Array.from({ length: quantidade }, () => criarAjusteImagem());
    return Array.from({ length: quantidade }, (_, index) =>
      normalizarAjusteImagem({ ...parsed[index], url: "" }),
    );
  } catch {
    return Array.from({ length: quantidade }, () => criarAjusteImagem());
  }
}

export type PropostaImagensPayload = {
  hero: ImageAdjustments | string;
  phases: Record<string, (ImageAdjustments | string)[]>;
};

export function normalizarPayloadImagens(input: PropostaImagensPayload | undefined): {
  hero: ImageAdjustments;
  phases: Record<string, ImageAdjustments[]>;
} {
  const hero = normalizarAjusteImagem(input?.hero);
  const phases: Record<string, ImageAdjustments[]> = {};

  Object.entries(input?.phases ?? {}).forEach(([key, slots]) => {
    const lista = Array.isArray(slots) ? slots : [];
    phases[key] = lista
      .map((slot) => normalizarAjusteImagem(slot))
      .filter((slot) => slot.url.length > 0);
  });

  return { hero, phases };
}

/** Converte formato legado (só URLs) salvo antes do editor de enquadramento. */
export function migrarImagensLegadas(imagens: {
  hero?: string | ImageAdjustments;
  phases?: Record<string, string[] | ImageAdjustments[]>;
}): { hero: ImageAdjustments; phases: Record<string, ImageAdjustments[]> } {
  const hero =
    typeof imagens.hero === "object" && imagens.hero !== null
      ? normalizarAjusteImagem(imagens.hero)
      : normalizarAjusteImagem(typeof imagens.hero === "string" ? imagens.hero : "");

  const phases: Record<string, ImageAdjustments[]> = {};
  Object.entries(imagens.phases ?? {}).forEach(([key, slots]) => {
    if (!Array.isArray(slots)) return;
    phases[key] = slots
      .map((slot) => normalizarAjusteImagem(slot))
      .filter((slot) => slot.url.length > 0);
  });

  return { hero, phases };
}
