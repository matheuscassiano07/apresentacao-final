export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

export function podeUsarDiscoLocal(): boolean {
  return !isVercelRuntime();
}

export const ERRO_BLOB_NAO_CONFIGURADO =
  "Armazenamento não configurado na Vercel. Abra o projeto bevilacqua → Storage → Create Blob Store → conecte ao projeto e faça redeploy.";

export function mensagemErroArmazenamento(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (
      msg.includes("blob") ||
      msg.includes("token") ||
      msg.includes("unauthorized") ||
      msg.includes("forbidden") ||
      msg.includes("enoent")
    ) {
      return ERRO_BLOB_NAO_CONFIGURADO;
    }
    return error.message;
  }
  return ERRO_BLOB_NAO_CONFIGURADO;
}
