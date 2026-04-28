type QueryValue = string | string[] | undefined;

export interface PropostaData {
  nomeCliente: string;
  cpf: string;
  condominio: string;
  cidade: string;
  metragem: string;
  valorM2: string;
  valorTotal: string;
  parcela20: string;
  dataValidade: string;
  dataDia: string;
  dataMes: string;
  dataAno: string;
  downloadUrl: string;
}

export interface PropostaPayload {
  nome_cliente: string;
  cpf: string;
  condominio: string;
  cidade: string;
  metragem: string;
  valor_m2: string;
  data_dia: string;
  data_mes: string;
  data_ano: string;
}

function getFirstValue(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function parseNumeroBr(value: string, fallback: number): number {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatarMoedaBr(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildPropostaData(searchParams: Record<string, QueryValue>): PropostaData {
  const nomeCliente = getFirstValue(searchParams.nome_cliente) || "Cliente";
  const cpf = getFirstValue(searchParams.cpf) || "___";
  const condominio = getFirstValue(searchParams.condominio) || "Condomínio";
  const cidade = getFirstValue(searchParams.cidade) || "São José dos Campos";

  const metragemInput = getFirstValue(searchParams.metragem) || "200";
  const valorM2Input = getFirstValue(searchParams.valor_m2) || "80,00";

  const metragemNumero = parseNumeroBr(metragemInput, 200);
  const valorM2Numero = parseNumeroBr(valorM2Input, 80);
  const valorTotalNumero = metragemNumero * valorM2Numero;
  const parcelaNumero = valorTotalNumero * 0.2;

  const dataDia = getFirstValue(searchParams.data_dia) || "19";
  const dataMes = getFirstValue(searchParams.data_mes) || "maio";
  const dataAno = getFirstValue(searchParams.data_ano) || "2025";

  const metragemFormatada = Number.isInteger(metragemNumero)
    ? String(metragemNumero)
    : metragemNumero.toLocaleString("pt-BR");
  const valorM2 = formatarMoedaBr(valorM2Numero);

  const pdfParams = new URLSearchParams({
    nome_cliente: nomeCliente,
    cpf,
    cidade,
    condominio,
    metragem: metragemFormatada,
    valor_m2: valorM2,
    data_dia: dataDia,
    data_mes: dataMes,
    data_ano: dataAno,
  });

  return {
    nomeCliente,
    cpf,
    condominio,
    cidade,
    metragem: `${metragemFormatada}m²`,
    valorM2,
    valorTotal: formatarMoedaBr(valorTotalNumero),
    parcela20: formatarMoedaBr(parcelaNumero),
    dataValidade: "30 dias",
    dataDia,
    dataMes,
    dataAno,
    downloadUrl: `http://localhost:5000/gerar-pdf?${pdfParams.toString()}`,
  };
}

export function propostaDataToPayload(data: PropostaData): PropostaPayload {
  return {
    nome_cliente: data.nomeCliente,
    cpf: data.cpf,
    condominio: data.condominio,
    cidade: data.cidade,
    metragem: data.metragem.replace("m²", "").trim(),
    valor_m2: data.valorM2,
    data_dia: data.dataDia,
    data_mes: data.dataMes,
    data_ano: data.dataAno,
  };
}
