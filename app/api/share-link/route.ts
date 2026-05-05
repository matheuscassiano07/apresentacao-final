import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(payload ?? {})) {
      if (typeof value === "string" && value.trim()) {
        params.set(key, value);
      }
    }
    params.set("readonly", "1");

    const origin = request.nextUrl.origin;
    const url = `${origin}/apresentacao?${params.toString()}`;
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return NextResponse.json({ erro: message }, { status: 500 });
  }
}
