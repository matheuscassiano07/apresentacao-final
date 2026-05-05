"use client";

import { Download, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

interface FooterCTAProps {
  dataDia: string;
  dataMes: string;
  dataAno: string;
  nomeCliente: string;
  cpf: string;
  downloadUrl: string;
}

export function FooterCTA({
  dataDia,
  dataMes,
  dataAno,
  nomeCliente,
  cpf,
  downloadUrl,
}: FooterCTAProps) {
  const hasPdfDownload = downloadUrl.trim() !== "#" && downloadUrl.trim() !== "";

  return (
    <footer className="bg-foreground">
      {/* CTA */}
      <div className="noise-overlay cinematic-outro-zoom px-4 py-16 text-center lg:py-32">
        <span className="text-xs uppercase tracking-[0.16em] text-background/40 md:text-sm">
          Próximo Passo
        </span>
        <h2 className="mt-4 text-balance text-3xl font-light leading-tight text-background sm:text-4xl lg:text-5xl">
          Pronto para transformar
          <br />
          seu sonho em realidade?
        </h2>

        {hasPdfDownload ? (
          <a
            href={downloadUrl}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs uppercase tracking-[0.12em] text-background shadow-[0_12px_30px_rgba(145,20,25,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-primary/90 sm:mt-10 sm:gap-3 sm:px-10 sm:py-5 sm:text-base sm:tracking-widest"
          >
            <Download className="h-6 w-6" />
            Baixar Contrato
          </a>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.12em] text-background/60 sm:mt-10 sm:text-sm sm:tracking-widest">
            Download do contrato indisponível sem backend configurado.
          </p>
        )}
      </div>

      {/* Assinaturas */}
      <div className="cinematic-outro-left border-t border-background/10 px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm text-background/40 sm:text-base">
            São José dos Campos, {dataDia} de {dataMes} de {dataAno}.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-background/20 bg-background/[0.01] p-6 text-center">
              <div className="mx-auto h-px w-48 bg-background/20" />
              <p className="mt-4 text-base font-medium text-background sm:text-lg">Eduardo Bevilacqua</p>
              <p className="text-sm text-background/40 sm:text-base">CREA-SP 0600630932</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-background/30 sm:text-sm sm:tracking-widest">
                Contratado
              </p>
            </div>

            <div className="rounded-xl border border-background/20 bg-background/[0.01] p-6 text-center">
              <div className="mx-auto h-px w-48 bg-background/20" />
              <p className="mt-4 text-base font-medium text-background sm:text-lg">{nomeCliente}</p>
              <p className="text-sm text-background/40 sm:text-base">CPF: {cpf}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-background/30 sm:text-sm sm:tracking-widest">
                Contratante
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="cinematic-outro-right border-t border-background/10 px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-9mRrvj28aRZ67rPbc0QVFN9MRd8ZjD.webp"
                alt="Bevilacqua"
                width={50}
                height={50}
                className="h-14 w-auto"
              />
              <div>
                <p className="text-base font-medium text-background sm:text-lg">
                  Bevilacqua Arquitetura e Engenharia
                </p>
                <p className="text-xs text-background/40 sm:text-sm">49 anos de experiência</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-background/40 sm:gap-6 sm:text-base">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin className="h-5 w-5" />
                <span>Rua Viena, 203 - São José dos Campos</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="h-5 w-5" />
                <span>(12) 3942-8477</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Mail className="h-5 w-5" />
                <span>adm@bevilacqua.com.br</span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-background/10 pt-6 text-center">
            <p className="text-sm text-background/30">
              © {dataAno} Bevilacqua Arquitetura e Engenharia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
