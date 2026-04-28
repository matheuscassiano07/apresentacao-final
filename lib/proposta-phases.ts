export function buildPropostaPhases(cidade: string, condominio: string) {
  return [
    {
      id: "etapa-1",
      number: "01",
      title: "Estudo Preliminar (Planta Baixa)",
      subtitle: "Conceito e Implantação",
      description:
        "Primeira materialização do seu projeto, transformando necessidades da família em uma planta clara, funcional e segura para evoluir sem retrabalho.",
      items: [
        { title: "Plantas de todos os pavimentos", description: "Com organização prática e leitura simples para tomada de decisão" },
        { title: "Dimensionamento ergonômico", description: "Ambientes confortáveis para o dia a dia da família" },
        { title: "Acessos e áreas externas", description: "Fluxo inteligente entre garagem, social, serviço, jardim e lazer" },
        { title: "Aberturas e níveis", description: "Portas, janelas e alturas pensadas para iluminação e ventilação" },
        { title: "Layout detalhado", description: "Mobiliário, bancadas, área gourmet e setorização completa" },
      ],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      variant: "light" as const,
    },
    {
      id: "etapa-2",
      number: "02",
      title: "Anteprojeto com Fachadas em 3D",
      subtitle: "Visualização Arquitetônica",
      description:
        "Etapa de encantamento visual: você enxerga o estilo da casa com segurança técnica antes da execução.",
      items: [
        { title: "Modelo 3D das fachadas", description: "Percepção real da volumetria e da presença arquitetônica" },
        { title: "Método construtivo", description: "Decisões técnicas para garantir viabilidade e qualidade" },
        { title: "Materiais e revestimentos", description: "Escolhas visuais alinhadas com estilo e durabilidade" },
        { title: "Readequação de vãos", description: "Ajustes finos para melhorar estética, conforto e iluminação" },
      ],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "etapa-3",
      number: "03",
      title: "Projeto de Prefeitura e Condomínio",
      subtitle: "Aprovações e Documentação",
      description:
        `Condução técnica das aprovações em ${cidade} e no condomínio ${condominio}, reduzindo risco de atrasos e retrabalho documental.`,
      items: [
        { title: "Documentação completa", description: "Implantação, níveis, recuos, áreas e projeções conforme exigências" },
        { title: "Dados técnicos e legais", description: "Taxas urbanísticas, coordenadas e dados oficiais do lote" },
        { title: "Detalhes de aprovação", description: "Piscina, guia, calçada, coberturas e elementos regulatórios" },
        { title: "Prefeitura", description: "Aprovação em até 30 dias úteis sem comunique-se" },
        { title: "Condomínio", description: "Projeto conforme regulamento da associação de moradores" },
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      variant: "light" as const,
    },
    {
      id: "etapa-4",
      number: "04",
      title: "Projetos Complementares",
      subtitle: "Infraestrutura Técnica",
      description:
        "Planejamento dos pontos técnicos que sustentam conforto, funcionalidade e praticidade no uso da casa.",
      items: [
        { title: "Pontos hidráulicos", description: "Definição prática de chuveiros, pias, ralos, torneiras e drenos" },
        { title: "Pontos elétricos", description: "Tomadas, internet, TV, ar-condicionado e quadro de distribuição" },
        { title: "Pontos de iluminação", description: "Cenários de luz e acionamentos para conforto e valorização estética" },
        { title: "Compatibilização", description: "Conferência entre disciplinas para evitar conflitos em obra" },
      ],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "etapa-5",
      number: "05",
      title: "Projeto Executivo",
      subtitle: "Detalhamento para Obra",
      description:
        "Pacote técnico completo para executar com precisão, previsibilidade de obra e maior controle de qualidade.",
      items: [
        { title: "Plantas completas", description: "Cotas, níveis, esquadrias e informações para execução segura" },
        { title: "Compatibilização final", description: "Integração de hidráulico, elétrico, iluminação e impermeabilização" },
        { title: "Cortes e fachadas", description: "Leitura completa de alturas, vãos e composição arquitetônica" },
        { title: "Detalhes executivos", description: "Escada, claraboia, piscina, esquadrias e elementos especiais" },
        { title: "Entrega final", description: "Arquivos DWG/PDF e cópia impressa para obra e fornecedores" },
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      variant: "light" as const,
      note: "As etapas e entregáveis seguem o escopo contratual completo da minuta.",
    },
    {
      id: "visual-projeto",
      number: "06",
      title: "Visualização do Projeto",
      subtitle: "Entregáveis Visuais",
      description:
        "Recursos visuais para você decidir com tranquilidade, visualizar ambientes e se sentir seguro antes da execução.",
      items: [
        { title: "Pranchas de plantas", description: "Distribuição dos ambientes com leitura objetiva para aprovação" },
        { title: "Fachadas e volumetria", description: "Antecipação do resultado final da residência" },
        { title: "Detalhes ampliados", description: "Elementos-chave como escadas, esquadrias e pontos especiais" },
        { title: "Compatibilização visual", description: "Integração entre arquitetura e sistemas da casa" },
      ],
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "prazos",
      number: "07",
      title: "Prazos do Projeto",
      subtitle: "Cronograma",
      description:
        "Cronograma transparente para você acompanhar cada entrega com clareza e avançar com segurança nas decisões.",
      items: [
        { title: "Estudo preliminar", description: "Entrega em 20 dias úteis + devolutiva do cliente em até 20 dias" },
        { title: "Anteprojeto", description: "20 dias úteis para elaboração + até 10 dias para considerações" },
        { title: "Entrada no condomínio", description: "Até 15 dias úteis após aprovação do contratante" },
        { title: "Entrada na prefeitura", description: "Até 5 dias úteis após pré-aprovação no condomínio" },
        { title: "Locação de pontos", description: "Entrega em até 15 dias, com ajustes em até 10 dias úteis" },
        { title: "Projeto executivo", description: "Até 30 dias úteis após aprovação da locação de pontos" },
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      variant: "dark" as const,
      note: "Qualquer alteração posterior às aprovações segue regra de aditivo contratual.",
    },
    {
      id: "obrigacoes",
      number: "08",
      title: "Obrigações do Contratante e Contratado",
      subtitle: "Responsabilidades",
      description:
        "Uma parceria estruturada para que você se sinta amparado do início ao fim, com responsabilidades claras em cada etapa.",
      items: [
        { title: "Contratante", description: "Fornecer dados, aprovar etapas e cumprir pagamentos nos prazos acordados" },
        { title: "Contratante", description: "Comunicar datas de obra com antecedência para manter cobertura de ART" },
        { title: "Contratado", description: "Entregar projeto completo, com normas técnicas e responsabilidade profissional" },
        { title: "Contratado", description: "Coordenar projetos complementares e realizar visitas técnicas nas fases-chave da obra" },
      ],
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
      variant: "light" as const,
      note: "Inclui cláusula penal e foro de eleição para segurança de ambas as partes.",
    },
  ];
}
