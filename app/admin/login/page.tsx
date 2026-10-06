import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { GoldLine } from "@/components/ui/GoldLine";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Entrar — Painel AB Arte Becauzy",
};

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm space-y-8 border border-mist/15 p-10">
        <div className="space-y-3 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
            Painel do ateliê
          </p>
          <h1 className="font-display text-3xl text-cream">Entrar</h1>
          <GoldLine className="mx-auto w-12" />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}