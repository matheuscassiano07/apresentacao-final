export type PropostaPhase = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  variant: "light" | "dark";
};

const APRESENTACAO_PHASES: PropostaPhase[] = [
  {
    id: "etapa-1",
    number: "01",
    title: "Primeiro Contato",
    subtitle: "Reunião de Apresentação",
    description:
      "Reunião inicial para o cliente conhecer o escritório, entender a metodologia de trabalho e tirar dúvidas sobre o processo.",
    image: "/images/phase-01.jpg",
    variant: "light",
  },
  {
    id: "etapa-2",
    number: "02",
    title: "Pós-Contrato",
    subtitle: "Grupo e Comunicação",
    description:
      "Após o fechamento, é criado um grupo no WhatsApp com o cliente para centralizar atualizações, validações e comunicação do projeto.",
    image: "/images/phase-02.png",
    variant: "dark",
  },
  {
    id: "etapa-3",
    number: "03",
    title: "Implantação",
    subtitle: "Levantamento e Estudo do Terreno",
    description:
      "Levantamento topográfico e estudo de implantação com jogo de volumes, corte e aterro, orientação solar e condicionantes do lote.",
    image: "/images/phase-03.jpg",
    variant: "light",
  },
  {
    id: "etapa-4",
    number: "04",
    title: "Briefing",
    subtitle: "Diretrizes do Projeto",
    description:
      "Etapa de aprofundamento das necessidades, referências e premissas para consolidar as diretrizes arquitetônicas.",
    image: "/images/phase-04.jpg",
    variant: "dark",
  },
  {
    id: "etapa-5",
    number: "05",
    title: "Estudo Arquitetônico",
    subtitle: "Planta e Desenvolvimento",
    description:
      "Desenvolvimento da planta, pavimentos e planta humanizada com as definições funcionais do projeto.",
    image: "/images/phase-05.jpg",
    variant: "light",
  },
  {
    id: "etapa-6",
    number: "06",
    title: "Anteprojeto",
    subtitle: "Fachada",
    description:
      "Desenvolvimento das fachadas em modelo 3D, com definição de materiais, composição e linguagem final.",
    image: "/images/phase-06.jpg",
    variant: "dark",
  },
  {
    id: "etapa-7",
    number: "07",
    title: "Aprovação e Complementares",
    subtitle: "Projeto Legal",
    description:
      "Desenvolvimento do projeto legal para aprovação junto a órgãos públicos e condomínio, com etapa complementar de pontos técnicos.",
    image: "/images/phase-07.jpg",
    variant: "light",
  },
  {
    id: "etapa-8",
    number: "08",
    title: "Planejamento",
    subtitle: "Orçamentos de Terceiros",
    description:
      "Levantamento e organização de orçamentos de terceiros para apoiar as decisões técnicas e financeiras do cliente.",
    image: "/images/phase-08.jpg",
    variant: "dark",
  },
  {
    id: "etapa-9",
    number: "09",
    title: "Detalhamento",
    subtitle: "Projeto Executivo",
    description:
      "Solução final do projeto com detalhamento técnico completo para a execução da obra.",
    image: "/images/phase-09.jpg",
    variant: "light",
  },
  {
    id: "etapa-10",
    number: "10",
    title: "Integração",
    subtitle: "Compatibilizações",
    description:
      "Conferência e ajuste integrado entre arquitetura e disciplinas complementares para reduzir interferências na obra.",
    image: "/images/phase-10.jpg",
    variant: "dark",
  },
  {
    id: "etapa-11",
    number: "11",
    title: "Encerramento Técnico",
    subtitle: "Entrega Final do Projeto",
    description:
      "Entrega oficial do projeto consolidado e validado, com os arquivos e documentos previstos em contrato.",
    image: "/images/phase-11.jpg",
    variant: "light",
  },
  {
    id: "etapa-12",
    number: "12",
    title: "Pós-Entrega",
    subtitle: "Acompanhamento da Obra",
    description:
      "Suporte técnico durante a obra para esclarecer dúvidas e manter a execução alinhada ao projeto desenvolvido.",
    image: "/images/phase-12.jpg",
    variant: "dark",
  },
];

const PROPOSTA_EXCLUDED_IDS = new Set(["etapa-1", "etapa-2", "etapa-11"]);

function renumberPhases(phases: PropostaPhase[]): PropostaPhase[] {
  return phases.map((phase, index) => ({
    ...phase,
    id: `etapa-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
  }));
}

export function buildApresentacaoPhases(): PropostaPhase[] {
  return APRESENTACAO_PHASES;
}

/** Etapas da proposta comercial: sem Primeiro Contato, Pós-Contrato e Encerramento Técnico. */
export function buildPropostaPhases(): PropostaPhase[] {
  return renumberPhases(APRESENTACAO_PHASES.filter((phase) => !PROPOSTA_EXCLUDED_IDS.has(phase.id)));
}

export function buildPhasesForVariant(variant: "apresentacao" | "proposta"): PropostaPhase[] {
  return variant === "proposta" ? buildPropostaPhases() : buildApresentacaoPhases();
}

export function phaseCountForVariant(variant: "apresentacao" | "proposta"): number {
  return buildPhasesForVariant(variant).length;
}
