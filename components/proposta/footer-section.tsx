"use client";

import { useEffect, useRef } from "react";
import { Download, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

interface FooterSectionProps {
  dataDia: string;
  dataMes: string;
  dataAno: string;
  nomeCliente: string;
}

export function FooterSection({ dataDia, dataMes, dataAno, nomeCliente }: FooterSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-[#1A1A1A]">
      {/* CTA Section */}
      <div ref={contentRef} className="py-20 text-center duration-700 md:py-28">
        <h2 className="font-sans text-2xl font-light uppercase tracking-widest text-white md:text-3xl">
          Pronto para iniciar seu projeto?
        </h2>
        <p className="mx-auto mt-4 max-w-xl px-4 text-white/60">
          Estamos ansiosos para transformar seu sonho em realidade
        </p>

        <button className="mt-10 inline-flex items-center gap-3 bg-white px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-primary transition-colors hover:bg-white/90">
          <Download className="h-5 w-5" />
          Baixar Contrato para Assinatura
        </button>
      </div>

      {/* Assinaturas */}
      <div className="border-t border-white/10 px-8 py-16 md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm text-white/60">
            São José dos Campos, {dataDia} de {dataMes} de {dataAno}.
          </p>
          
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {/* Contratado */}
            <div className="text-center">
              <div className="mx-auto h-px w-48 bg-white/30" />
              <p className="mt-4 font-medium text-white">Eduardo Bevilacqua</p>
              <p className="text-sm text-white/60">CREA-SP 0600630932</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/40">Contratado</p>
            </div>
            
            {/* Contratante */}
            <div className="text-center">
              <div className="mx-auto h-px w-48 bg-white/30" />
              <p className="mt-4 font-medium text-white">Nome: {nomeCliente}</p>
              <p className="text-sm text-white/60">CPF: _________________</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/40">Contratante</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-white/10 px-8 py-10 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-9mRrvj28aRZ67rPbc0QVFN9MRd8ZjD.webp"
                alt="Bevilacqua"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <div>
                <p className="font-sans text-sm font-medium text-white">
                  Bevilacqua Arquitetura e Engenharia
                </p>
                <p className="text-xs text-white/60">48 anos de experiência</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Rua Viena, 203 - Jardim Oswaldo Cruz, São José dos Campos - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(12) 3942-8477 / 3942-7410</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>adm@bevilacqua.com.br</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/40">
              © {dataAno} Bevilacqua Arquitetura e Engenharia. Todos os direitos reservados.
            </p>
            <p className="mt-2 text-xs text-white/40">
              CEP 12.216-720 | CREA-SP 0600630932
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
