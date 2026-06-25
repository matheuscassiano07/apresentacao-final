import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import {
  type PropostaLayoutPadrao,
  layoutParaPayload,
  normalizarLayoutPadrao,
  type LayoutPadraoPayload,
} from "@/lib/proposta-layout-padrao";
import type { PropostaDestino } from "@/lib/proposta-store";
import {
  blobHeadOptions,
  blobPutOptions,
  blobStorageConfigurado,
  mensagemErroArmazenamento,
  podeUsarDiscoLocal,
} from "@/lib/proposta-storage-env";

const LOCAL_DIR = path.join(process.cwd(), ".data", "propostas");

function layoutBlobPath(destino: PropostaDestino): string {
  return `propostas/layout-padrao-${destino}.json`;
}

function layoutLocalPath(destino: PropostaDestino): string {
  return path.join(LOCAL_DIR, `layout-padrao-${destino}.json`);
}

async function carregarLayoutLocalDisco(destino: PropostaDestino): Promise<PropostaLayoutPadrao | null> {
  try {
    const raw = await readFile(layoutLocalPath(destino), "utf-8");
    const parsed = JSON.parse(raw) as PropostaLayoutPadrao;
    return normalizarLayoutPadrao({
      destino: parsed.destino ?? destino,
      imagens: { hero: parsed.hero, phases: parsed.phases ?? {} },
    });
  } catch {
    return null;
  }
}

async function salvarLayoutLocalDisco(layout: PropostaLayoutPadrao): Promise<void> {
  await mkdir(LOCAL_DIR, { recursive: true });
  await writeFile(layoutLocalPath(layout.destino), JSON.stringify(layout), "utf-8");
}

async function carregarLayoutBlob(destino: PropostaDestino): Promise<PropostaLayoutPadrao | null> {
  try {
    const meta = await head(layoutBlobPath(destino), blobHeadOptions());
    const response = await fetch(meta.url, { cache: "no-store" });
    if (!response.ok) return null;
    const parsed = (await response.json()) as PropostaLayoutPadrao;
    return normalizarLayoutPadrao({
      destino: parsed.destino ?? destino,
      imagens: { hero: parsed.hero, phases: parsed.phases ?? {} },
    });
  } catch {
    return null;
  }
}

async function salvarLayoutBlob(layout: PropostaLayoutPadrao): Promise<void> {
  await put(layoutBlobPath(layout.destino), JSON.stringify(layout), {
    ...blobPutOptions({ contentType: "application/json" }),
  });
}

export async function carregarLayoutPadraoServidor(
  destino: PropostaDestino,
): Promise<PropostaLayoutPadrao | null> {
  if (blobStorageConfigurado() && !podeUsarDiscoLocal()) {
    const blob = await carregarLayoutBlob(destino);
    if (blob) return blob;
  }

  if (podeUsarDiscoLocal()) {
    return carregarLayoutLocalDisco(destino);
  }

  return null;
}

export async function salvarLayoutPadraoServidor(input: LayoutPadraoPayload): Promise<PropostaLayoutPadrao> {
  const layout = normalizarLayoutPadrao(input);

  if (podeUsarDiscoLocal()) {
    await salvarLayoutLocalDisco(layout);
    return layout;
  }

  try {
    await salvarLayoutBlob(layout);
    return layout;
  } catch (error) {
    throw new Error(mensagemErroArmazenamento(error));
  }
}

export { layoutParaPayload };
