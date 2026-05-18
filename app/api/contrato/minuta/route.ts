import { responderPdfContrato } from "@/lib/contrato/api-response";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  return responderPdfContrato(request, "inline");
}
