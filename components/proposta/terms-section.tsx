"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TermsSectionProps {
  cidade: string;
  condominio: string;
  metragem: string;
  valorM2: string;
  valorTotal: string;
}

export function TermsSection({
  cidade,
  condominio,
  metragem,
  valorM2,
  valorTotal,
}: TermsSectionProps) {
  const parcela = (() => {
    const valorNumerico = parseFloat(valorTotal.replace(/\./g, "").replace(",", "."));
    return (valorNumerico * 0.2).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  })();

  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-8 md:px-12">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-medium uppercase tracking-widest text-foreground md:text-3xl">
            Termos e Condições do Contrato
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Resumo das cláusulas do contrato de prestação de serviços
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="objeto" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                I — Objeto do Contrato
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  Elaboração pelo CONTRATADO de um Projeto Arquitetônico consubstanciado em uma Residência
                  com área construída de {metragem} na cidade de {cidade}-SP, podendo tal metragem sofrer
                  alterações de acordo com o desenvolvimento do projeto ou alterações solicitadas pelo
                  CONTRATANTE.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="especificacao" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                II — Especificação do Projeto
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  De conformidade com as especificações preliminares do CONTRATANTE, o projeto deverá ser
                  desenvolvido adequando a construção para conter: programa definido em reunião e aprovado
                  pelo CONTRATANTE.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fases" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                III — Fases do Projeto
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Levantamento do local de intervenção: visita e fotografia do local e entorno para análise
                  de insolação, vistas, ventilação, vizinhos, infraestrutura e acessos.
                </p>
                <p><strong>Etapa 1 — Estudo Preliminar:</strong> plantas baixas, ergonomia, acessos, layout e cotas gerais.</p>
                <p><strong>Etapa 2 — Anteprojeto com fachadas em 3D:</strong> modelagem, materiais, revestimentos e readequação de vãos.</p>
                <p><strong>Etapa 3 — Projeto de Prefeitura e condomínio {condominio}:</strong> documentação legal, implantação, recuos, áreas e aprovação.</p>
                <p><strong>Etapa 4 — Projetos complementares:</strong> locação de pontos elétricos, hidráulicos e de iluminação, com conferência e compatibilização.</p>
                <p><strong>Etapa 5 — Projeto Executivo:</strong> plantas, cortes, fachadas, detalhamentos, memoriais e entrega de arquivos DWG/PDF com cópia impressa.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prazos" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                IV — Dos Prazos
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground leading-relaxed">
                <p>A — Estudo preliminar: 20 dias úteis para entrega e 20 dias para devolutiva do contratante.</p>
                <p>B — Anteprojeto: 20 dias úteis após aprovação do estudo; contratante tem 10 dias para considerações.</p>
                <p>C — Entrada no condomínio: 15 dias úteis após aprovação do anteprojeto.</p>
                <p>D — Entrada na Prefeitura: 5 dias úteis após pré-aprovação no condomínio.</p>
                <p>E — Projetos de locação de pontos: até 15 dias para entrega.</p>
                <p>F — Projeto Executivo: até 30 dias úteis após aprovação da locação de pontos.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="preco" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                V — Do Preço
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Valor de R$ {valorM2}/m², totalizando R$ {valorTotal}, em 5 parcelas de 20% (R$ {parcela}):
                  assinatura, 30, 60 e 90 dias, e entrega do projeto executivo (podendo ocorrer por boletos).
                </p>
                <p>
                  Não incluso: registro, taxas, emolumentos, impostos, plotagens, placa de obra, cópias,
                  maquetes, renders, motoboy e projetos técnicos de elétrica, hidráulica e estrutural.
                </p>
                <p>Acréscimo de área: R$ {valorM2} por m² adicional mediante adendo contratual.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="obrigacoes-contratante" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                VI — Obrigações do Contratante
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>1. Viabilizar a conclusão do projeto dentro dos prazos e proceder aos pagamentos dos honorários.</li>
                  <li>
                    2. Comunicar ao CONTRATADO por e-mail em{" "}
                    <strong>adm@bevilacqua.com.br</strong> as datas de implantação, concretagem de vigas e
                    lajes com no mínimo uma semana de antecedência, sob pena de cancelamento da ART.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="obrigacoes-contratado" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                VII — Obrigações do Contratado
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>1. Desenvolver o projeto completo de arquitetura com ART e aprovação nos órgãos competentes.</li>
                  <li>
                    2. Executar os serviços e cumprir prazos, coordenando projetos complementares de fundação,
                    estrutura, hidráulica, elétrica e telefonia em obediência às normas técnicas vigentes.
                  </li>
                  <li>
                    3. Realizar visitas técnicas na obra, quando notificado com antecedência, para locação de
                    estacas, vigas baldrames e concretagens de lajes.
                  </li>
                  <li>4. Visitar esporadicamente a construção, quando solicitado, para interpretação de projeto.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clausula-penal" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                VIII — Cláusula Penal
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-4">
                  <li>
                    Rescisão pelo CONTRATANTE: multa de 20% sobre o saldo remanescente, sem direito sobre
                    valores já quitados das fases concluídas.
                  </li>
                  <li>
                    Rescisão pelo CONTRATADO: perda dos direitos autorais das fases concluídas e multa de 20%
                    sobre o saldo remanescente em favor do novo profissional contratado.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="foro" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                IX — Foro de Eleição
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  Fica eleito o Foro da Comarca de São José dos Campos para dirimir dúvidas oriundas do
                  presente instrumento. O contrato é assinado em 02 vias de igual teor, com 02 testemunhas,
                  valendo como título executivo extrajudicial.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
