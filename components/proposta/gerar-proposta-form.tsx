"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { buildPropostaPhases } from "@/lib/proposta-phases";
import { imageFieldsFromDefaults } from "@/lib/proposta-images";

type ClientFields = {
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

type ImageFields = Record<string, string>;

const defaultClient: ClientFields = {
  nome_cliente: "",
  cpf: "",
  metragem: "200",
  valor_m2: "80,00",
  cidade: "São José dos Campos",
  condominio: "",
  data_dia: String(new Date().getDate()),
  data_mes: new Date().toLocaleDateString("pt-BR", { month: "long" }),
  data_ano: String(new Date().getFullYear()),
};

const phaseLabels = buildPropostaPhases().map((phase) => ({
  key: `img_${phase.number}`,
  label: `Etapa ${phase.number} — ${phase.title}`,
}));

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

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

export function GerarPropostaForm() {
  const [client, setClient] = useState<ClientFields>(defaultClient);
  const [images, setImages] = useState<ImageFields>(imageFieldsFromDefaults);
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [destino, setDestino] = useState<"proposta" | "apresentacao">("proposta");

  const clientComplete = useMemo(
    () => Object.values(client).every((value) => value.trim().length > 0),
    [client],
  );

  function updateClient<K extends keyof ClientFields>(key: K, value: ClientFields[K]) {
    setClient((prev) => ({ ...prev, [key]: value }));
  }

  function updateImage(key: string, value: string) {
    setImages((prev) => ({ ...prev, [key]: value }));
  }

  async function onFileSelect(key: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("Selecione um arquivo de imagem.");
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      updateImage(key, dataUrl);
      setStatus(`Imagem carregada para ${key}.`);
    } catch {
      setStatus("Erro ao carregar a imagem.");
    }
  }

  function buildLink(origin: string) {
    const params = new URLSearchParams();
    Object.entries(client).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim());
    });
    Object.entries(images).forEach(([key, value]) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      const defaultValue = imageFieldsFromDefaults()[key as keyof ReturnType<typeof imageFieldsFromDefaults>];
      if (trimmed !== defaultValue) params.set(key, trimmed);
    });

    const base = destino === "proposta" ? "/apresentacao/proposta" : "/apresentacao";
    return `${origin}${base}/?${params.toString()}`;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const url = buildLink(window.location.origin);
    if (url.length > 7000) {
      setStatus("Link muito longo. Use URLs curtas (/images/... ou links externos) em vez de upload direto.");
      return;
    }
    setLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("Proposta aberta em nova aba.");
  }

  async function copiarLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setStatus("Link copiado.");
    } catch {
      setStatus("Não foi possível copiar automaticamente.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[900px] rounded-[14px] border border-[#ececec] bg-white p-6 shadow-[0_16px_35px_rgba(0,0,0,0.08)] sm:p-8">
      <Link href="/admin" className="text-sm text-[#666] hover:text-[#911419]">
        ← Voltar ao painel
      </Link>
      <h1 className="mt-3 border-b border-[#eee] pb-3 text-center text-2xl font-semibold text-[#911419]">
        Gerar Proposta
      </h1>
      <p className="mt-3 text-center text-sm text-[#666]">
        Personalize as imagens e gere o link da apresentação para o cliente.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-8">
        <section>
          <h2 className="text-base font-semibold text-[#333]">Destino do link</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e4e4e4] px-3 py-2.5 text-sm">
              <input
                type="radio"
                name="destino"
                checked={destino === "proposta"}
                onChange={() => setDestino("proposta")}
              />
              Com contrato (/apresentacao/proposta)
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e4e4e4] px-3 py-2.5 text-sm">
              <input
                type="radio"
                name="destino"
                checked={destino === "apresentacao"}
                onChange={() => setDestino("apresentacao")}
              />
              Só apresentação (/apresentacao)
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#333]">Dados do cliente</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field label="Nome do cliente">
              <input
                className={inputClass}
                value={client.nome_cliente}
                onChange={(e) => updateClient("nome_cliente", e.target.value)}
                required
              />
            </Field>
            <Field label="CPF">
              <input
                className={inputClass}
                value={client.cpf}
                onChange={(e) => updateClient("cpf", applyCpfMask(e.target.value))}
                required
              />
            </Field>
            <Field label="Metragem (m²)">
              <input
                className={inputClass}
                value={client.metragem}
                onChange={(e) => updateClient("metragem", e.target.value)}
                required
              />
            </Field>
            <Field label="Valor por m²">
              <input
                className={inputClass}
                value={client.valor_m2}
                onChange={(e) => updateClient("valor_m2", e.target.value)}
                required
              />
            </Field>
            <Field label="Cidade">
              <input
                className={inputClass}
                value={client.cidade}
                onChange={(e) => updateClient("cidade", e.target.value)}
                required
              />
            </Field>
            <Field label="Condomínio / Empreendimento">
              <input
                className={inputClass}
                value={client.condominio}
                onChange={(e) => updateClient("condominio", e.target.value)}
                required
              />
            </Field>
            <Field label="Dia">
              <input
                className={inputClass}
                value={client.data_dia}
                onChange={(e) => updateClient("data_dia", e.target.value)}
                required
              />
            </Field>
            <Field label="Mês">
              <input
                className={inputClass}
                value={client.data_mes}
                onChange={(e) => updateClient("data_mes", e.target.value)}
                required
              />
            </Field>
            <Field label="Ano">
              <input
                className={inputClass}
                value={client.data_ano}
                onChange={(e) => updateClient("data_ano", e.target.value)}
                required
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[#333]">Imagens</h2>
          <p className="mt-2 text-sm text-[#666]">
            Cole uma URL, use caminho do site (ex: /images/phase-01.jpg) ou envie um arquivo do computador.
          </p>

          <div className="mt-4 space-y-4">
            <ImageField
              label="Capa (hero)"
              value={images.img_hero}
              onChange={(value) => updateImage("img_hero", value)}
              onFileSelect={(event) => void onFileSelect("img_hero", event)}
            />

            {phaseLabels.map((phase) => (
              <ImageField
                key={phase.key}
                label={phase.label}
                value={images[phase.key] ?? ""}
                onChange={(value) => updateImage(phase.key, value)}
                onFileSelect={(event) => void onFileSelect(phase.key, event)}
              />
            ))}

            <ImageField
              label="Etapa 10 — imagem extra (Integração)"
              value={images.img_10_2}
              onChange={(value) => updateImage("img_10_2", value)}
              onFileSelect={(event) => void onFileSelect("img_10_2", event)}
            />
          </div>
        </section>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="submit" className={btnPrimary} disabled={!clientComplete}>
            Gerar e abrir proposta
          </button>
          <button
            type="button"
            className={btnSecondary}
            disabled={!clientComplete}
            onClick={() => {
              const url = buildLink(window.location.origin);
              setLink(url);
              setStatus("Link gerado abaixo.");
            }}
          >
            Só gerar link
          </button>
        </div>

        {link ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
            <input readOnly value={link} className={inputClass} />
            <button type="button" onClick={() => void copiarLink()} className={btnPrimary}>
              Copiar
            </button>
          </div>
        ) : null}

        {status ? <p className="text-sm text-[#2f6f39]">{status}</p> : null}
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm text-[#444]">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onFileSelect,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-lg border border-[#ececec] p-3">
      <p className="text-sm font-medium text-[#333]">{label}</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/phase-01.jpg ou https://..."
        />
        <label className={`${btnSecondary} cursor-pointer text-center`}>
          Enviar arquivo
          <input type="file" accept="image/*" className="hidden" onChange={onFileSelect} />
        </label>
      </div>
      {value ? (
        <img src={value} alt={label} className="mt-3 h-24 w-full rounded-md object-cover" />
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#d5d5d5] px-3 py-2 text-sm outline-none focus:border-[#911419]";

const btnPrimary =
  "rounded-lg bg-[#911419] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#7a1115] disabled:cursor-not-allowed disabled:opacity-50";

const btnSecondary =
  "rounded-lg bg-[#333] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-50";
