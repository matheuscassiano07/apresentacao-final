import { NextRequest, NextResponse } from "next/server";
import { salvarProposta, type PropostaDestino } from "@/lib/proposta-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const destino = (body.destino === "apresentacao" ? "apresentacao" : "proposta") as PropostaDestino;
    const dados = body.dados;
    const imagens = body.imagens;

    if (!dados || typeof dados !== "object" || !imagens || typeof imagens !== "object") {
      return NextResponse.json({ erro: "Payload inválido." }, { status: 400 });
    }

    const salva = await salvarProposta({
      destino,
      dados,
      imagens: imagens as import("@/lib/proposta-image-fit").PropostaImagensPayload,
    });

    const origin = request.nextUrl.origin;
    const path =
      destino === "proposta"
        ? `/proposta/${salva.slug}/`
        : `/apresentacao/${salva.slug}/`;

    return NextResponse.json({
      slug: salva.slug,
      id: salva.id,
      url: `${origin}${path}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao salvar proposta.";
    const status = message.includes("Armazenamento") ? 503 : 500;
    return NextResponse.json({ erro: message }, { status });
  }
}
