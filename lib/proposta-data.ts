type QueryValue = string | string[] | undefined;

export interface PropostaData {
  nomeCliente: string;
  cpf: string;
  condominio: string;
  cidade: string;
  cidadeCliente: string;
  cidadeObra: string;
  telefone: string;
  objetoProposta: string;
  areaPretendida: string;
  areaTerreno: string;
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

function formatarArea(value: string, fallback = "0"): string {
  const numero = parseNumeroBr(value, Number.parseFloat(fallback.replace(",", ".")) || 0);
  return `${numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}m²`;
}

export function buildPropostaData(searchParams: Record<string, QueryValue>): PropostaData {
  const nomeCliente = getFirstValue(searchParams.nome_cliente).trim() || "Cliente";
  const cpf = getFirstValue(searchParams.cpf) || "___";
  const condominio = getFirstValue(searchParams.condominio).trim() || "Condomínio";
  const cidadeObra = getFirstValue(searchParams.cidade_obra).trim();
  const cidadeLegacy = getFirstValue(searchParams.cidade).trim();
  const cidade = cidadeObra || cidadeLegacy || "São José dos Campos";
  const cidadeCliente =
    getFirstValue(searchParams.cidade_cliente).trim() || cidadeLegacy || cidade;
  const telefone = getFirstValue(searchParams.telefone).trim() || "—";
  const objetoProposta =
    getFirstValue(searchParams.objeto_proposta).trim() ||
    "Projeto de Arquitetura e Interiores";

  const metragemInput = getFirstValue(searchParams.metragem) || "200";
  const areaTerrenoInput = getFirstValue(searchParams.area_terreno) || metragemInput;
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
    cidadeCliente,
    cidadeObra,
    telefone,
    objetoProposta,
    areaPretendida: formatarArea(metragemInput),
    areaTerreno: formatarArea(areaTerrenoInput),
    metragem: `${metragemFormatada}m²`,
    valorM2,
    valorTotal: formatarMoedaBr(valorTotalNumero),
    parcela20: formatarMoedaBr(parcelaNumero),
    dataValidade: "30 dias",
    dataDia,
    dataMes,
    dataAno,
    downloadUrl: `/api/contrato/gerar-pdf?${pdfParams.toString()}`,
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
