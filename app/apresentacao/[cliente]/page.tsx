import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { resolvePropostaPorSlug } from "@/lib/resolve-proposta-salva";

interface ApresentacaoClientePageProps {
  params: Promise<{ cliente: string }>;
}

export default async function ApresentacaoClientePage({ params }: ApresentacaoClientePageProps) {
  const { cliente } = await params;
  const resolved = await resolvePropostaPorSlug(cliente, "apresentacao");

  if (!resolved) {
    return <main className="p-8">Apresentação não encontrada para este link.</main>;
  }

  const { view } = resolved;

  return (
    <PropostaEditorPage
      propostaData={view.propostaData}
      phases={view.phases}
      heroImage={view.heroImage}
      isReadonly={view.isReadonly}
      variant={view.variant}
    />
  );
}
