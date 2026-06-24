export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

export function podeUsarDiscoLocal(): boolean {
  return !isVercelRuntime();
}

export function getBlobToken(): string | undefined {
  return (
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.VERCEL_BLOB_READ_WRITE_TOKEN?.trim() ||
    undefined
  );
}

export function getBlobAccess(): "public" | "private" {
  const raw = process.env.BLOB_ACCESS?.trim().toLowerCase();
  return raw === "private" ? "private" : "public";
}

export const ERRO_BLOB_NAO_CONFIGURADO =
  "Blob não disponível neste deploy. Confirme: Storage → Blob conectado ao projeto bevilacqua, ambiente Production marcado, e Redeploy após conectar.";

export function mensagemErroArmazenamento(error: unknown): string {
  const original = error instanceof Error ? error.message : String(error);
  const lower = original.toLowerCase();
  const token = getBlobToken();

  if (lower.includes("access") && lower.includes("public")) {
    return `O Blob foi criado como Private, mas o app espera Public. Crie um Blob store com acesso Public, ou defina BLOB_ACCESS=private nas variáveis do projeto. Detalhe: ${original}`;
  }

  if (!token && isVercelRuntime()) {
    return `${ERRO_BLOB_NAO_CONFIGURADO} Detalhe técnico: ${original}`;
  }

  if (
    lower.includes("blob") ||
    lower.includes("token") ||
    lower.includes("unauthorized") ||
    lower.includes("forbidden")
  ) {
    return token
      ? `Erro no Vercel Blob: ${original}`
      : ERRO_BLOB_NAO_CONFIGURADO;
  }

  return original || ERRO_BLOB_NAO_CONFIGURADO;
}

export function blobPutOptions(extra: Record<string, unknown> = {}) {
  const token = getBlobToken();
  return {
    access: getBlobAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    ...(token ? { token } : {}),
    ...extra,
  };
}
