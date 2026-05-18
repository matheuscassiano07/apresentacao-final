import { NextResponse } from "next/server";
import { gerarPdfContrato } from "./generate-pdf";
import { lerFormularioContrato, montarDadosContrato } from "./parse-form";

export async function responderPdfContrato(
  request: Request,
  disposition: "attachment" | "inline",
): Promise<NextResponse> {
  try {
    const form = await lerFormularioContrato(request);
    const dados = montarDadosContrato(form);
    const { buffer, nomeArquivo } = await gerarPdfContrato(dados);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${nomeArquivo}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ocorreu um erro inesperado ao gerar o PDF.";
    const status = message.includes("digitação") ? 400 : 500;
    return new NextResponse(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}
