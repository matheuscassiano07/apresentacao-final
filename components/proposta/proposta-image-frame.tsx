"use client";

import type { ReactNode } from "react";
import type { ImageAdjustments } from "@/lib/proposta-image-fit";
import { classesContainerImagem } from "@/lib/proposta-image-fit";
import { cn } from "@/lib/utils";

interface PropostaImageFrameProps {
  ajuste: Partial<ImageAdjustments>;
  variant?: "light" | "dark";
  children: ReactNode;
  className?: string;
}

export function PropostaImageFrame({
  ajuste,
  variant = "light",
  children,
  className,
}: PropostaImageFrameProps) {
  const frame = (
    <div className={cn(classesContainerImagem(ajuste, variant), className)}>{children}</div>
  );

  if (ajuste.fullBleed) {
    return (
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">{frame}</div>
    );
  }

  return frame;
}
