import { CadastroContratoForm } from "@/components/contrato/cadastro-form";

export const metadata = {
  title: "Cadastro Minuta | Bevilacqua",
};

export default function CadastroMinutaPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8f8f8_0%,#eceff3_100%)] px-3 py-8 sm:px-4">
      <CadastroContratoForm />
    </div>
  );
}
