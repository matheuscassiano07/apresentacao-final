import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { buildPropostaData } from "@/lib/proposta-data";
import { buildPropostaPhases } from "@/lib/proposta-phases";

interface ApresentacaoPropostaClientePageProps {
  params: Promise<{ cliente: string }>;
}

const BACKEND_URL = process.env.BACKEND_URL?.trim().replace(/\/$/, "");

export default async function ApresentacaoPropostaClientePage({ params }: ApresentacaoPropostaClientePageProps) {
  if (!BACKEND_URL) {
    return <main className="p-8">Defina BACKEND_URL para abrir propostas salvas por cliente.</main>;
  }

  const { cliente } = await params;
  const response = await fetch(`${BACKEND_URL}/proposta-dados/${encodeURIComponent(cliente)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return <main className="p-8">Proposta não encontrada para este cliente.</main>;
  }

  const payload = await response.json();
  const propostaData = buildPropostaData(payload);
  const phases = buildPropostaPhases();

  return (
    <PropostaEditorPage
      propostaData={propostaData}
      phases={phases}
      variant="proposta"
    />
  );
}
