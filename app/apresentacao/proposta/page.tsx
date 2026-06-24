import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { resolveApresentacaoView } from "@/lib/resolve-apresentacao-view";

interface ApresentacaoPropostaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ApresentacaoPropostaPage({ searchParams }: ApresentacaoPropostaPageProps) {
  const params = await searchParams;
  const view = resolveApresentacaoView(params, "proposta");

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
