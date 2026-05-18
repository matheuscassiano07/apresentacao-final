"use client";

import Link from "next/link";
import { FormEvent, useState, type ReactNode } from "react";

type FormFields = {
  nome_cliente: string;
  cpf: string;
  metragem: string;
  valor_m2: string;
  cidade: string;
  condominio: string;
  data_dia: string;
  data_mes: string;
  data_ano: string;
};

const emptyForm: FormFields = {
  nome_cliente: "",
  cpf: "",
  metragem: "",
  valor_m2: "",
  cidade: "",
  condominio: "",
  data_dia: "",
  data_mes: "",
  data_ano: "",
};

function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

function applyCpfMask(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 3));
  if (digits.length > 3) parts.push(digits.slice(3, 6));
  if (digits.length > 6) parts.push(digits.slice(6, 9));
  let formatted = parts.join(".");
  if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;
  return formatted;
}

function applyDecimalMask(value: string) {
  let text = String(value || "");
  text = text.replace(/[^\d,.\s]/g, "");
  text = text.replace(/\./g, ",");
  text = text.replace(/\s+/g, "");
  const firstComma = text.indexOf(",");
  if (firstComma >= 0) {
    const intPart = text.slice(0, firstComma).replace(/,/g, "");
    const decPart = text.slice(firstComma + 1).replace(/,/g, "");
    text = `${intPart},${decPart}`;
  } else {
    text = text.replace(/,/g, "");
  }
  return text;
}

export function CadastroContratoForm() {
  const [form, setForm] = useState<FormFields>(emptyForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState<"minuta" | "download" | null>(null);

  const complete = Object.values(form).every((v) => v.trim().length > 0);

  function updateField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function enviar(endpoint: "/api/contrato/minuta" | "/api/contrato/gerar", mode: "minuta" | "download") {
    setLoading(mode);
    setStatus("");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));

      const response = await fetch(endpoint, { method: "POST", body });
      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Falha ao gerar o PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (mode === "minuta") {
        window.open(url, "_blank", "noopener,noreferrer");
        setStatus("Minuta aberta em nova aba.");
      } else {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `Contrato_${form.nome_cliente || "cliente"}.pdf`;
        anchor.click();
        setStatus("Download do contrato iniciado.");
      }

      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao gerar PDF.");
    } finally {
      setLoading(null);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (complete) void enviar("/api/contrato/gerar", "download");
  }

  return (
    <div className="mx-auto w-full max-w-[760px] rounded-[14px] border border-[#ececec] bg-white p-6 shadow-[0_16px_35px_rgba(0,0,0,0.08)] sm:p-8">
      <Link href="/admin" className="text-sm text-[#666] hover:text-[#911419]">
        ← Voltar ao painel
      </Link>
      <h1 className="mt-3 border-b border-[#eee] pb-3 text-center text-2xl font-semibold text-[#911419]">
        Cadastro do Cliente para Minuta
      </h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <SectionTitle>Dados do Cliente</SectionTitle>
        <Field label="Nome Completo">
          <input
            required
            value={form.nome_cliente}
            onChange={(e) => updateField("nome_cliente", e.target.value)}
            placeholder="Ex: João da Silva"
            className={inputClass}
          />
        </Field>
        <Field label="CPF">
          <input
            required
            value={form.cpf}
            onChange={(e) => updateField("cpf", applyCpfMask(e.target.value))}
            placeholder="Ex: 123.456.789-00"
            maxLength={14}
            inputMode="numeric"
            className={inputClass}
          />
        </Field>

        <SectionTitle>Dados da Obra</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Metragem (m²)">
            <input
              required
              value={form.metragem}
              onChange={(e) => updateField("metragem", applyDecimalMask(e.target.value))}
              placeholder="Ex: 200 ou 200,5"
              inputMode="decimal"
              className={inputClass}
            />
          </Field>
          <Field label="Valor M² (R$)">
            <input
              required
              value={form.valor_m2}
              onChange={(e) => updateField("valor_m2", applyDecimalMask(e.target.value))}
              placeholder="Ex: 80,00"
              inputMode="decimal"
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Cidade - SP">
            <input
              required
              value={form.cidade}
              onChange={(e) => updateField("cidade", e.target.value)}
              placeholder="Ex: São José dos Campos"
              className={inputClass}
            />
          </Field>
          <Field label="Nome do Condomínio">
            <input
              required
              value={form.condominio}
              onChange={(e) => updateField("condominio", e.target.value)}
              placeholder="Ex: Residencial Alphaville"
              className={inputClass}
            />
          </Field>
        </div>

        <SectionTitle>Data de Emissão</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Dia">
            <input
              required
              value={form.data_dia}
              onChange={(e) => updateField("data_dia", onlyDigits(e.target.value).slice(0, 2))}
              placeholder="Ex: 19"
              maxLength={2}
              inputMode="numeric"
              className={inputClass}
            />
          </Field>
          <Field label="Mês (Extenso)">
            <input
              required
              value={form.data_mes}
              onChange={(e) => updateField("data_mes", e.target.value)}
              placeholder="Ex: maio"
              className={inputClass}
            />
          </Field>
          <Field label="Ano">
            <input
              required
              value={form.data_ano}
              onChange={(e) => updateField("data_ano", onlyDigits(e.target.value).slice(0, 4))}
              placeholder="Ex: 2025"
              maxLength={4}
              inputMode="numeric"
              className={inputClass}
            />
          </Field>
        </div>

        {complete ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={loading !== null}
              onClick={() => void enviar("/api/contrato/minuta", "minuta")}
              className={btnClass}
            >
              {loading === "minuta" ? "Gerando minuta..." : "Gerar Minuta"}
            </button>
            <button type="submit" disabled={loading !== null} className={`${btnClass} bg-[#333] hover:bg-[#222]`}>
              {loading === "download" ? "Gerando PDF..." : "Baixar Contrato PDF"}
            </button>
          </div>
        ) : (
          <p className="text-center text-sm text-[#666]">Preencha todos os campos para liberar a geração da minuta.</p>
        )}

        {status ? <p className="text-center text-sm text-[#2f6f39]">{status}</p> : null}
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#d5d5d5] px-3 py-2.5 text-[15px] outline-none transition focus:border-[#911419] focus:ring-[3px] focus:ring-[#911419]/15";

const btnClass =
  "w-full rounded-lg bg-[#911419] px-3 py-3 text-[15px] font-bold text-white transition hover:-translate-y-px hover:bg-[#7a1115] disabled:opacity-60";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-l-4 border-[#911419] pl-2.5 text-base font-bold text-[#333]">{children}</h2>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[#505050]">{label}</span>
      {children}
    </label>
  );
}
