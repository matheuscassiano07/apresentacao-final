"use client";

import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { buildPhasesForVariant } from "@/lib/proposta-phases";
import { defaultPhaseImageLists } from "@/lib/proposta-images";
import {
  type ImageAdjustments,
  criarAjusteImagem,
  normalizarAjusteImagem,
} from "@/lib/proposta-image-fit";
import { ImageAdjustmentEditor } from "@/components/proposta/image-adjustment-editor";
import { cn } from "@/lib/utils";

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

type ImageSlot = ImageAdjustments & { id: string };

type ImageFields = {
  hero: ImageSlot;
  phases: Record<string, ImageSlot[]>;
};

type FormTab = "dados" | "fotos" | "link";

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

function criarSlot(url = ""): ImageSlot {
  return { id: crypto.randomUUID(), ...criarAjusteImagem(url) };
}

function criarFasesIniciais(destino: "proposta" | "apresentacao"): Record<string, ImageSlot[]> {
  return Object.fromEntries(
    Object.entries(defaultPhaseImageLists(destino)).map(([key, ajustes]) => [
      key,
      ajustes.length > 0
        ? ajustes.map((ajuste) => ({ id: crypto.randomUUID(), ...ajuste }))
        : [criarSlot()],
    ]),
  );
}

function criarHeroInicial(): ImageSlot {
  return criarSlot("/images/hero-bg.jpg");
}

function slotSemId({ id: _id, ...ajuste }: ImageSlot): ImageAdjustments {
  return normalizarAjusteImagem(ajuste);
}

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

async function lerErroApi(response: Response): Promise<string> {
  const texto = await response.text();
  try {
    const data = JSON.parse(texto) as { erro?: string };
    if (data.erro) return data.erro;
  } catch {
    // resposta não é JSON
  }
  return texto || `Erro ${response.status}`;
}

async function uploadImagemServidor(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/propostas/upload", { method: "POST", body });
  if (!response.ok) throw new Error(await lerErroApi(response));
  const data = (await response.json()) as { url?: string; erro?: string };
  if (!data.url) throw new Error(data.erro || "URL da imagem não retornada.");
  return data.url;
}

async function uploadImagem(file: File): Promise<string> {
  try {
    const blob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/propostas/upload/client",
    });
    return blob.url;
  } catch {
    return uploadImagemServidor(file);
  }
}

