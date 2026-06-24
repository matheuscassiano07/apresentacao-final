export function buildPropostaPhases() {
  const phaseImage01 = "/images/phase-01.jpg";
  const phaseImage02 = "/images/phase-02.png";
  const phaseImage03 = "/images/phase-03.jpg";
  const phaseImage04 = "/images/phase-04.jpg";
  const phaseImage05 = "/images/phase-05.jpg";
  const phaseImage06 = "/images/phase-06.jpg";
  const phaseImage07 = "/images/phase-07.jpg";
  const phaseImage08 = "/images/phase-08.jpg";
  const phaseImage09 = "/images/phase-09.jpg";
  const phaseImage10 = "/images/phase-10.jpg";
  const phaseImage11 = "/images/phase-11.jpg";
  const phaseImage12 = "/images/phase-12.jpg";

  return [
    {
      id: "etapa-1",
      number: "01",
      title: "Primeiro Contato",
      subtitle: "Reunião de Apresentação",
      description:
        "Reunião inicial para o cliente conhecer o escritório, entender a metodologia de trabalho e tirar dúvidas sobre o processo.",
      image: phaseImage01,
      variant: "light" as const,
    },
    {
      id: "etapa-2",
      number: "02",
      title: "Pós-Contrato",
      subtitle: "Grupo e Comunicação",
      description:
        "Após o fechamento, é criado um grupo no WhatsApp com o cliente para centralizar atualizações, validações e comunicação do projeto.",
      image: phaseImage02,
      variant: "dark" as const,
    },
    {
      id: "etapa-3",
      number: "03",
      title: "Implantação",
      subtitle: "Levantamento e Estudo do Terreno",
      description:
        "Levantamento topográfico e estudo de implantação com jogo de volumes, corte e aterro, orientação solar e condicionantes do lote.",
      image: phaseImage03,
      variant: "light" as const,
    },
    {
      id: "etapa-4",
      number: "04",
      title: "Briefing",
      subtitle: "Diretrizes do Projeto",
      description:
        "Etapa de aprofundamento das necessidades, referências e premissas para consolidar as diretrizes arquitetônicas.",
      image: phaseImage04,
      variant: "dark" as const,
    },
    {
      id: "etapa-5",
      number: "05",
      title: "Estudo Arquitetônico",
      subtitle: "Planta e Desenvolvimento",
      description:
        "Desenvolvimento da planta, pavimentos e planta humanizada com as definições funcionais do projeto.",
      image: phaseImage05,
      variant: "light" as const,
    },
    {
      id: "etapa-6",
      number: "06",
      title: "Anteprojeto",
      subtitle: "Fachada",
      description:
        "Desenvolvimento das fachadas em modelo 3D, com definição de materiais, composição e linguagem final.",
      image: phaseImage06,
      variant: "dark" as const,
    },
    {
      id: "etapa-7",
      number: "07",
      title: "Aprovação e Complementares",
      subtitle: "Projeto Legal",
      description:
        "Desenvolvimento do projeto legal para aprovação junto a órgãos públicos e condomínio, com etapa complementar de pontos técnicos.",
      image: phaseImage07,
      variant: "light" as const,
    },
    {
      id: "etapa-8",
      number: "08",
      title: "Planejamento",
      subtitle: "Orçamentos de Terceiros",
      description:
        "Levantamento e organização de orçamentos de terceiros para apoiar as decisões técnicas e financeiras do cliente.",
      image: phaseImage08,
      variant: "dark" as const,
    },
    {
      id: "etapa-9",
      number: "09",
      title: "Detalhamento",
      subtitle: "Projeto Executivo",
      description:
        "Solução final do projeto com detalhamento técnico completo para a execução da obra.",
      image: phaseImage09,
      variant: "light" as const,
    },
    {
      id: "etapa-10",
      number: "10",
      title: "Integração",
      subtitle: "Compatibilizações",
      description:
        "Conferência e ajuste integrado entre arquitetura e disciplinas complementares para reduzir interferências na obra.",
      image: phaseImage10,
      variant: "dark" as const,
    },
    {
      id: "etapa-11",
      number: "11",
      title: "Encerramento Técnico",
      subtitle: "Entrega Final do Projeto",
      description:
        "Entrega oficial do projeto consolidado e validado, com os arquivos e documentos previstos em contrato.",
      image: phaseImage11,
      variant: "light" as const,
    },
    {
      id: "etapa-12",
      number: "12",
      title: "Pós-Entrega",
      subtitle: "Acompanhamento da Obra",
      description:
        "Suporte técnico durante a obra para esclarecer dúvidas e manter a execução alinhada ao projeto desenvolvido.",
      image: phaseImage12,
      variant: "dark" as const,
    },
  ];
}
