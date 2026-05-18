import { responderPdfContrato } from "@/lib/contrato/api-response";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const payload = Object.fromEntries(url.searchParams.entries());
  const fakeRequest = new Request(request.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return responderPdfContrato(fakeRequest, "attachment");
}
