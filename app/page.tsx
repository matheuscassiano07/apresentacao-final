import { redirect } from "next/navigation";

export default function PropostaPage() {
  const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:5000";
  redirect(backendUrl);
}
