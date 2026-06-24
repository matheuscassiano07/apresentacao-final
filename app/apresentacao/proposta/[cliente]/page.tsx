import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { resolvePropostaPorSlug } from "@/lib/resolve-proposta-salva";

interface ApresentacaoPropostaClientePageProps {
  params: Promise<{ cliente: string }>;
}

export default async function ApresentacaoPropostaClientePage({
  params,
}: ApresentacaoPropostaClientePageProps) {
  const { cliente } = await params;
  const resolved = await resolvePropostaPorSlug(cliente, "proposta");

  if (!resolved) {
    return <main className="p-8">Proposta não encontrada para este link.</main>;
  }

  const { view } = resolved;

  return (
    <PropostaEditorPage
      propostaData={view.propostaData}
      phases={view.phases}
      heroImage={view.heroImage}
      isReadonly={view.isReadonly}
      variant="proposta"
    />
  );
}
