import { NextRequest, NextResponse } from "next/server";
import {
  carregarLayoutPadraoServidor,
  salvarLayoutPadraoServidor,
} from "@/lib/proposta-layout-store";
import type { PropostaDestino } from "@/lib/proposta-store";

export const runtime = "nodejs";

function parseDestino(value: string | null): PropostaDestino {
  return value === "apresentacao" ? "apresentacao" : "proposta";
}

export async function GET(request: NextRequest) {
  try {
    const destino = parseDestino(request.nextUrl.searchParams.get("destino"));
    const layout = await carregarLayoutPadraoServidor(destino);
    return NextResponse.json({ layout });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao carregar layout padrão.";
    return NextResponse.json({ erro: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const destino = parseDestino(body.destino);
    const imagens = body.imagens;

    if (!imagens || typeof imagens !== "object") {
      return NextResponse.json({ erro: "Payload inválido." }, { status: 400 });
    }

    const layout = await salvarLayoutPadraoServidor({ destino, imagens });
    return NextResponse.json({ layout, ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao salvar layout padrão.";
    const status = message.includes("Armazenamento") || message.includes("Blob") ? 503 : 500;
    return NextResponse.json({ erro: message }, { status });
  }
}
