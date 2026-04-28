"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhaseItem {
  title: string;
  description?: string;
}

interface PhaseSectionProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: PhaseItem[];
  image: string;
  variant?: "light" | "dark";
  note?: string;
  sectionIndex?: number;
}

export function PhaseSection({
  id,
  number,
  title,
  subtitle,
  description,
  items,
  image,
  variant = "light",
  note,
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
      { threshold: 0.1 }
    );

    const elements = contentRef.current?.querySelectorAll(".animate-item");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isDark = variant === "dark";
  const sectionIdx = Number.parseInt(number, 10) || sectionIndex + 1;
  const getCinematicRevealClass = (idx: number) => {
    const stage = idx <= 3 ? "intro" : idx <= 6 ? "middle" : "outro";
    const direction = idx % 3 === 1 ? "left" : idx % 3 === 2 ? "right" : "zoom";

    if (stage === "intro") return `cinematic-intro-${direction}`;
    if (stage === "middle") return `cinematic-middle-${direction}`;
    return `cinematic-outro-${direction}`;
  };

  const revealClass = getCinematicRevealClass(sectionIdx);

  const imageMotionClass =
    sectionIdx <= 3
      ? "cinematic-image-intro"
      : sectionIdx <= 6
        ? sectionIdx % 2 === 0
          ? "cinematic-image-middle-a"
          : "cinematic-image-middle-b"
        : "cinematic-image-outro";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "section-gradient noise-overlay relative min-h-screen w-full overflow-hidden py-16 lg:py-0",
        isDark ? "bg-foreground" : "bg-background"
      )}
    >
      {/* Large Number Background */}
      <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none lg:left-20">
        <span
          className={cn(
            "text-[30vw] font-extralight leading-none lg:text-[25vw]",
            isDark ? "text-background/[0.03]" : "text-foreground/[0.03]"
          )}
        >
          {number}
        </span>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 lg:items-center lg:gap-16 lg:px-12 lg:pl-32",
          sectionIdx % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
        )}
      >
        {/* Content */}
        <div ref={contentRef} className="flex-1 py-12 lg:py-0">
          {/* Phase Number */}
          <div className="animate-item mb-8 flex items-center gap-4 duration-700">
            <span
              className={cn(
                "text-6xl font-extralight lg:text-7xl",
                isDark ? "text-primary" : "text-primary"
              )}
            >
              {number}
            </span>
            <div className="elegant-divider h-px flex-1 max-w-32" />
          </div>

          {/* Title */}
          <div className={`animate-item ${revealClass} duration-700`} style={{ transitionDelay: "110ms" }}>
            <span
              className={cn(
                "text-xs uppercase tracking-[0.15em] md:text-sm",
                isDark ? "text-background/40" : "text-foreground/40"
              )}
            >
              {subtitle}
            </span>
            <h2
              className={cn(
                "mt-2 text-balance text-3xl font-medium uppercase tracking-wide sm:text-4xl lg:text-5xl",
                isDark ? "text-background" : "text-foreground"
              )}
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <p
            className={cn(
              `animate-item ${revealClass} mt-5 max-w-xl text-pretty text-base leading-relaxed duration-700 sm:text-lg`,
              isDark ? "text-background/70" : "text-foreground/70"
            )}
            style={{ transitionDelay: "230ms" }}
          >
            {description}
          </p>

          {/* Items */}
          <div className={`animate-item ${revealClass} mt-8 space-y-4 duration-700`} style={{ transitionDelay: "330ms" }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "group flex items-start gap-3 rounded-r-md border-l-2 py-3 pl-4 pr-3 transition-all duration-500 sm:pl-5 sm:pr-4",
                  isDark
                    ? "border-background/20 hover:border-primary hover:bg-background/0"
                    : "border-foreground/20 hover:border-primary hover:bg-foreground/0"
                )}
              >
                <span className={cn("mt-1 h-2 w-2 rounded-full bg-primary/70 transition-transform duration-500 group-hover:scale-125")} />
                <div>
                  <p
                    className={cn(
                      "text-base font-medium sm:text-lg",
                      isDark ? "text-background" : "text-foreground"
                    )}
                  >
                    {item.title}
                  </p>
                  {item.description && (
                    <p
                      className={cn(
                        "mt-1 text-sm sm:text-base",
                        isDark ? "text-background/50" : "text-foreground/50"
                      )}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          {note && (
            <p
              className={cn(
                `animate-item ${revealClass} mt-6 text-sm italic duration-700`,
                isDark ? "text-background/40" : "text-foreground/40"
              )}
              style={{ transitionDelay: "430ms" }}
            >
              {note}
            </p>
          )}

        </div>

        {/* Image */}
        <div className={cn("animate-item relative mt-6 aspect-[4/5] w-full flex-1 overflow-hidden rounded-2xl border border-foreground/20 shadow-[0_18px_40px_rgba(0,0,0,0.16)] duration-1000 lg:mt-0 lg:aspect-auto lg:h-[72vh]", revealClass)}>
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-[1400ms] hover:scale-[1.045] ${imageMotionClass}`}
          />
          {/* Overlay gradient */}
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-gradient-to-t from-foreground/50 to-transparent"
                : "bg-gradient-to-t from-background/30 to-transparent"
            )}
          />
        </div>
      </div>
    </section>
  );
}
