import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { put, head } from "@vercel/blob";
import { montarSlugProposta, gerarIdCurto } from "@/lib/proposta-slug";
import {
  ERRO_BLOB_NAO_CONFIGURADO,
  blobHeadOptions,
  blobPutOptions,
  blobStorageConfigurado,
  mensagemErroArmazenamento,
  podeUsarDiscoLocal,
} from "@/lib/proposta-storage-env";

export type PropostaDestino = "proposta" | "apresentacao";

export interface PropostaSalva {
  id: string;
  slug: string;
  destino: PropostaDestino;
  dados: Record<string, string>;
  imagens: {
    hero: string;
    phases: Record<string, string[]>;
  };
  criadoEm: string;
}

const LOCAL_DIR = path.join(process.cwd(), ".data", "propostas");

function blobPath(slug: string): string {
  return `propostas/${slug}.json`;
}

function localPath(slug: string): string {
  return path.join(LOCAL_DIR, `${slug}.json`);
}

async function salvarLocal(slug: string, payload: PropostaSalva): Promise<void> {
  await mkdir(LOCAL_DIR, { recursive: true });
  await writeFile(localPath(slug), JSON.stringify(payload), "utf-8");
}

async function carregarLocal(slug: string): Promise<PropostaSalva | null> {
  try {
    const raw = await readFile(localPath(slug), "utf-8");
    return JSON.parse(raw) as PropostaSalva;
  } catch {
    return null;
  }
}

async function salvarBlob(slug: string, payload: PropostaSalva): Promise<void> {
  await put(blobPath(slug), JSON.stringify(payload), {
    ...blobPutOptions({ contentType: "application/json" }),
  });
}

async function carregarBlob(slug: string): Promise<PropostaSalva | null> {
  try {
    const meta = await head(blobPath(slug), blobHeadOptions());
    const response = await fetch(meta.url, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as PropostaSalva;
  } catch {
    return null;
  }
}

async function persistirProposta(slug: string, payload: PropostaSalva): Promise<void> {
  if (podeUsarDiscoLocal()) {
    await salvarLocal(slug, payload);
    return;
  }

  try {
    await salvarBlob(slug, payload);
  } catch (error) {
    throw new Error(mensagemErroArmazenamento(error));
  }
}

export async function salvarProposta(input: {
  destino: PropostaDestino;
  dados: Record<string, string>;
  imagens: PropostaSalva["imagens"];
}): Promise<PropostaSalva> {
  const id = gerarIdCurto();
  const slug = montarSlugProposta(input.dados.nome_cliente ?? "cliente", id);

  const payload: PropostaSalva = {
    id,
    slug,
    destino: input.destino,
    dados: input.dados,
    imagens: input.imagens,
    criadoEm: new Date().toISOString(),
  };

  await persistirProposta(slug, payload);
  return payload;
}

export async function carregarProposta(slug: string): Promise<PropostaSalva | null> {
  if (blobStorageConfigurado() && !podeUsarDiscoLocal()) {
    const blobData = await carregarBlob(slug);
    if (blobData) return blobData;
  }

  if (podeUsarDiscoLocal()) {
    return carregarLocal(slug);
  }

  return null;
}

export function propostaSalvaParaSearchParams(proposta: PropostaSalva): Record<string, string> {
  const params: Record<string, string> = { ...proposta.dados };
  if (proposta.dados.cidade_obra) {
    params.cidade = proposta.dados.cidade_obra;
  }
  if (proposta.imagens.hero) {
    params.img_hero = proposta.imagens.hero;
  }
  Object.entries(proposta.imagens.phases).forEach(([phaseKey, urls]) => {
    const filtered = urls.map((url) => url.trim()).filter(Boolean);
    if (filtered.length > 0) params[`img_${phaseKey}`] = filtered.join("|");
  });
  return params;
}

export { ERRO_BLOB_NAO_CONFIGURADO };
