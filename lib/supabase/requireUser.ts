import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Devolve o utilizador autenticado ou redireciona para o login.
// Usado em TODAS as páginas admin (verificação no servidor).
export async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");
  return data.user;
}