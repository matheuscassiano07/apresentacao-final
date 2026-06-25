"use client";

import {
  type ImageAdjustments,
  type ImageFitMode,
  type ImageShape,
  DEFAULT_IMAGE_ADJUSTMENTS,
  ajusteImagemParaEstilo,
  classesMolduraImagem,
} from "@/lib/proposta-image-fit";
import { cn } from "@/lib/utils";

interface ImageAdjustmentEditorProps {
  value: ImageAdjustments;
  onChange: (value: ImageAdjustments) => void;
  aspectClass?: string;
  disabled?: boolean;
  showLayoutOptions?: boolean;
}

const fitOptions: { value: ImageFitMode; label: string; short: string }[] = [
  { value: "cover", label: "Cobrir", short: "Recorte" },
  { value: "contain", label: "Conter", short: "Inteira" },
  { value: "fill", label: "Esticar", short: "Esticar" },
];

const shapeOptions: { value: ImageShape; label: string }[] = [
  { value: "square", label: "Quadrada" },
  { value: "rounded", label: "Arredondada" },
  { value: "circle", label: "Circular" },
];

export function ImageAdjustmentEditor({
  value,
  onChange,
  aspectClass,
  disabled,
  showLayoutOptions = true,
}: ImageAdjustmentEditorProps) {
  if (!value.url) return null;

  function patch(partial: Partial<ImageAdjustments>) {
    onChange({ ...value, ...partial });
  }

  function resetar() {
    onChange({ ...value, ...DEFAULT_IMAGE_ADJUSTMENTS });
  }

  const previewAspect = value.shape === "circle" ? "aspect-square max-w-[280px] mx-auto" : aspectClass ?? "aspect-[16/9]";
  const previewRadius =
    value.shape === "circle" ? "rounded-full" : value.shape === "square" ? "rounded-none" : "rounded-xl";

  return (
    <div className="mt-3 space-y-4 rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3 sm:p-4">
      <div
        className={cn(
          "relative w-full overflow-hidden border border-[#ddd] bg-[#111]",
          previewRadius,
          previewAspect,
          value.fullBleed && showLayoutOptions ? "ring-2 ring-[#911419]/30 ring-offset-2" : "",
        )}
      >
        <img
          src={value.url}
          alt="Pré-visualização"
          className="absolute inset-0 h-full w-full"
          style={ajusteImagemParaEstilo(value)}
        />
        {value.fullBleed && showLayoutOptions ? (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
            Ponta a ponta
          </span>
        ) : null}
      </div>

      {showLayoutOptions ? (
        <div className="space-y-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#888]">Formato</p>
            <div className="grid grid-cols-3 gap-1.5">
              {shapeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => patch({ shape: opt.value })}
                  className={pillClass(value.shape === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg border border-[#e4e4e4] bg-white px-3 py-2.5">
            <div>
              <p className="text-sm font-medium text-[#333]">Ponta a ponta</p>
              <p className="text-xs text-[#888]">Ocupa toda a largura da tela</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={value.fullBleed}
              disabled={disabled}
              onClick={() => patch({ fullBleed: !value.fullBleed })}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full transition-colors",
                value.fullBleed ? "bg-[#911419]" : "bg-[#ccc]",
                disabled && "opacity-50",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
                  value.fullBleed ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#888]">Enquadramento</p>
        <div className="grid grid-cols-3 gap-1.5">
          {fitOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => patch({ fit: opt.value })}
              className={pillClass(value.fit === opt.value)}
            >
              <span className="block sm:hidden">{opt.short}</span>
              <span className="hidden sm:block">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SliderField
          label="Horizontal"
          value={value.posX}
          disabled={disabled}
          onChange={(posX) => patch({ posX })}
        />
        <SliderField
          label="Vertical"
          value={value.posY}
          disabled={disabled}
          onChange={(posY) => patch({ posY })}
        />
        <SliderField
          label="Zoom"
          min={100}
          max={200}
          suffix="%"
          value={value.scale}
          disabled={disabled}
          onChange={(scale) => patch({ scale })}
        />
      </div>

      <button
        type="button"
        className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-xs font-medium text-[#666] transition hover:border-[#911419] hover:text-[#911419] disabled:opacity-50"
        disabled={disabled}
        onClick={resetar}
      >
        Restaurar padrões
      </button>
    </div>
  );
}

function pillClass(active: boolean) {
  return cn(
    "rounded-lg px-2 py-2 text-xs font-medium transition sm:text-sm",
    active
      ? "bg-[#911419] text-white shadow-sm"
      : "border border-[#e0e0e0] bg-white text-[#555] hover:border-[#911419]/40",
  );
}

function SliderField({
  label,
  value,
  onChange,
  disabled,
  min = 0,
  max = 100,
  suffix = "%",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-[#555]">{label}</span>
        <span className="tabular-nums text-[#888]">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#ddd] accent-[#911419] disabled:opacity-50 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#911419]"
      />
    </label>
  );
}

export { classesMolduraImagem };
