import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { resolveApresentacaoView } from "@/lib/resolve-apresentacao-view";

interface ApresentacaoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ApresentacaoPage({ searchParams }: ApresentacaoPageProps) {
  const params = await searchParams;
  const view = resolveApresentacaoView(params, "apresentacao");

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
