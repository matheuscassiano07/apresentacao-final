"use client";

/** Largura de captura equivalente a A4 em 96 DPI (~210 mm). */
const CAPTURE_WIDTH_PX = 794;
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PAGE_HEIGHT_PX = Math.round(CAPTURE_WIDTH_PX * (A4_HEIGHT_MM / A4_WIDTH_MM));
const CANVAS_SCALE = 2;

function waitForImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  ).then(() => undefined);
}

function slugifyFilename(nome: string): string {
  return (nome || "proposta")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function corFundoSecao(section: HTMLElement): string {
  const alvo = (section.firstElementChild as HTMLElement | null) ?? section;
  const bg = getComputedStyle(alvo).backgroundColor;
  if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
  return "#ffffff";
}

function prepararSecaoClonada(clonedSection: HTMLElement): void {
  clonedSection.style.width = `${CAPTURE_WIDTH_PX}px`;
  clonedSection.style.maxWidth = `${CAPTURE_WIDTH_PX}px`;
  clonedSection.style.zoom = "1";
  clonedSection.style.transform = "none";

  const intro = clonedSection.querySelector("#intro") as HTMLElement | null;
  if (intro) {
    intro.style.height = `${PAGE_HEIGHT_PX}px`;
    intro.style.minHeight = `${PAGE_HEIGHT_PX}px`;
  }

  clonedSection.querySelectorAll('[class*="w-screen"]').forEach((node) => {
    const el = node as HTMLElement;
    el.style.width = `${CAPTURE_WIDTH_PX}px`;
    el.style.maxWidth = `${CAPTURE_WIDTH_PX}px`;
    el.style.marginLeft = "0";
    el.style.left = "0";
    el.style.transform = "none";
    el.style.position = "relative";
  });

  clonedSection.querySelectorAll("[data-pdf-exclude]").forEach((node) => node.remove());

  clonedSection.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("data:")) {
      img.setAttribute("crossorigin", "anonymous");
    }
  });

  clonedSection.querySelectorAll("*").forEach((node) => {
    const el = node as HTMLElement;
    el.style.animation = "none";
    el.style.transition = "none";
  });
}

async function capturarSecao(section: HTMLElement): Promise<HTMLCanvasElement> {
  section.scrollIntoView({ block: "start" });
  await new Promise((resolve) => setTimeout(resolve, 100));

  const html2canvas = (await import("html2canvas")).default;

  return html2canvas(section, {
    scale: CANVAS_SCALE,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: corFundoSecao(section),
    scrollX: 0,
    scrollY: -window.scrollY,
    width: CAPTURE_WIDTH_PX,
    windowWidth: CAPTURE_WIDTH_PX,
    onclone: (_doc, cloned) => {
      prepararSecaoClonada(cloned as HTMLElement);
    },
  });
}

function adicionarSecaoAoPdf(
  pdf: {
    addPage(): void;
    addImage(...args: unknown[]): void;
    getNumberOfPages(): number;
  },
  canvas: HTMLCanvasElement,
  novaSecao: boolean,
): void {
  const pageHeightCanvasPx = Math.floor((A4_HEIGHT_MM / A4_WIDTH_MM) * canvas.width);
  const pxToMm = A4_WIDTH_MM / canvas.width;
  let offsetY = 0;
  let sliceIndex = 0;

  while (offsetY < canvas.height) {
    if (novaSecao && sliceIndex === 0) {
      if (pdf.getNumberOfPages() > 0) pdf.addPage();
    } else if (sliceIndex > 0) {
      pdf.addPage();
    }

    const sliceHeight = Math.min(pageHeightCanvasPx, canvas.height - offsetY);
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = sliceHeight;
    const ctx = slice.getContext("2d");
    if (!ctx) break;

    ctx.drawImage(canvas, 0, offsetY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
    pdf.addImage(
      slice.toDataURL("image/jpeg", 0.94),
      "JPEG",
      0,
      0,
      A4_WIDTH_MM,
      sliceHeight * pxToMm,
    );

    offsetY += sliceHeight;
    sliceIndex += 1;
  }
}

export async function exportPropostaPdf(
  nomeCliente: string,
  onProgress?: (atual: number, total: number) => void,
): Promise<void> {
  const root = document.getElementById("proposta-export-root");
  if (!root) {
    throw new Error("Conteúdo da proposta não encontrado.");
  }

  const sections = Array.from(root.querySelectorAll<HTMLElement>(".proposta-section"));
  if (sections.length === 0) {
    throw new Error("Nenhuma seção encontrada para exportar.");
  }

  window.scrollTo(0, 0);
  await document.fonts.ready;
  await waitForImages(root);

  const excludes = root.querySelectorAll<HTMLElement>("[data-pdf-exclude]");
  excludes.forEach((node) => {
    node.dataset.pdfPrevDisplay = node.style.display;
    node.style.display = "none";
  });

  root.classList.add("proposta-exporting");
  const tinhaCompact = root.classList.contains("proposta-compact");
  root.classList.remove("proposta-compact");

  const prevWidth = root.style.width;
  const prevMaxWidth = root.style.maxWidth;
  const prevMargin = root.style.margin;
  root.style.width = `${CAPTURE_WIDTH_PX}px`;
  root.style.maxWidth = `${CAPTURE_WIDTH_PX}px`;
  root.style.margin = "0 auto";

  try {
    const { jsPDF } = await import(/* webpackIgnore: true */ "jspdf");
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });

    for (let i = 0; i < sections.length; i++) {
      onProgress?.(i + 1, sections.length);
      const canvas = await capturarSecao(sections[i]!);
      adicionarSecaoAoPdf(pdf, canvas, i > 0);
    }

    pdf.save(`Proposta_${slugifyFilename(nomeCliente) || "bevilacqua"}.pdf`);
  } finally {
    root.style.width = prevWidth;
    root.style.maxWidth = prevMaxWidth;
    root.style.margin = prevMargin;
    root.classList.remove("proposta-exporting");
    if (tinhaCompact) root.classList.add("proposta-compact");

    excludes.forEach((node) => {
      node.style.display = node.dataset.pdfPrevDisplay ?? "";
      delete node.dataset.pdfPrevDisplay;
    });
  }
}
