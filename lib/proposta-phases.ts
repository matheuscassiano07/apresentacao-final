export function buildPropostaPhases(cidade: string, condominio: string) {
  return [
    {
      id: "etapa-1",
      number: "01",
      title: "Implantação",
      subtitle: "Estudo do Terreno",
      description:
        "Análise detalhada do terreno e posicionamento ideal da edificação, considerando orientação solar, ventos predominantes e topografia.",
      items: [
        { title: "Análise do Terreno", description: "Estudo topográfico e características do lote" },
        { title: "Orientação Solar", description: "Posicionamento para melhor aproveitamento da luz natural" },
        { title: "Estudo de Acessos", description: "Definição de entradas e circulações" },
        { title: "Prazo Estimado", description: "5 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      variant: "light" as const,
    },
    {
      id: "etapa-2",
      number: "02",
      title: "Briefing",
      subtitle: "Conceito e Diretrizes",
      description:
        "Momento de escuta ativa onde captamos suas ideias, necessidades e sonhos para traduzir em arquitetura.",
      items: [
        { title: "Reunião de Alinhamento", description: "Conversa detalhada sobre expectativas e lifestyle" },
        { title: "Coleta de Referências", description: "Análise de inspirações e preferências estéticas" },
        { title: "Programa de Necessidades", description: "Definição de ambientes e funcionalidades" },
        { title: "Definição de Orçamento", description: "Alinhamento de expectativas financeiras" },
        { title: "Prazo Estimado", description: "3 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "etapa-3",
      number: "03",
      title: "Conceito",
      subtitle: "Estudo Preliminar",
      description:
        "Primeira materialização das ideias em plantas baixas, setorização e volumetria básica do projeto.",
      items: [
        { title: "Plantas Baixas", description: "Layout inicial de todos os pavimentos" },
        { title: "Setorização", description: "Organização de áreas íntimas, sociais e serviço" },
        { title: "Volumetria Básica", description: "Estudo de massas e proporções" },
        { title: "Layout com Mobiliário", description: "Dimensionamento adequado dos ambientes" },
        { title: "Prazo Estimado", description: "15 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800&q=80",
      ],
      variant: "light" as const,
    },
    {
      id: "etapa-4",
      number: "04",
      title: "Visualização",
      subtitle: "Fachadas e 3D",
      description:
        "Visualização realista do projeto com renderizações 3D de alta qualidade e vídeo walkthrough imersivo.",
      items: [
        { title: "Renders 3D Fotorrealistas", description: "Imagens de alta qualidade de todas as fachadas" },
        { title: "Vídeo Walkthrough", description: "Passeio virtual pelo exterior do projeto" },
        { title: "Estudos de Materiais", description: "Definição de acabamentos externos" },
        { title: "Integração Paisagística", description: "Harmonização com o entorno" },
        { title: "Prazo Estimado", description: "15 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "etapa-5",
      number: "05",
      title: "Detalhamento",
      subtitle: "Projetos Complementares",
      description:
        "Detalhamento técnico dos sistemas que dão vida e conforto à sua residência, incluindo iluminação, decoração e interiores.",
      items: [
        { title: "Projeto de Iluminação", description: "Design de luz natural e artificial" },
        { title: "Projeto de Interiores", description: "Exemplos de ambientação e decoração" },
        { title: "Projeto Hidrossanitário", description: "Instalações de água e esgoto" },
        { title: "Projeto Elétrico", description: "Instalações elétricas e automação" },
        { title: "Projeto Estrutural", description: "Cálculo e dimensionamento estrutural" },
        { title: "Prazo Estimado", description: "20 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      variant: "light" as const,
      note: "* Projetos técnicos desenvolvidos por profissionais especializados indicados pelo escritório.",
    },
    {
      id: "etapa-6",
      number: "06",
      title: "Regularização",
      subtitle: "Projeto Legal e Aprovações",
      description:
        "Documentação técnica completa para aprovação em órgãos competentes: condomínio e prefeitura.",
      items: [
        { title: "Aprovação no Condomínio", description: "Documentação conforme regras do loteamento" },
        { title: "Projeto para Prefeitura", description: "Atendimento às normas municipais" },
        { title: "Memorial Descritivo", description: "Especificações técnicas completas" },
        { title: "ART/RRT", description: "Responsabilidade técnica registrada" },
        { title: "Prazo Estimado", description: "15 dias úteis + aprovação" },
      ],
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "etapa-7",
      number: "07",
      title: "Integração",
      subtitle: "Compatibilização",
      description:
        "Integração e verificação de todos os projetos para garantir harmonia técnica e evitar conflitos na execução.",
      items: [
        { title: "Verificação de Interferências", description: "Análise de conflitos entre disciplinas" },
        { title: "Ajustes Técnicos", description: "Correções e otimizações necessárias" },
        { title: "Modelo Integrado", description: "Unificação de todas as informações" },
        { title: "Revisão Final", description: "Validação completa do conjunto" },
        { title: "Prazo Estimado", description: "10 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      variant: "dark" as const,
    },
    {
      id: "etapa-8",
      number: "08",
      title: "Construção",
      subtitle: "Projeto Executivo",
      description:
        "Documentação completa e detalhada para execução da obra, com todas as especificações técnicas necessárias.",
      items: [
        { title: "Plantas Detalhadas", description: "Todas as cotas e especificações" },
        { title: "Cortes e Elevações", description: "Detalhamento vertical completo" },
        { title: "Detalhes Construtivos", description: "Soluções técnicas específicas" },
        { title: "Caderno de Especificações", description: "Lista completa de materiais e acabamentos" },
        { title: "Prazo Estimado", description: "20 dias úteis" },
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      variant: "light" as const,
    },
  ];
}
