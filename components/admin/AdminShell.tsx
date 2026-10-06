import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-mist/15">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">
            AB Arte Becauzy — Painel
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-sans text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-gold-light"
            >
              Marcações
            </Link>
            <Link
              href="/admin/encomendas"
              className="font-sans text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-gold-light"
            >
              Encomendas
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}