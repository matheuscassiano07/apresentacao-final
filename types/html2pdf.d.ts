declare module "html2pdf.js" {
  interface Html2PdfChain {
    from(element: HTMLElement): Html2PdfChain;
    save(): Promise<void>;
  }

  interface Html2PdfWorker {
    set(options: Record<string, unknown>): Html2PdfWorker;
    from(element: HTMLElement): Html2PdfChain;
  }

  function html2pdf(): Html2PdfWorker;
  export default html2pdf;
}
