"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { exportPropostaPdf } from "@/lib/export-proposta-pdf";

interface BaixarPropostaPdfButtonProps {
  nomeCliente: string;
  label?: string;
  className?: string;
}

export function BaixarPropostaPdfButton({
  nomeCliente,
  label = "Baixar PDF da Proposta",
  className,
}: BaixarPropostaPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleClick() {
    setLoading(true);
    setErro("");
    try {
      await exportPropostaPdf(nomeCliente);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível gerar o PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2" data-pdf-exclude>
      <button
        type="button"
        onClick={() => void handleClick()}
        disabled={loading}
        className={
          className ??
          "mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs uppercase tracking-[0.12em] text-background shadow-[0_12px_30px_rgba(145,20,25,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70 sm:mt-10 sm:gap-3 sm:px-10 sm:py-5 sm:text-base sm:tracking-widest"
        }
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Download className="h-6 w-6" />}
        {loading ? "Gerando PDF..." : label}
      </button>
      {erro ? <p className="max-w-md text-center text-sm font-medium text-red-400">{erro}</p> : null}
    </div>
  );
}
