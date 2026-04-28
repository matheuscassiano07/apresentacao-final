import { PropostaEditorPage } from "@/components/proposta/proposta-editor-page";
import { buildPropostaData } from "@/lib/proposta-data";
import { buildPropostaPhases } from "@/lib/proposta-phases";

interface ApresentacaoPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ApresentacaoPage({ searchParams }: ApresentacaoPageProps) {
  const propostaData = buildPropostaData(searchParams);
  const phases = buildPropostaPhases(propostaData.cidade, propostaData.condominio);
  const rawReadonly = searchParams.readonly;
  const readonlyValue = Array.isArray(rawReadonly) ? rawReadonly[0] : rawReadonly;
  const isReadonly = readonlyValue === "1";

  return (
    <PropostaEditorPage
      propostaData={propostaData}
      phases={phases}
      isReadonly={isReadonly}
    />
  );
}
