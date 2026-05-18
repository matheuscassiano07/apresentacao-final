"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export default function AdminPage() {
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");

  function obterLinkApresentacao() {
    const url = `${window.location.origin}/apresentacao`;
    setLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function copiarLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setStatus("Link copiado com sucesso.");
    } catch {
      setStatus("Não foi possível copiar automaticamente.");
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8f8f8_0%,#eceff3_100%)] px-3 py-10 sm:px-4">
      <motionlessInner>
        <h1 className="text-center text-2xl font-semibold text-[#911419]">Painel da Proposta</h1>
        <p className="mt-2 text-center text-sm text-[#666]">Escolha a ação desejada.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Card
            title="Gerar Minuta"
            description="Cadastro do cliente e geração do contrato em PDF (LaTeX)."
            href="/cadastro-minuta"
            label="Ir para Cadastro do Cliente"
          />
          <div className="rounded-[10px] border border-[#e4e4e4] p-4">
            <h2 className="text-base font-semibold text-[#333]">Link da Apresentação</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#666]">
              Abre a apresentação genérica para qualquer cliente.
            </p>
            <button type="button" onClick={obterLinkApresentacao} className={btnSecondary}>
              Obter link
            </button>
            {link ? (
              <motionlessLinkRow>
                <input readOnly value={link} className="w-full rounded-lg border border-[#d5d5d5] px-3 py-2 text-sm" />
                <button type="button" onClick={() => void copiarLink()} className={btnPrimary}>
                  Copiar
                </button>
              </motionlessLinkRow>
            ) : null}
            {status ? <p className="mt-2 text-xs text-[#2f6f39]">{status}</p> : null}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-[#888]">
          Apresentação pública:{" "}
          <Link href="/apresentacao" className="text-[#911419] underline">
            /apresentacao
          </Link>
        </p>
      </motionlessInner>
    </div>
  );
}

function Card({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <div className="rounded-[10px] border border-[#e4e4e4] p-4">
      <h2 className="text-base font-semibold text-[#333]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#666]">{description}</p>
      <Link href={href} className={`${btnPrimary} mt-3 inline-flex`}>
        {label}
      </Link>
    </div>
  );
}

const btnPrimary =
  "w-full items-center justify-center rounded-lg bg-[#911419] px-3 py-2.5 text-sm font-bold text-white hover:bg-[#7a1115]";

const btnSecondary =
  "mt-3 w-full rounded-lg bg-[#333] px-3 py-2.5 text-sm font-bold text-white hover:bg-[#222]";

function motionlessInner({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[760px] rounded-[14px] border border-[#ececec] bg-white p-6 shadow-[0_16px_35px_rgba(0,0,0,0.08)] sm:p-9">
      {children}
    </div>
  );
}

function motionlessLinkRow({ children }: { children: ReactNode }) {
  return <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">{children}</div>;
}
