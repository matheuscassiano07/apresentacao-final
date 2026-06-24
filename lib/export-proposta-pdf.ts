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

export async function exportPropostaPdf(nomeCliente: string): Promise<void> {
  const element = document.getElementById("proposta-export-root");
  if (!element) {
    throw new Error("Conteúdo da proposta não encontrado.");
  }

  window.scrollTo(0, 0);
  await document.fonts.ready;
  await waitForImages(element);

  const excludes = element.querySelectorAll<HTMLElement>("[data-pdf-exclude]");
  excludes.forEach((node) => {
    node.dataset.pdfPrevDisplay = node.style.display;
    node.style.display = "none";
  });

  element.classList.add("proposta-exporting");

  try {
    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        margin: [4, 4, 4, 4],
        filename: `Proposta_${slugifyFilename(nomeCliente) || "bevilacqua"}.pdf`,
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: -window.scrollY,
          windowWidth: element.scrollWidth,
          onclone: (clonedDoc) => {
            const clonedRoot = clonedDoc.getElementById("proposta-export-root");
            if (!clonedRoot) return;

            clonedRoot.querySelectorAll("[data-pdf-exclude]").forEach((node) => node.remove());
            clonedRoot.classList.remove("proposta-exporting");

            clonedRoot.querySelectorAll("img").forEach((img) => {
              const src = img.getAttribute("src");
              if (src && !src.startsWith("data:")) {
                img.setAttribute("crossorigin", "anonymous");
              }
            });
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: ".proposta-section" },
      })
      .from(element)
      .save();
  } finally {
    element.classList.remove("proposta-exporting");
    excludes.forEach((node) => {
      node.style.display = node.dataset.pdfPrevDisplay ?? "";
      delete node.dataset.pdfPrevDisplay;
    });
  }
}
