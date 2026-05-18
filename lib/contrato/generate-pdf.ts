import { copyFile, mkdir, readFile, writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";
import type { ContratoDadosCalculados } from "./types";
import { escaparLatex, formatarMoeda, gerarExtenso, limparCitacoes } from "./format";
import { compilarLatex } from "./tectonic";

const TEMPLATE_PATH = path.join(process.cwd(), "contrato", "contrato_template.tex");

export async function gerarPdfContrato(dados: ContratoDadosCalculados): Promise<{
  buffer: Buffer;
  nomeArquivo: string;
}> {
  const substituicoes: Record<string, string> = {
    "[[NOMECLIENTE]]": dados.nome_cliente,
    "[[CPF]]": dados.cpf,
    "[[METRAGEM]]": dados.metragem_raw,
    "[[CIDADE]]": dados.cidade,
    "[[CONDOMINIO]]": dados.condominio,
    "[[VALORM2]]": formatarMoeda(dados.valor_m2_num),
    "[[VALORM2EXT]]": gerarExtenso(dados.valor_m2_num),
    "[[VALORTOTAL]]": formatarMoeda(dados.valor_total_num),
    "[[VALORTOTALEXT]]": gerarExtenso(dados.valor_total_num),
    "[[VALORPARCELA]]": formatarMoeda(dados.valor_parcela_num),
    "[[VALORPARCELAEXT]]": gerarExtenso(dados.valor_parcela_num),
    "[[DATADIA]]": dados.data_dia,
    "[[DATAMES]]": dados.data_mes,
    "[[DATAANO]]": dados.data_ano,
  };

  let conteudo = limparCitacoes(await readFile(TEMPLATE_PATH, "utf-8"));

  for (const [tag, valor] of Object.entries(substituicoes)) {
    if (valor) {
      conteudo = conteudo.replaceAll(tag, escaparLatex(valor));
    }
  }

  const workDir = path.join(os.tmpdir(), `contrato-${Date.now()}`);
  const texPath = path.join(workDir, "temp_contrato.tex");
  const pdfPath = path.join(workDir, "temp_contrato.pdf");

  await mkdir(workDir, { recursive: true });
  await writeFile(texPath, conteudo, "utf-8");
  await copyFile(path.join(process.cwd(), "contrato", "image.png"), path.join(workDir, "image.png")).catch(
    () => undefined,
  );

  try {
    await compilarLatex(texPath, workDir);
    const buffer = await readFile(pdfPath);
    const nomeArquivo = `Contrato_${dados.nome_cliente.replace(/[^\w\s-]/g, "").trim() || "cliente"}.pdf`;
    return { buffer, nomeArquivo };
  } finally {
    for (const ext of [".tex", ".aux", ".log", ".out", ".pdf"]) {
      await unlink(path.join(workDir, `temp_contrato${ext}`)).catch(() => undefined);
    }
  }
}
