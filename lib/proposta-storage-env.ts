export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

export function podeUsarDiscoLocal(): boolean {
  return !isVercelRuntime();
}

export function getBlobStoreId(): string | undefined {
  return process.env.BLOB_STORE_ID?.trim() || undefined;
}

export function getBlobToken(): string | undefined {
  return (
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.VERCEL_BLOB_READ_WRITE_TOKEN?.trim() ||
    undefined
  );
}

/** Na Vercel com BLOB_STORE_ID, usa OIDC — não envia token antigo de blob apagado. */
export function usaTokenExplicito(): boolean {
  const token = getBlobToken();
  if (!token) return false;
  if (isVercelRuntime() && getBlobStoreId()) return false;
  return true;
}

export function blobStorageConfigurado(): boolean {
  if (podeUsarDiscoLocal()) return true;
  return Boolean(getBlobStoreId() || getBlobToken());
}

export function getBlobAccess(): "public" | "private" {
  const raw = process.env.BLOB_ACCESS?.trim().toLowerCase();
  return raw === "private" ? "private" : "public";
}

export const ERRO_BLOB_NAO_CONFIGURADO =
  "Blob não disponível neste deploy. Conecte o store bevilacqua-propostas (Public) ao projeto, confirme BLOB_STORE_ID em Production e faça Redeploy.";

export function mensagemErroArmazenamento(error: unknown): string {
  const original = error instanceof Error ? error.message : String(error);
  const lower = original.toLowerCase();

  if (lower.includes("store does not exist")) {
    return `Token de Blob antigo ou store apagado. Em Settings → Environment Variables, remova BLOB_READ_WRITE_TOKEN se existir (deixe só BLOB_STORE_ID) e faça Redeploy. Detalhe: ${original}`;
  }

  if (lower.includes("access") && lower.includes("public")) {
    return `O Blob foi criado como Private, mas o app espera Public. Crie um store Public ou defina BLOB_ACCESS=private. Detalhe: ${original}`;
  }

  if (!blobStorageConfigurado() && isVercelRuntime()) {
    return `${ERRO_BLOB_NAO_CONFIGURADO} Detalhe técnico: ${original}`;
  }

  if (
    lower.includes("blob") ||
    lower.includes("token") ||
    lower.includes("unauthorized") ||
    lower.includes("forbidden")
  ) {
    return `Erro no Vercel Blob: ${original}`;
  }

  return original || ERRO_BLOB_NAO_CONFIGURADO;
}

export function blobPutOptions(extra: Record<string, unknown> = {}) {
  return {
    access: getBlobAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    ...(usaTokenExplicito() ? { token: getBlobToken() } : {}),
    ...extra,
  };
}

export function blobHeadOptions(): { token?: string } | undefined {
  if (!usaTokenExplicito()) return undefined;
  const token = getBlobToken();
  return token ? { token } : undefined;
}
