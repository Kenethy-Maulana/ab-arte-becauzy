"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="font-sans text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-gold-light"
    >
      Sair
    </button>
  );
}