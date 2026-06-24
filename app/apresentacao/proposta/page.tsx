import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { buildPropostaData } from "@/lib/proposta-data";
import { buildPropostaPhases } from "@/lib/proposta-phases";

interface ApresentacaoPropostaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ApresentacaoPropostaPage({ searchParams }: ApresentacaoPropostaPageProps) {
  const params = await searchParams;
  const propostaData = buildPropostaData(params);
  const phases = buildPropostaPhases();
  const rawReadonly = params.readonly;
  const readonlyValue = Array.isArray(rawReadonly) ? rawReadonly[0] : rawReadonly;
  const isReadonly = readonlyValue === "1";

  return (
    <PropostaEditorPage
      propostaData={propostaData}
      phases={phases}
      isReadonly={isReadonly}
      variant="proposta"
    />
  );
}
