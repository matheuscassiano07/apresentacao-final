"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { buildPropostaPhases } from "@/lib/proposta-phases";
import {
  DEFAULT_PROPOSTA_IMAGES,
  defaultPhaseImageLists,
  serializePhaseImages,
} from "@/lib/proposta-images";

type ClientFields = {
  nome_cliente: string;
  telefone: string;
  cidade_cliente: string;
  cpf: string;
  condominio: string;
  cidade_obra: string;
  objeto_proposta: string;
  metragem: string;
  area_terreno: string;
  valor_m2: string;
  data_dia: string;
  data_mes: string;
  data_ano: string;
};

type ImageFields = {
  hero: string;
  phases: Record<string, string[]>;
};

const defaultClient: ClientFields = {
  nome_cliente: "",
  telefone: "",
  cidade_cliente: "São José dos Campos - SP",
  cpf: "",
  condominio: "",
  cidade_obra: "São José dos Campos - SP",
  objeto_proposta: "",
  metragem: "",
  area_terreno: "",
  valor_m2: "80,00",
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

function applyPhoneMask(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
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
  const [images, setImages] = useState<ImageFields>({
    hero: DEFAULT_PROPOSTA_IMAGES.hero,
    phases: defaultPhaseImageLists(),
  });
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

  function updateHeroImage(value: string) {
    setImages((prev) => ({ ...prev, hero: value }));
  }

  function updatePhaseImage(phaseKey: string, index: number, value: string) {
    setImages((prev) => {
      const current = [...(prev.phases[phaseKey] ?? [""])];
      current[index] = value;
      return {
        ...prev,
        phases: { ...prev.phases, [phaseKey]: current },
      };
    });
  }

  function addPhaseImage(phaseKey: string) {
    setImages((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseKey]: [...(prev.phases[phaseKey] ?? [""]), ""],
      },
    }));
  }

  function removePhaseImage(phaseKey: string, index: number) {
    setImages((prev) => {
      const current = [...(prev.phases[phaseKey] ?? [""])];
      if (current.length <= 1) return prev;
      current.splice(index, 1);
      return {
        ...prev,
        phases: { ...prev.phases, [phaseKey]: current },
      };
    });
  }

  async function onHeroFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      updateHeroImage(await fileToDataUrl(file));
      setStatus("Capa atualizada.");
    } catch {
      setStatus("Erro ao carregar a capa.");
    }
  }

  async function onPhaseFileSelect(phaseKey: string, index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      updatePhaseImage(phaseKey, index, dataUrl);
      setStatus(`Imagem ${index + 1} da etapa ${phaseKey} carregada.`);
    } catch {
      setStatus("Erro ao carregar a imagem.");
    }
  }

  function buildLink(origin: string) {
    const params = new URLSearchParams();
    Object.entries(client).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim());
    });
    if (client.cidade_obra.trim()) {
      params.set("cidade", client.cidade_obra.trim());
    }
    if (images.hero.trim() && images.hero !== DEFAULT_PROPOSTA_IMAGES.hero) {
      params.set("img_hero", images.hero.trim());
    }
    Object.entries(serializePhaseImages(images.phases)).forEach(([key, value]) => {
      params.set(key, value);
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
          <h2 className="text-base font-semibold text-[#333]">Dados do cliente e escopo</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field label="Nome do cliente">
              <input
                className={inputClass}
                value={client.nome_cliente}
                onChange={(e) => updateClient("nome_cliente", e.target.value)}
                required
              />
            </Field>
            <Field label="Telefone">
              <input
                className={inputClass}
                value={client.telefone}
                onChange={(e) => updateClient("telefone", applyPhoneMask(e.target.value))}
                placeholder="(12) 98144-8456"
                required
              />
            </Field>
            <Field label="Cidade do cliente">
              <input
                className={inputClass}
                value={client.cidade_cliente}
                onChange={(e) => updateClient("cidade_cliente", e.target.value)}
                placeholder="São José dos Campos - SP"
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
            <Field label="Condomínio / Empreendimento (obra)">
              <input
                className={inputClass}
                value={client.condominio}
                onChange={(e) => updateClient("condominio", e.target.value)}
                placeholder="Condomínio Quinta das Flores"
                required
              />
            </Field>
            <Field label="Cidade da obra">
              <input
                className={inputClass}
                value={client.cidade_obra}
                onChange={(e) => updateClient("cidade_obra", e.target.value)}
                placeholder="São José dos Campos - SP"
                required
              />
            </Field>
            <Field label="Objeto da proposta" className="sm:col-span-2">
              <input
                className={inputClass}
                value={client.objeto_proposta}
                onChange={(e) => updateClient("objeto_proposta", e.target.value)}
                placeholder="Projeto de Arquitetura e Interiores para uma Clínica Médica"
                required
              />
            </Field>
            <Field label="Área pretendida (m²)">
              <input
                className={inputClass}
                value={client.metragem}
                onChange={(e) => updateClient("metragem", applyDecimalMask(e.target.value))}
                placeholder="400,00"
                required
              />
            </Field>
            <Field label="Área do terreno (m²)">
              <input
                className={inputClass}
                value={client.area_terreno}
                onChange={(e) => updateClient("area_terreno", applyDecimalMask(e.target.value))}
                placeholder="2.000,00"
                required
              />
            </Field>
            <Field label="Valor por m²">
              <input
                className={inputClass}
                value={client.valor_m2}
                onChange={(e) => updateClient("valor_m2", applyDecimalMask(e.target.value))}
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
            Cada etapa aceita uma ou mais fotos horizontais. Mínimo de 1 foto por etapa.
          </p>

          <div className="mt-4 space-y-4">
            <ImageField
              label="Capa (hero)"
              value={images.hero}
              onChange={updateHeroImage}
              onFileSelect={(event) => void onHeroFileSelect(event)}
            />

            {phaseLabels.map((phase) => (
              <PhaseImagesField
                key={phase.key}
                label={phase.label}
                phaseKey={phase.key.replace("img_", "")}
                values={images.phases[phase.key.replace("img_", "")] ?? [""]}
                onChange={(index, value) => updatePhaseImage(phase.key.replace("img_", ""), index, value)}
                onAdd={() => addPhaseImage(phase.key.replace("img_", ""))}
                onRemove={(index) => removePhaseImage(phase.key.replace("img_", ""), index)}
                onFileSelect={(index, event) =>
                  void onPhaseFileSelect(phase.key.replace("img_", ""), index, event)
                }
              />
            ))}
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

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className ? `block text-sm text-[#444] ${className}` : "block text-sm text-[#444]"}>
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
          placeholder="/images/hero-bg.jpg ou https://..."
        />
        <label className={`${btnSecondary} cursor-pointer text-center`}>
          Enviar arquivo
          <input type="file" accept="image/*" className="hidden" onChange={onFileSelect} />
        </label>
      </div>
      {value ? (
        <img src={value} alt={label} className="mt-3 aspect-[16/9] w-full rounded-md object-cover" />
      ) : null}
    </div>
  );
}

