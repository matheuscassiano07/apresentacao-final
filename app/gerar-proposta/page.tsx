import { GerarPropostaForm } from "@/components/proposta/gerar-proposta-form";

export default function GerarPropostaPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8f8f8_0%,#eceff3_100%)] px-3 py-10 sm:px-4">
      <GerarPropostaForm />
    </div>
  );
}
