# Estrutura de Imagens da Apresentação Bevilacqua

## Como Substituir as Imagens

Para atualizar as imagens da apresentação, substitua os arquivos na pasta `/public/images/` mantendo exatamente os mesmos nomes.

## Mapeamento de Imagens por Seção (1 imagem por section)

1. **hero-bg.jpg** - Fundo da seção principal (Hero)
   - Dimensão recomendada: 1920x1080
   - Formato: JPG ou PNG

2. **phase-01.jpg** - Seção 01 (Primeiro Contato)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

3. **phase-02.jpg** - Seção 02 (Pós-Contrato)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

4. **phase-03.jpg** - Seção 03 (Implantação)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

5. **phase-04.jpg** - Seção 04 (Briefing)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

6. **phase-05.jpg** - Seção 05 (Estudo Arquitetônico)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

7. **phase-06.jpg** - Seção 06 (Anteprojeto/Fachada)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

8. **phase-07.jpg** - Seção 07 (Aprovação e Complementares)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

9. **phase-08.jpg** - Seção 08 (Orçamentos de Terceiros)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

10. **phase-09.jpg** - Seção 09 (Projeto Executivo)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

11. **phase-10.jpg** - Seção 10 (Compatibilizações)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

12. **phase-11.jpg** - Seção 11 (Entrega Final do Projeto)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

13. **phase-12.jpg** - Seção 12 (Acompanhamento da Obra)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

14. **phase-13.jpg** - imagem reserva (placeholder)
   - Dimensão recomendada: 1200x800
   - Formato: JPG ou PNG

## Observações

- O arquivo `lib/proposta-phases.ts` já possui variáveis de imagem de `phaseImage01` até `phaseImage13`.
- As seções 01 a 12 usam imagens únicas (sem repetição).
- `phase-09.jpg` a `phase-13.jpg` foram criadas como placeholders e podem ser substituídas.

## Tabela de Mapeamento (section -> variável -> arquivo)

| Section | Variável | Arquivo |
|---|---|---|
| 01 | `phaseImage01` | `phase-01.jpg` |
| 02 | `phaseImage02` | `phase-02.jpg` |
| 03 | `phaseImage03` | `phase-03.jpg` |
| 04 | `phaseImage04` | `phase-04.jpg` |
| 05 | `phaseImage05` | `phase-05.jpg` |
| 06 | `phaseImage06` | `phase-06.jpg` |
| 07 | `phaseImage07` | `phase-07.jpg` |
| 08 | `phaseImage08` | `phase-08.jpg` |
| 09 | `phaseImage09` | `phase-09.jpg` |
| 10 | `phaseImage10` | `phase-10.jpg` |
| 11 | `phaseImage11` | `phase-11.jpg` |
| 12 | `phaseImage12` | `phase-12.jpg` |
| Reserva | `phaseImage13` | `phase-13.jpg` |

- `phase-03-1.jpg`, `phase-03-2.jpg` e `phase-03-3.jpg` não estão sendo usados no estado atual.
- As imagens são otimizadas automaticamente pelo Next.js.

## Texto Base para Instagram (Etapas da Minuta)

### ETAPA 1 - Estudo Preliminar (planta baixa)

Desenvolvimento do partido arquitetônico a partir do programa definido em reunião, consolidando as informações levando em consideração os dados levantados no local, contendo no mínimo:

- Plantas baixa de todos os pavimentos com indicações conforme o programa
- Dimensionamento ergonômico dos ambientes
- Definição das vias de acesso de veículos e de pedestres
- Áreas de jardim e lazer
- Definição das aberturas (portas e janelas)
- Níveis e alturas (pé-direito de todos os ambientes, diferença de piso a piso etc.)
- Cotas gerais de implantação
- Cotas gerais dos ambientes
- Layout contendo:
  - Posicionamento dos moveis
  - Definição da ergonomia
  - Bancadas de cozinha, locação dos equipamentos
  - Área Gourmet
  - Armários etc.
- Indicação de Norte

### ETAPA 2 - Anteprojeto com fachadas em 3D

- Desenvolvimento em modelo 3D das fachadas
- Definição do método construtivo
- Definição das cores, materiais e revestimentos da fachada
- Readequação de vãos se fizer interessante para a fachada

### ETAPA 3 - Projeto de Prefeitura

Projeto conforme padrões da Prefeitura Municipal de qdqwdqwd, contendo:

