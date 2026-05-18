import type { ContratoDadosCalculados, ContratoFormData } from "./types";
import { formatarMoeda } from "./format";

function parseNumero(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function montarDadosContrato(
  origem: Partial<ContratoFormData> | Record<string, string | undefined>,
): ContratoDadosCalculados {
  const metragemRaw = String(origem.metragem ?? "").trim();
  const valorM2Raw = String(origem.valor_m2 ?? "").trim();
  const metragemNum = parseNumero(metragemRaw.replace(",", "."));
  const valorM2Num = parseNumero(valorM2Raw);

  if (!Number.isFinite(metragemNum) || !Number.isFinite(valorM2Num)) {
    throw new Error(
      "Erro de digitação: use apenas números nos campos Metragem e Valor M² (ex: 80,00).",
    );
  }

  const valorTotalNum = metragemNum * valorM2Num;
  const valorParcelaNum = valorTotalNum * 0.2;

  return {
    nome_cliente: String(origem.nome_cliente ?? "").trim(),
    cpf: String(origem.cpf ?? "").trim(),
    cidade: String(origem.cidade ?? "").trim(),
    condominio: String(origem.condominio ?? "").trim(),
    data_dia: String(origem.data_dia ?? "").trim(),
    data_mes: String(origem.data_mes ?? "").trim(),
    data_ano: String(origem.data_ano ?? "").trim(),
    metragem_raw: metragemRaw,
    valor_m2_num: valorM2Num,
    valor_total_num: valorTotalNum,
    valor_parcela_num: valorParcelaNum,
  };
}

export async function lerFormularioContrato(
  request: Request,
): Promise<Partial<ContratoFormData>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as Partial<ContratoFormData>;
  }

  const form = await request.formData();
  const dados: Partial<ContratoFormData> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") {
      dados[key as keyof ContratoFormData] = value;
    }
  }
  return dados;
}

export function dadosParaSearchParams(dados: ContratoDadosCalculados): URLSearchParams {
  return new URLSearchParams({
    nome_cliente: dados.nome_cliente,
    cpf: dados.cpf,
    cidade: dados.cidade,
    condominio: dados.condominio,
    metragem: dados.metragem_raw,
    valor_m2: formatarMoeda(dados.valor_m2_num),
    data_dia: dados.data_dia,
    data_mes: dados.data_mes,
    data_ano: dados.data_ano,
  });
}
