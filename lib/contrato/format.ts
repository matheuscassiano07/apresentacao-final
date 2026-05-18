// @ts-expect-error — pacote sem tipos oficiais
import extenso from "extenso";

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function gerarExtenso(valor: number): string {
  const texto = extenso(valor, { mode: "currency" }) as string;
  return texto
    .replace(/ reais/g, "")
    .replace(/ real/g, "")
    .replace(/ centavos/g, "");
}

export function limparCitacoes(textoLatex: string): string {
  return textoLatex.replace(/\[cite:[^\]]+\]/g, "");
}

export function escaparLatex(valor: string): string {
  return valor.replace(/%/g, "\\%").replace(/\$/g, "\\$");
}