- Documentação solicitada pela prefeitura
- Projeto de implantação
- Níveis do terreno e da construção
- Indicação dos recuos obrigatórios
- Indicação das áreas (residência, varanda, garagem etc.) com a respectiva metragem quadrada e seus níveis
- Hachuras diferenciando as áreas a serem construídas
- Cotas de nível do terreno
- Nível e dimensão da calçada
- Indicação do rebaixamento da guia
- Indicação das coberturas e demais área de projeção
- Detalhe da piscina com cortes
- Indicação das coordenadas do local
- Indicação dos dados do local, proprietário e responsável do projeto
- Indicação da taxa de ocupação e coeficiente de aproveitamento da construção
- Aprovação do projeto (30 dias úteis sem comunique-se)

Aprovação do Projeto na Associação de Moradores eqweqweqwe:

- Projeto conforme exigências regulamentadas pelo Condomínio

### ETAPA 4 - Projetos Complementares

Locação dos pontos de elétrica, telefonia, iluminação e hidráulica. Distribuição dos pontos de elétrica e hidráulica de acordo com especificações fornecidas pelo cliente.

Pontos hidráulicos:

- Locação de pontos de chuveiros, pias, vasos sanitários, ralos, torneiras, registro, dreno de ar condicionado, tanque etc.

Obs.: Não são desenvolvidos detalhamentos de projeto hidráulico, como caminhamento dos canos ou diâmetro dos tubos, mas é feita a conferência e compatibilização.

Pontos elétricos:

- Locação de pontos de tomadas, telefone, televisão, internet, ar condicionado, campainha, quadro de luz etc.

Obs.: Não são desenvolvidos detalhamentos de projeto elétrico, como caminhamento dos conduítes ou diâmetro dos fios, cálculo de carga e detalhamento do quadro de disjuntores, mas é feita a conferência e compatibilização.

Pontos de iluminação:

- Locação de pontos de spots, arandelas, plafons e demais itens de iluminação e numeração dos circuitos com os respectivos locais de acionamento (interruptores)

### ETAPA 5 - Projeto Executivo

Solução definitiva do anteprojeto, representada em plantas, cortes e fachadas, detalhamentos, especificações e memoriais de todos os pormenores de que se constitui a obra a ser executada; determinação da distribuição das redes hidráulicas, elétricas, sanitárias, telefônicas e outras correlatas, tudo compatibilizado com os projetos complementares.

Contempla-se a entrega dos arquivos eletrônicos (DWG e PDF) e uma cópia impressa dos projetos.

Plantas dos pavimentos:

- Medidas pertinentes para a construção
- Cotas de nível de todos os ambientes
- Numeração e dimensionamento de todas as esquadrias
- Indicação dos detalhes pertinentes para a construção
- Indicação de pisos com inclinação para escoamento de água
- Indicação dos pilares com a nomenclatura de acordo com projeto estrutural
- Planta de cobertura indicando inclinação da telha e altura das platibandas
- Planta da caixa d’água com posicionamento dos reservatórios
- Planta com pontos hidráulicos definidos na etapa anterior
- Planta com pontos elétricos definidos na etapa anterior
- Planta com pontos de iluminação definidos na etapa anterior
- Planta de impermeabilização indicando as áreas a serem impermeabilizadas e o material adequado
- Quadro de esquadrias indicando largura, altura, peitoril (no caso de janelas) e observações pertinentes como o número de folhas, material (madeira, alumínio, PVC, vidro transparente, fosco), modelo (porta de giro, de correr, janela maxim-ar etc.), se terá persiana automatizada, tela mosquiteiro etc.

Cortes longitudinais e transversais (quantos forem necessários para entendimento do projeto):

- Indicação das alturas de pé direito
- Indicação altura dos vãos
- Indicação dos detalhes pertinentes para a construção
- Cotas de nível dos ambientes e terreno
- Indicação do perfil natural do terreno
- Escala humana
- Demais observações pertinentes ao projeto
- Perfil das divisas laterais e fundo do terreno indicando áreas de corte, aterro, muro de arrimo, cotas de nível, muro de divisa

Fachadas:

- Vistas de todos os lados
- Indicação das cores, revestimentos e materiais em geral
- Medidas dos elementos arquitetônicos
- Indicação das esquadrias

Detalhes:

- Detalhamento dos elementos para melhor entendimento para execução como: escada, claraboia, piscina, porta embutida, alguma esquadria diferenciada, pergolados etc.

