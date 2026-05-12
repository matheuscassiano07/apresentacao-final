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
  const phaseImage13 = "/images/phase-13.jpg";

  return [
    {
      id: "etapa-1",
      number: "01",
      title: "Primeiro Contato",
      subtitle: "Reunião de Apresentação",
      description:
        "Reunião inicial para o cliente conhecer o escritório, entender a metodologia de trabalho e tirar dúvidas sobre o processo.",
      items: [
        { title: "Apresentação do Escritório", description: "Explicação do escopo, etapas e forma de atendimento" },
        { title: "Alinhamento Inicial", description: "Entendimento geral do objetivo, perfil e expectativa do cliente" },
        { title: "Direcionamento Comercial", description: "Orientação sobre proposta, contratação e próximos passos" },
        { title: "Prazo Estimado", description: "1 dia útil" },
      ],
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
      items: [
        { title: "Criação do Grupo", description: "Canal oficial com cliente e equipe para todo o processo" },
        { title: "Fluxo de Atualizações", description: "Definição de formato e frequência das devolutivas" },
        { title: "Registro de Decisões", description: "Histórico de alinhamentos e aprovações durante o projeto" },
        { title: "Prazo Estimado", description: "1 dia útil" },
      ],
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
      items: [
        { title: "Levantamento Topográfico", description: "Base técnica do terreno para desenvolvimento do estudo" },
        { title: "Estudo de Implantação", description: "Posicionamento da edificação considerando acessos e recuos" },
        { title: "Jogo de Volumes", description: "Avaliação volumétrica inicial conforme terreno e programa" },
        { title: "Corte e Aterro", description: "Diretriz preliminar de movimentação de terra" },
        { title: "Orientação Solar", description: "Análise de insolação e melhor aproveitamento ambiental" },
        { title: "Prazo Estimado", description: "3 dias úteis após levantamento" },
      ],
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
      items: [
        { title: "Programa de Necessidades", description: "Definição dos ambientes, usos e prioridades da família" },
        { title: "Referências e Linguagem", description: "Levantamento de preferências estéticas e funcionais" },
        { title: "Premissas Técnicas", description: "Alinhamento de orçamento, prazos e nível de detalhamento" },
        { title: "Diretrizes Iniciais", description: "Consolidação das decisões que guiam as próximas etapas" },
        { title: "Prazo Estimado", description: "3 dias úteis" },
      ],
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
      items: [
        { title: "Planta dos Pavimentos", description: "Organização dos ambientes conforme briefing aprovado" },
        { title: "Planta Humanizada", description: "Leitura clara dos espaços com visão de uso" },
        { title: "Estudo de Layout", description: "Setorização, ergonomia e circulações principais" },
        { title: "Ajustes Funcionais", description: "Refinamento dos ambientes antes da etapa de fachada" },
        { title: "Prazo Estimado", description: "15 dias úteis" },
      ],
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
      items: [
        { title: "Modelagem de Fachadas", description: "Desenvolvimento visual externo alinhado ao estudo aprovado" },
        { title: "Materiais e Revestimentos", description: "Definição de texturas, cores e acabamentos" },
        { title: "Ajustes de Vão", description: "Readequação técnica de aberturas quando necessário" },
        { title: "Aprovação da Etapa", description: "Validação para avançar à documentação técnica" },
        { title: "Prazo Estimado", description: "15 dias úteis após aprovação do estudo" },
      ],
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
      items: [
        { title: "Projeto de Prefeitura", description: "Documentação legal com implantação, recuos, áreas e níveis" },
        { title: "Aprovação em Condomínio", description: "Adequação conforme regras e exigências internas" },
        { title: "Projetos Complementares", description: "Locação de pontos elétricos, hidráulicos e iluminação" },
        { title: "Trâmites de Aprovação", description: "Acompanhamento dos processos com os órgãos competentes" },
        { title: "Prazo Estimado", description: "30 dias úteis + prazo dos órgãos aprovadores" },
      ],
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
      items: [
        { title: "Orçamentos de Terceiros", description: "Definição do escopo para detalhamento de projetos de terceiros, de estrutura, hidráulica, elétrica e iluminação" },
        { title: "Coleta de Orçamentos", description: "Coleta de orçamento e comparativos de proposta de projeto de estrutura, hidráulica, elétrica e automação" },
        { title: "Itens Específicos", description: "Orçamento de itens específicos de estrutura ou detalhes construtivos para finalização do partido arquitetônico" },
        { title: "Apoio à Contratação", description: "Apoio na contratação e definição de prazos" },
        { title: "Prazo Estimado", description: "5 dias úteis" },
      ],
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
      items: [
        { title: "Memorial Técnico", description: "Especificações objetivas de materiais, sistemas e execução" },
        { title: "Detalhes Executivos", description: "Escadas, cobertura, impermeabilização e elementos especiais" },
        { title: "Padrões Construtivos", description: "Definições para orientar a equipe de obra em campo" },
        { title: "Documentação Técnica", description: "Documentação final executiva para uso na construção" },
        { title: "Prazo Estimado", description: "20 dias úteis" },
      ],
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
      items: [
        { title: "Análise de Interferências", description: "Verificação de conflitos entre os sistemas do projeto" },
        { title: "Ajustes de Coordenação", description: "Correções para garantir coerência técnica global" },
        { title: "Validação Final Integrada", description: "Consolidação das versões para execução" },
        { title: "Diretriz de Obra", description: "Orientação técnica para início da construção" },
        { title: "Prazo Estimado", description: "7 dias úteis" },
      ],
      image: phaseImage10,
      images: [phaseImage10, phaseImage13],
      variant: "dark" as const,
    },
    {
      id: "etapa-11",
      number: "11",
      title: "Encerramento Técnico",
      subtitle: "Entrega Final do Projeto",
      description:
        "Entrega oficial do projeto consolidado e validado, com os arquivos e documentos previstos em contrato.",
      items: [
        { title: "Pacote Final", description: "Entrega dos arquivos digitais e materiais técnicos finais" },
        { title: "Checklist de Entrega", description: "Conferência de todos os itens acordados no escopo" },
        { title: "Orientação de Uso", description: "Explicação sobre leitura e aplicação dos documentos" },
        { title: "Formalização", description: "Registro de conclusão e aceite da etapa de projeto" },
        { title: "Prazo Estimado", description: "2 dias úteis" },
      ],
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
      items: [
        { title: "Suporte ao Cliente", description: "Canal para esclarecimentos técnicos durante a execução" },
        { title: "Alinhamento com Equipes", description: "Interação com profissionais envolvidos na construção" },
        { title: "Acompanhamento e Obra", description: "Visitas e acompanhamento técnico em campo conforme escopo contratado" },
        { title: "Ajustes Pontuais", description: "Orientações sobre adequações necessárias em campo" },
        { title: "Controle de Conformidade", description: "Acompanhamento para preservar a intenção do projeto" },
        { title: "Prazo Estimado", description: "Conforme cronograma da obra" },
      ],
      image: phaseImage12,
      variant: "dark" as const,
    },
  ];
}
