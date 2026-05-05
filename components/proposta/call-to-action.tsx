"use client";

import { Phone, Globe } from "lucide-react";

export function CallToAction() {
  const whatsappNumber = "55119999999999"; // Substitua pelo número real
  const whatsappMessage = "Olá! Vi a apresentação e gostaria de mais informações.";
  const websiteUrl = "https://bevilacqua.com.br";

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleWebsiteClick = () => {
    window.open(websiteUrl, "_blank");
  };

  return (
    <section id="call-to-action" className="relative w-full bg-gradient-to-br from-foreground to-foreground/95 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(255,255,255,0.1) 100px,
              rgba(255,255,255,0.1) 101px
            )`
          }} 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
        {/* Título da Seção */}
        <div className="mb-12 animate-fade-lift">
          <h2 className="text-3xl font-light leading-tight text-background sm:text-4xl lg:text-5xl">
            Vamos Conversar
          </h2>
          <p className="mt-4 text-lg text-background/80 sm:text-xl">
            Transforme suas ideias em projeto. Entre em contato e vamos começar.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
          {/* Botão Website */}
          <button
            onClick={handleWebsiteClick}
            className="group relative flex items-center justify-center gap-3 rounded-xl bg-background px-8 py-4 text-foreground shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] sm:w-auto w-full"
          >
            <Globe className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-lg font-medium">Visite nosso site</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          {/* Botão WhatsApp */}
          <button
            onClick={handleWhatsAppClick}
            className="group relative flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-white shadow-[0_20px_40px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(37,211,102,0.4)] sm:w-auto w-full"
          >
            <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-lg font-medium">Chamar no WhatsApp</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>

        {/* Informação Adicional */}
        <div className="mt-16 animate-fade-lift" style={{ animationDelay: "300ms" }}>
          <p className="text-sm text-background/60">
            Estamos disponíveis para tirar suas dúvidas e agendar uma reunião.
          </p>
        </div>
      </div>
    </section>
  );
}
