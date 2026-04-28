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
}

export function TermsSection({ cidade, condominio }: TermsSectionProps) {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-8 md:px-12">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-medium uppercase tracking-widest text-foreground md:text-3xl">
            Termos e Condições
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Clique em cada item para expandir e visualizar os detalhes
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="objeto" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                I - Objeto do Contrato
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  O presente Contrato tem como objeto a elaboração pelo CONTRATADO de um Projeto Arquitetônico consubstanciado em uma Residência na cidade de {cidade || "{CIDADE}"}-SP, podendo a metragem sofrer alterações de acordo com o desenvolvimento do projeto ou alterações solicitadas pelo CONTRATANTE.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="especificacao" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                II - Especificação do Projeto
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  De conformidade com as especificações preliminares do CONTRATANTE, o projeto deverá ser desenvolvido adequando a construção para conter: programa definido em reunião e aprovado pelo CONTRATANTE.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="levantamento" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                Levantamento do Local
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  Visitar e fotografar o local e seu entorno analisando suas características, insolação, principais vistas, ventilação, vizinhos, infraestrutura existente, acessos etc. a fim de verificar as possibilidades e viabilidades do projeto a ser desenvolvido.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="aprovacao" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                Aprovação em Órgãos
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>
                    <strong>Prefeitura Municipal de {cidade || "{CIDADE}"}:</strong> Projeto conforme padrões municipais, incluindo documentação, implantação, níveis, recuos, hachuras, coordenadas, taxa de ocupação e coeficiente de aproveitamento. Prazo de aprovação: 30 dias úteis sem comunique-se.
                  </li>
                  <li>
                    <strong>Associação de Moradores {condominio || "{CONDOMÍNIO}"}:</strong> Projeto conforme exigências regulamentadas pelo Condomínio.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="obrigacoes-contratante" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                VI - Obrigações do Contratante
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>1. Viabilizar a conclusão do projeto dentro dos prazos estipulados inclusive com a entrega de todos os elementos necessários ao desenvolvimento do projeto e proceder aos pagamentos dos honorários contratados.</li>
                  <li>2. Comunicar ao CONTRATADO por e-mail no endereço eletrônico <strong>adm@bevilacqua.com.br</strong> as datas da implantação da construção, da concretagem das vigas, e concretagem das lajes com no mínimo <strong>uma semana de antecedência</strong> sob pena de ter sua ART cancelada.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="obrigacoes-contratado" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                VII - Obrigações do Contratado
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>1. Os serviços a serem prestados pelo CONTRATADO consistem no desenvolvimento do projeto completo de arquitetura, todos apresentados em escala adequada à perfeita compreensão dos elementos neles contidos e devidamente aprovados pelos órgãos competentes e suas respectivas anotações de responsabilidade técnica (ART).</li>
                  <li>2. Será de responsabilidade única do contratado a execução dos serviços acima descritos e cumprimento dos prazos estabelecidos. Coordenar e dar orientação geral para execução dos projetos complementares ao projeto arquitetônico.</li>
                  <li>3. O CONTRATADO deverá elaborar os projetos objetivados no presente contrato em obediência às normas e especificações técnicas vigentes, responsabilizando-se pelos serviços prestados, na forma da legislação em vigor.</li>
                  <li>4. Visitas técnicas na obra (com notificação prévia):
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>• Na locação das estacas para conferência</li>
                      <li>• Antes da concretagem das vigas baldrames</li>
                      <li>• Antes da concretagem da laje do térreo</li>
                      <li>• Antes da concretagem da laje do superior</li>
                    </ul>
                  </li>
                  <li>5. Visitar esporadicamente a construção, mediante disponibilidade, quando solicitado pelo CONTRATANTE para interpretação de projeto.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="clausula-penal" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                VIII - Cláusula Penal
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ul className="space-y-4">
                  <li>
                    <strong>Rescisão pelo CONTRATANTE:</strong> Se o CONTRATANTE rescindir injustificadamente o presente contrato antes da conclusão integral de todas as fases do projeto, além de não possuir qualquer direito sobre os valores já quitados pelas fases já concluídas, pagará ao CONTRATADO multa de <strong>20% sobre o saldo que remanescer</strong> para a conclusão do projeto.
                  </li>
                  <li>
                    <strong>Rescisão pelo CONTRATADO:</strong> Se o CONTRATADO rescindir injustificadamente o presente contrato sem concluir integralmente todas as fases do presente projeto, perderá todos os direitos autorais sobre as fases já concluídas, sub-rogando tais direitos a qualquer outro profissional que vier a ser contratado pelo CONTRATANTE, além de ter que pagar em favor desse último uma multa de <strong>20% sobre o saldo que remanescer</strong> para a conclusão do projeto.
                  </li>
                  <li>
                    <strong>Modificações posteriores:</strong> Será igualmente cobrado separadamente, a modificação feita pelo CONTRATANTE, se as mesmas forem posteriores a etapa já aprovada.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="foro" className="border-border bg-background px-6">
              <AccordionTrigger className="text-left font-sans text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary hover:no-underline">
                IX - Foro de Eleição
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <p>
                  Fica eleito o Foro da Comarca São José dos Campos, para dirimir toda e qualquer dúvida que por ventura se origine do presente instrumento.
                </p>
                <p className="mt-4">
                  Por estarem justos e acertados, assinam o presente contrato em 02 vias de igual teor, juntamente com 02 testemunhas, valendo o presente como título executivo extrajudicial.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
