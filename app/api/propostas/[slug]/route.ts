import { NextResponse } from "next/server";
import { carregarProposta } from "@/lib/proposta-store";

export const runtime = "nodejs";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const proposta = await carregarProposta(slug);
  if (!proposta) {
    return NextResponse.json({ erro: "Proposta não encontrada." }, { status: 404 });
  }
  return NextResponse.json(proposta);
}
