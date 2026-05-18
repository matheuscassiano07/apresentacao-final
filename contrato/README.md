# Automação do contrato (PDF)

- `contrato_template.tex` — modelo LaTeX com placeholders `[[NOMECLIENTE]]`, etc.
- `image.png` — logo usada no rodapé do PDF.

Rotas no Next.js (mesmo deploy Vercel):

| Rota | Uso |
|------|-----|
| `/admin` | Painel interno |
| `/cadastro-minuta` | Formulário de cadastro |
| `/api/contrato/minuta` | POST — visualizar PDF |
| `/api/contrato/gerar` | POST — baixar PDF |
| `/api/contrato/gerar-pdf` | GET — baixar PDF por query string |

A compilação usa [Tectonic](https://tectonic-typesetting.github.io/), baixado automaticamente na primeira geração.