function PhaseImagesField({
  label,
  phaseKey,
  values,
  onChange,
  onAdd,
  onRemove,
  onFileSelect,
}: {
  label: string;
  phaseKey: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onFileSelect: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-lg border border-[#ececec] p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[#333]">{label}</p>
        <button type="button" className="text-xs font-semibold text-[#911419]" onClick={onAdd}>
          + Adicionar foto
        </button>
      </div>
      <div className="mt-3 space-y-3">
        {values.map((value, index) => (
          <div key={`${phaseKey}-${index}`} className="rounded-md border border-[#f0f0f0] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-[#666]">Foto {index + 1}</span>
              {values.length > 1 ? (
                <button
                  type="button"
                  className="text-xs text-[#999] hover:text-[#911419]"
                  onClick={() => onRemove(index)}
                >
                  Remover
                </button>
              ) : null}
            </div>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                className={inputClass}
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder="/images/phase-01.jpg ou https://..."
              />
              <label className={`${btnSecondary} cursor-pointer text-center`}>
                Enviar arquivo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => onFileSelect(index, event)}
                />
              </label>
            </div>
            {value ? (
              <img
                src={value}
                alt={`${label} ${index + 1}`}
                className="mt-3 aspect-[16/9] w-full rounded-md object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#d5d5d5] px-3 py-2 text-sm outline-none focus:border-[#911419]";

const btnPrimary =
  "rounded-lg bg-[#911419] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#7a1115] disabled:cursor-not-allowed disabled:opacity-50";

const btnSecondary =
  "rounded-lg bg-[#333] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-50";
