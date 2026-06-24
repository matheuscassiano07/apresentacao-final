import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { gerarIdCurto } from "@/lib/proposta-slug";
import {
  ERRO_BLOB_NAO_CONFIGURADO,
  mensagemErroArmazenamento,
  podeUsarDiscoLocal,
} from "@/lib/proposta-storage-env";

export const runtime = "nodejs";
export const maxDuration = 60;

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "propostas");

function extensaoDeMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "jpg";
}

async function salvarLocal(file: File, nomeArquivo: string): Promise<string> {
  await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(LOCAL_UPLOAD_DIR, nomeArquivo), buffer);
  return `/uploads/propostas/${nomeArquivo}`;
}

async function salvarBlob(file: File, nomeArquivo: string): Promise<string> {
  const blob = await put(`propostas/images/${nomeArquivo}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return blob.url;
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ erro: "Arquivo não enviado." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ erro: "Envie um arquivo de imagem." }, { status: 400 });
    }

    const nomeArquivo = `${Date.now()}-${gerarIdCurto()}.${extensaoDeMime(file.type)}`;

    if (podeUsarDiscoLocal()) {
      const url = await salvarLocal(file, nomeArquivo);
      return NextResponse.json({ url });
    }

    try {
      const url = await salvarBlob(file, nomeArquivo);
      return NextResponse.json({ url });
    } catch (error) {
      return NextResponse.json(
        { erro: mensagemErroArmazenamento(error) },
        { status: 503 },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no upload.";
    const status = message.includes("Armazenamento") ? 503 : 500;
    return NextResponse.json({ erro: message }, { status });
  }
}

export { ERRO_BLOB_NAO_CONFIGURADO };
