"use client";

import { useEffect, useRef } from "react";
import { PropostaImage } from "@/components/proposta/proposta-image";
import { PropostaImageFrame } from "@/components/proposta/proposta-image-frame";
import type { ImageAdjustments } from "@/lib/proposta-image-fit";
import { ajusteImagemParaEstilo, criarAjusteImagem } from "@/lib/proposta-image-fit";
import { cn } from "@/lib/utils";

interface PhaseSectionProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  images?: string[];
  gallery?: ImageAdjustments[];
  variant?: "light" | "dark";
  sectionIndex?: number;
}

export function PhaseSection({
  id,
  number,
  title,
  subtitle,
  description,
  image,
  images = [],
  gallery,
  variant = "light",
  sectionIndex = 0,
}: PhaseSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = contentRef.current?.querySelectorAll(".animate-item");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isDark = variant === "dark";
  const galleryItems =
    gallery && gallery.length > 0
      ? gallery
      : (images.length > 0 ? images : [image])
          .filter(Boolean)
          .map((src) => criarAjusteImagem(src));

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "section-gradient noise-overlay relative w-full overflow-hidden py-16 lg:py-24",
        isDark ? "bg-foreground" : "bg-background",
      )}
    >
      <div className="pointer-events-none absolute -left-10 top-24 select-none lg:left-20">
        <span
          className={cn(
            "text-[30vw] font-extralight leading-none lg:text-[20vw]",
            isDark ? "text-background/[0.03]" : "text-foreground/[0.03]",
          )}
        >
          {number}
        </span>
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 lg:pl-32">
        <div className="animate-item mb-8 flex items-center gap-4 duration-700">
          <span className="text-6xl font-extralight text-primary lg:text-7xl">{number}</span>
          <div className="elegant-divider h-px flex-1 max-w-32" />
        </div>

        <div className="animate-item duration-700">
          <span
            className={cn(
              "text-xs uppercase tracking-[0.15em] md:text-sm",
              isDark ? "text-background/40" : "text-foreground/40",
            )}
          >
            {subtitle}
          </span>
          <h2
            className={cn(
              "mt-2 text-balance text-3xl font-medium uppercase tracking-wide sm:text-4xl lg:text-5xl",
              isDark ? "text-background" : "text-foreground",
            )}
          >
            {title}
          </h2>
        </div>

        <p
          className={cn(
            "animate-item mt-5 max-w-3xl text-pretty text-base leading-relaxed duration-700 sm:text-lg",
            isDark ? "text-background/70" : "text-foreground/70",
          )}
        >
          {description}
        </p>

        <div className="animate-item mt-10 space-y-5 duration-700">
          {galleryItems.map((item, idx) => (
            <PropostaImageFrame key={`${id}-img-${idx}`} ajuste={item} variant={isDark ? "dark" : "light"}>
              <PropostaImage
                src={item.url}
                alt={`${title} — foto ${idx + 1}`}
                fill
                className="object-cover"
                style={ajusteImagemParaEstilo(item)}
              />
            </PropostaImageFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
