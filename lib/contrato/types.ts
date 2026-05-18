export interface ContratoFormData {
  nome_cliente: string;
  cpf: string;
  cidade: string;
  condominio: string;
  metragem: string;
  valor_m2: string;
  data_dia: string;
  data_mes: string;
  data_ano: string;
}

export interface ContratoDadosCalculados {
  nome_cliente: string;
  cpf: string;
  cidade: string;
  condominio: string;
  data_dia: string;
  data_mes: string;
  data_ano: string;
  metragem_raw: string;
  valor_m2_num: number;
  valor_total_num: number;
  valor_parcela_num: number;
}
