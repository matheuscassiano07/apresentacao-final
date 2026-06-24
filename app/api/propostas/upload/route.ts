import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { gerarIdCurto } from "@/lib/proposta-slug";

export const runtime = "nodejs";

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

    if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
      const blob = await put(`propostas/images/${nomeArquivo}`, file, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return NextResponse.json({ url: blob.url });
    }

    const url = await salvarLocal(file, nomeArquivo);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no upload.";
    return NextResponse.json({ erro: message }, { status: 500 });
  }
}
