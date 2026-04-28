"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface PhaseProps {
  number: string;
  title: string;
  items: string[];
  imageUrl: string;
  imageAlt: string;
  reversed?: boolean;
  observation?: string;
}

function Phase({
  number,
  title,
  items,
  imageUrl,
  imageAlt,
  reversed = false,
  observation,
}: PhaseProps) {
  const phaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (phaseRef.current) {
      observer.observe(phaseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={phaseRef}
      className={`grid min-h-[70vh] duration-700 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text Content */}
      <div className="flex flex-col justify-center bg-background px-8 py-16 md:px-12 lg:px-20">
        <div className="relative">
          <span className="absolute -left-4 -top-8 font-sans text-[100px] font-light leading-none text-muted/40 md:-left-8 md:-top-12 md:text-[140px]">
            {number}
          </span>
          <div className="relative z-10 pt-12 md:pt-16">
            <h3 className="font-sans text-xl font-medium uppercase tracking-widest text-primary md:text-2xl">
              {title}
            </h3>
            <ul className="mt-6 space-y-2 text-base leading-relaxed text-muted-foreground md:text-lg">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {observation && (
              <p className="mt-6 border-l-2 border-primary/30 pl-4 text-sm italic text-muted-foreground">
                {observation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative min-h-[50vh] md:min-h-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function ProjectPhases() {
  const phases: PhaseProps[] = [
    {
      number: "01",
      title: "Estudo Preliminar",
      items: [
        "Plantas baixas de todos os pavimentos com indicações conforme o programa",
        "Dimensionamento ergonômico dos ambientes",
        "Definição das vias de acesso de veículos e pedestres",
        "Áreas de jardim e lazer",
        "Definição das aberturas (portas e janelas)",
        "Níveis e alturas (pé-direito de todos os ambientes)",
        "Cotas gerais de implantação e dos ambientes",
        "Layout com posicionamento de móveis e definição da ergonomia",
        "Bancadas de cozinha, locação dos equipamentos, Área Gourmet, Armários",
        "Indicação de Norte",
      ],
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      imageAlt: "Estudo preliminar de arquitetura",
    },
    {
      number: "02",
      title: "Anteprojeto com Fachadas 3D",
      items: [
        "Desenvolvimento em modelo 3D das fachadas",
        "Definição do método construtivo",
        "Definição das cores, materiais e revestimentos da fachada",
        "Readequação de vãos se fizer interessante para a fachada",
      ],
      imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      imageAlt: "Fachada moderna em 3D",
      reversed: true,
    },
    {
      number: "03",
      title: "Projeto de Prefeitura",
      items: [
        "Documentação solicitada pela prefeitura",
        "Projeto de implantação com níveis do terreno e da construção",
        "Indicação dos recuos obrigatórios",
        "Indicação das áreas (residência, varanda, garagem etc.) com metragem e níveis",
        "Hachuras diferenciando as áreas a serem construídas",
        "Cotas de nível do terreno, nível e dimensão da calçada",
        "Indicação do rebaixamento da guia",
        "Indicação das coberturas e demais área de projeção",
        "Detalhe da piscina com cortes",
        "Indicação das coordenadas, dados do local, proprietário e responsável",
        "Taxa de ocupação e coeficiente de aproveitamento",
        "Aprovação do projeto na Prefeitura e Associação de Moradores",
      ],
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      imageAlt: "Planta baixa e projeto legal",
    },
    {
      number: "04",
      title: "Projetos Complementares",
      items: [
        "Locação dos pontos de elétrica, telefonia, iluminação e hidráulica",
        "Pontos hidráulicos: chuveiros, pias, vasos sanitários, ralos, torneiras, registros, dreno de ar condicionado, tanque etc.",
        "Pontos elétricos: tomadas, telefone, televisão, internet, ar condicionado, campainha, quadro de luz etc.",
        "Pontos de iluminação: spots, arandelas, plafons e demais itens com numeração dos circuitos e locais de acionamento",
      ],
      observation: "Não são desenvolvidos detalhamentos de projeto hidráulico ou elétrico (caminhamento, diâmetros, cálculo de carga), mas é feita a conferência e compatibilização.",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
      imageAlt: "Projetos complementares de engenharia",
      reversed: true,
    },
    {
      number: "05",
      title: "Projeto Executivo",
      items: [
        "Plantas dos pavimentos com medidas pertinentes, cotas de nível, numeração de esquadrias",
        "Indicação de pisos com inclinação para escoamento de água",
        "Indicação dos pilares conforme projeto estrutural",
        "Planta de cobertura, caixa d'água, pontos hidráulicos, elétricos e iluminação",
        "Planta de impermeabilização indicando áreas e materiais adequados",
        "Quadro de esquadrias com especificações completas",
        "Cortes longitudinais e transversais com alturas, níveis e perfil do terreno",
        "Fachadas com cores, revestimentos, materiais e medidas dos elementos",
        "Detalhes de escada, claraboia, piscina, esquadrias diferenciadas, pergolados etc.",
        "Entrega de arquivos DWG, PDF e uma cópia impressa",
      ],
      imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      imageAlt: "Projeto executivo detalhado",
    },
  ];

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-12 md:py-24">
        <h2 className="text-center font-sans text-2xl font-medium uppercase tracking-widest text-foreground md:text-3xl">
          Fases do Projeto
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Conheça cada etapa do desenvolvimento do seu projeto
        </p>
      </div>
      
      <div className="divide-y divide-border">
        {phases.map((phase, index) => (
          <Phase
            key={phase.number}
            {...phase}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}
