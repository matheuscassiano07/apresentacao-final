"use client";

import { useEffect, useRef } from "react";
import { Clock, FileText, Ruler, Wrench, CheckCircle, Building, Users } from "lucide-react";

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  duration: string;
  details: string[];
  index: number;
}

function TimelineItem({ icon, title, duration, details, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center text-center duration-500 opacity-0"
      style={{ animationFillMode: "forwards" }}
    >
      <div className="flex h-16 w-16 items-center justify-center bg-primary text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-6 font-sans text-sm font-medium uppercase tracking-widest text-foreground md:text-base">
        {title}
      </h3>
      <p className="mt-2 text-lg font-medium text-primary">{duration}</p>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

export function TimelineSection() {
  const items = [
    {
      icon: <Ruler className="h-7 w-7" />,
      title: "Estudo Preliminar",
      duration: "20 dias úteis",
      details: [
        "Após entrega dos elementos",
        "20 dias para aprovação",
        "10 dias para alterações",
      ],
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Anteprojeto",
      duration: "20 dias úteis",
      details: [
        "Após aprovação da etapa anterior",
        "10 dias para considerações",
        "10 dias para alterações",
      ],
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Condomínio",
      duration: "15 dias úteis",
      details: [
        "Entrada no projeto",
        "Cumprimento de comunique-se",
      ],
    },
    {
      icon: <Building className="h-7 w-7" />,
      title: "Prefeitura",
      duration: "5 dias úteis",
      details: [
        "Após pré-aprovação condomínio",
        "30 dias úteis para aprovação",
      ],
    },
    {
      icon: <Wrench className="h-7 w-7" />,
      title: "Complementares",
      duration: "15 dias úteis",
      details: [
        "Locação de pontos",
        "10 dias para alterações",
      ],
    },
    {
      icon: <CheckCircle className="h-7 w-7" />,
      title: "Executivo",
      duration: "30 dias úteis",
      details: [
        "Após aprovação dos pontos",
        "10 dias para alterações",
      ],
    },
  ];

  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-12">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-medium uppercase tracking-widest text-foreground md:text-3xl">
            Prazos de Entrega
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Os prazos para conclusão dos trabalhos estão condicionados ao cumprimento pelo CONTRATANTE de seus próprios prazos de aprovação
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <TimelineItem key={item.title} {...item} index={index} />
          ))}
        </div>

        {/* Observação */}
        <div className="mt-16 border-l-4 border-primary bg-background p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Importante:</strong> Os prazos acima são estimados e podem variar conforme a complexidade das alterações solicitadas e o tempo de resposta dos órgãos competentes. O prazo de aprovação na Prefeitura (30 dias úteis) não inclui eventuais comunique-se.
          </p>
        </div>
      </div>
    </section>
  );
}
