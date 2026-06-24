export function slugifyCliente(nome: string): string {
  const base = (nome || "cliente")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "cliente";
}

export function gerarIdCurto(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function montarSlugProposta(nomeCliente: string, id?: string): string {
  return `${slugifyCliente(nomeCliente)}-${id ?? gerarIdCurto()}`;
}