export function GerarPropostaForm() {
  const [client, setClient] = useState<ClientFields>(defaultClient);
  const [images, setImages] = useState<ImageFields>({
    hero: criarHeroInicial(),
    phases: criarFasesIniciais("proposta"),
  });
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [destino, setDestino] = useState<"proposta" | "apresentacao">("proposta");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<FormTab>("dados");
  const [faseAberta, setFaseAberta] = useState<string | null>("hero");

  const phaseLabels = useMemo(
    () =>
      buildPhasesForVariant(destino).map((phase) => ({
        phaseKey: phase.number,
        label: phase.title,
        short: `Etapa ${phase.number}`,
      })),
    [destino],
  );

  useEffect(() => {
    setImages((prev) => ({ ...prev, phases: criarFasesIniciais(destino) }));
    setFaseAberta("hero");
  }, [destino]);

  const clientComplete = useMemo(
    () => Object.values(client).every((value) => value.trim().length > 0),
    [client],
  );

  const fotosConfiguradas = useMemo(() => {
    let count = images.hero.url.trim() ? 1 : 0;
    Object.values(images.phases).forEach((slots) => {
      count += slots.filter((s) => s.url.trim()).length;
    });
    return count;
  }, [images]);

  function updateClient<K extends keyof ClientFields>(key: K, value: ClientFields[K]) {
    setClient((prev) => ({ ...prev, [key]: value }));
  }

  function updateHero(ajuste: Partial<ImageAdjustments>) {
    setImages((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...normalizarAjusteImagem({ ...prev.hero, ...ajuste }) },
    }));
  }

  function updatePhaseSlot(phaseKey: string, slotId: string, ajuste: Partial<ImageAdjustments>) {
    setImages((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseKey]: (prev.phases[phaseKey] ?? [criarSlot()]).map((slot) =>
          slot.id === slotId
            ? { ...slot, ...normalizarAjusteImagem({ ...slot, ...ajuste }) }
            : slot,
        ),
      },
    }));
  }

  function addPhaseImage(phaseKey: string) {
    setImages((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseKey]: [...(prev.phases[phaseKey] ?? [criarSlot()]), criarSlot()],
      },
    }));
  }

  function removePhaseSlot(phaseKey: string, slotId: string) {
    setImages((prev) => {
      const current = prev.phases[phaseKey] ?? [criarSlot()];
      if (current.length <= 1) return prev;
      return {
        ...prev,
        phases: { ...prev.phases, [phaseKey]: current.filter((slot) => slot.id !== slotId) },
      };
    });
  }

  async function onHeroFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setLoading(true);
      updateHero({ url: await uploadImagem(file) });
      setFaseAberta("hero");
      setStatus("Capa enviada.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao enviar capa.");
    } finally {
      setLoading(false);
    }
  }

  async function onPhaseFileSelect(phaseKey: string, slotId: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setLoading(true);
      updatePhaseSlot(phaseKey, slotId, { url: await uploadImagem(file) });
      setFaseAberta(phaseKey);
      setStatus(`Foto da etapa ${phaseKey} enviada.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao enviar imagem.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarProposta(abrirNovaAba: boolean) {
    setLoading(true);
    setStatus("");
    try {
      const phasesPayload = Object.fromEntries(
        Object.entries(images.phases).map(([key, slots]) => [
          key,
          slots.map((slot) => slotSemId(slot)).filter((slot) => slot.url.trim()),
        ]),
      );

      const response = await fetch("/api/propostas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destino,
          dados: client,
          imagens: { hero: slotSemId(images.hero), phases: phasesPayload },
        }),
      });

      if (!response.ok) throw new Error(await lerErroApi(response));

      const data = (await response.json()) as { url: string; slug: string };
      setLink(data.url);
      setTab("link");
      setStatus("Link criado com sucesso.");

      if (abrirNovaAba) window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao gerar proposta.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void salvarProposta(true);
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
    <div className="relative mx-auto w-full max-w-3xl pb-28 sm:pb-8">
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <div className="rounded-xl bg-white px-6 py-4 shadow-xl">
            <p className="text-sm font-medium text-[#333]">Enviando…</p>
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <header className="border-b border-[#eee] px-4 py-5 sm:px-6">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-[#777] hover:text-[#911419]">
            ← Painel
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-[#911419] sm:text-2xl">Gerar Proposta</h1>
          <p className="mt-1 text-sm text-[#666]">
            Preencha os dados, ajuste as fotos e gere um link curto.
          </p>
        </header>

        <div className="border-b border-[#eee] px-2 sm:px-4">
          <nav className="flex gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(
              [
                { id: "dados" as const, label: "Cliente" },
                { id: "fotos" as const, label: `Fotos (${fotosConfiguradas})` },
                { id: "link" as const, label: "Link" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition",
                  tab === item.id
                    ? "bg-[#911419] text-white"
                    : "text-[#666] hover:bg-[#f5f5f5]",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={onSubmit} className="px-4 py-5 sm:px-6 sm:py-6">
          {tab === "dados" ? (
            <div className="space-y-6">
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[#888]">Destino</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <DestinoCard
                    active={destino === "proposta"}
                    title="Com contrato"
                    desc="/proposta/nome-id"
                    onClick={() => setDestino("proposta")}
                  />
                  <DestinoCard
                    active={destino === "apresentacao"}
                    title="Só apresentação"
                    desc="/apresentacao/nome-id"
                    onClick={() => setDestino("apresentacao")}
                  />
                </div>
              </section>

              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[#888]">
                  Dados do cliente
                </h2>
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
                  <Field label="Condomínio / Empreendimento">
                    <input
                      className={inputClass}
                      value={client.condominio}
                      onChange={(e) => updateClient("condominio", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Cidade da obra">
                    <input
                      className={inputClass}
                      value={client.cidade_obra}
                      onChange={(e) => updateClient("cidade_obra", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Objeto da proposta" className="sm:col-span-2">
                    <input
                      className={inputClass}
                      value={client.objeto_proposta}
                      onChange={(e) => updateClient("objeto_proposta", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Área pretendida (m²)">
                    <input
                      className={inputClass}
                      value={client.metragem}
                      onChange={(e) => updateClient("metragem", applyDecimalMask(e.target.value))}
                      required
                    />
                  </Field>
                  <Field label="Área do terreno (m²)">
                    <input
                      className={inputClass}
                      value={client.area_terreno}
                      onChange={(e) => updateClient("area_terreno", applyDecimalMask(e.target.value))}
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

              <button
                type="button"
                className={btnSecondary + " w-full"}
                onClick={() => setTab("fotos")}
              >
                Continuar para fotos →
              </button>
            </div>
          ) : null}

          {tab === "fotos" ? (
            <div className="space-y-3">
              <p className="text-sm text-[#666]">
                Toque em cada etapa para enviar e ajustar formato, posição e zoom.
              </p>

              <AccordionItem
                open={faseAberta === "hero"}
                onToggle={() => setFaseAberta(faseAberta === "hero" ? null : "hero")}
                title="Capa (hero)"
                badge={images.hero.url ? "1 foto" : undefined}
              >
                <ImageField
                  value={images.hero}
                  onChange={updateHero}
                  onFileSelect={(event) => void onHeroFileSelect(event)}
                  disabled={loading}
                  showLayoutOptions={false}
                />
              </AccordionItem>

              {phaseLabels.map((phase) => {
                const slots = images.phases[phase.phaseKey] ?? [criarSlot()];
                const comFoto = slots.filter((s) => s.url.trim()).length;
                return (
                  <AccordionItem
                    key={phase.phaseKey}
                    open={faseAberta === phase.phaseKey}
                    onToggle={() =>
                      setFaseAberta(faseAberta === phase.phaseKey ? null : phase.phaseKey)
                    }
                    title={phase.label}
                    subtitle={phase.short}
                    badge={comFoto > 0 ? `${comFoto} foto${comFoto > 1 ? "s" : ""}` : undefined}
                  >
                    <PhaseImagesField
                      phaseKey={phase.phaseKey}
                      slots={slots}
                      onChange={(slotId, ajuste) => updatePhaseSlot(phase.phaseKey, slotId, ajuste)}
                      onAdd={() => addPhaseImage(phase.phaseKey)}
                      onRemove={(slotId) => removePhaseSlot(phase.phaseKey, slotId)}
                      onFileSelect={(slotId, event) =>
                        void onPhaseFileSelect(phase.phaseKey, slotId, event)
                      }
                      disabled={loading}
                    />
                  </AccordionItem>
                );
              })}
            </div>
          ) : null}

          {tab === "link" ? (
            <div className="space-y-4">
              <p className="text-sm text-[#666]">
                Gere o link quando os dados estiverem completos. Você pode abrir a proposta ou só copiar
                o endereço.
              </p>
              {link ? (
                <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#888]">Link gerado</p>
                  <input readOnly value={link} className={cn(inputClass, "mt-2 bg-white")} />
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button type="button" onClick={() => void copiarLink()} className={btnPrimary}>
                      Copiar link
                    </button>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(btnSecondary, "text-center")}
                    >
                      Abrir proposta
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#ddd] bg-[#fafafa] px-4 py-8 text-center text-sm text-[#888]">
                  Nenhum link gerado ainda.
                </div>
              )}
            </div>
          ) : null}

          {status ? (
            <p
              className={cn(
                "mt-4 rounded-lg px-3 py-2 text-sm",
                status.includes("Erro") || status.includes("Não foi")
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-800",
              )}
            >
              {status}
            </p>
          ) : null}
        </form>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#eee] bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mt-6 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className={btnPrimary + " flex-1"}
            disabled={!clientComplete || loading}
            onClick={() => void salvarProposta(true)}
          >
            {loading ? "Salvando…" : "Gerar e abrir"}
          </button>
          <button
            type="button"
            className={btnSecondary + " flex-1"}
            disabled={!clientComplete || loading}
            onClick={() => void salvarProposta(false)}
          >
            Só gerar link
          </button>
        </div>
      </div>
    </div>
  );
}

function DestinoCard({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-left transition",
        active
          ? "border-[#911419] bg-[#911419]/5 ring-1 ring-[#911419]"
          : "border-[#e8e8e8] hover:border-[#ccc]",
      )}
    >
      <p className="text-sm font-semibold text-[#333]">{title}</p>
      <p className="mt-0.5 text-xs text-[#888]">{desc}</p>
    </button>
  );
}

function AccordionItem({
  open,
  onToggle,
  title,
  subtitle,
  badge,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ececec]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#fafafa]"
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition",
            open ? "bg-[#911419] text-white" : "bg-[#eee] text-[#666]",
          )}
        >
          {open ? "−" : "+"}
        </span>
        <span className="min-w-0 flex-1">
          {subtitle ? <span className="block text-xs text-[#888]">{subtitle}</span> : null}
          <span className="block truncate text-sm font-medium text-[#333]">{title}</span>
        </span>
        {badge ? (
          <span className="shrink-0 rounded-full bg-[#911419]/10 px-2 py-0.5 text-xs font-medium text-[#911419]">
            {badge}
          </span>
        ) : null}
      </button>
      {open ? <div className="border-t border-[#f0f0f0] px-4 py-4">{children}</div> : null}
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
    <label className={cn("block text-sm text-[#444]", className)}>
      <span className="mb-1 block font-medium">{label}</span>
      {children}
    </label>
  );
}

function ImageField({
  value,
  onChange,
  onFileSelect,
  disabled,
  showLayoutOptions = true,
}: {
  value: ImageSlot;
  onChange: (ajuste: Partial<ImageAdjustments>) => void;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  showLayoutOptions?: boolean;
}) {
  const inputId = "file-hero";
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          className={inputClass}
          value={value.url}
          onChange={(e) => onChange({ url: e.target.value })}
          placeholder="URL ou envie um arquivo"
        />
        <label
          htmlFor={inputId}
          className={cn(btnUpload, disabled && "pointer-events-none opacity-50")}
        >
          Enviar foto
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={disabled}
            onChange={onFileSelect}
          />
        </label>
      </div>
      {value.url ? (
        <ImageAdjustmentEditor
          value={value}
          onChange={(ajuste) => onChange(ajuste)}
          aspectClass="aspect-[16/9]"
          disabled={disabled}
          showLayoutOptions={showLayoutOptions}
        />
      ) : null}
    </div>
  );
}

function PhaseImagesField({
  phaseKey,
  slots,
  onChange,
  onAdd,
  onRemove,
  onFileSelect,
  disabled,
}: {
  phaseKey: string;
  slots: ImageSlot[];
  onChange: (slotId: string, ajuste: Partial<ImageAdjustments>) => void;
  onAdd: () => void;
  onRemove: (slotId: string) => void;
  onFileSelect: (slotId: string, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          className="text-xs font-semibold text-[#911419] hover:underline"
          onClick={onAdd}
          disabled={disabled}
        >
          + Adicionar foto
        </button>
      </div>
      {slots.map((slot, index) => {
        const inputId = `file-${phaseKey}-${slot.id}`;
        return (
          <div key={slot.id} className="rounded-lg border border-[#f0f0f0] bg-[#fafafa] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-[#666]">Foto {index + 1}</span>
              {slots.length > 1 ? (
                <button
                  type="button"
                  className="text-xs text-[#999] hover:text-[#911419]"
                  onClick={() => onRemove(slot.id)}
                  disabled={disabled}
                >
                  Remover
                </button>
              ) : null}
            </div>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                className={inputClass}
                value={slot.url}
                onChange={(e) => onChange(slot.id, { url: e.target.value })}
                placeholder="URL ou envie um arquivo"
              />
              <label
                htmlFor={inputId}
                className={cn(btnUpload, disabled && "pointer-events-none opacity-50")}
              >
                Enviar
                <input
                  id={inputId}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={disabled}
                  onChange={(event) => onFileSelect(slot.id, event)}
                />
              </label>
            </div>
            {slot.url ? (
              <ImageAdjustmentEditor
                value={slot}
                onChange={(ajuste) => onChange(slot.id, ajuste)}
                disabled={disabled}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#ddd] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#911419] focus:ring-2 focus:ring-[#911419]/15";

const btnPrimary =
  "rounded-lg bg-[#911419] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1115] disabled:cursor-not-allowed disabled:opacity-50";

const btnSecondary =
  "rounded-lg border border-[#333] bg-white px-4 py-3 text-sm font-semibold text-[#333] transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-50";

const btnUpload =
  "inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#911419] bg-white px-4 py-2.5 text-sm font-semibold text-[#911419] transition hover:bg-[#911419]/5";
