import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { buildPropostaData } from "@/lib/proposta-data";
import { buildPropostaPhases } from "@/lib/proposta-phases";

interface SharedPropostaPageProps {
  params: Promise<{ cliente: string }>;
}

const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:5000";

export default async function SharedPropostaPage({ params }: SharedPropostaPageProps) {
  const { cliente } = await params;
  const response = await fetch(`${BACKEND_URL}/proposta-dados/${encodeURIComponent(cliente)}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return <main className="p-8">Link inválido ou expirado.</main>;
  }

  const payload = await response.json();
  const propostaData = buildPropostaData(payload);
  const phases = buildPropostaPhases(propostaData.cidade, propostaData.condominio);
  return <PropostaEditorPage propostaData={propostaData} phases={phases} isReadonly />;
}
