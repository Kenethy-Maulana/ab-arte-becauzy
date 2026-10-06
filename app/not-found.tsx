import Link from "next/link";
import { GoldLine } from "@/components/ui/GoldLine";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.4em] text-gold">404</p>
      <h1 className="font-display text-4xl text-cream md:text-6xl">
        Esta peça não existe.
      </h1>
      <GoldLine className="w-16" />
      <p className="max-w-md font-sans text-sm leading-relaxed text-mist">
        O endereço que procurou não corresponde a nenhuma página do ateliê.
      </p>
      <Link
        href="/"
        className="font-sans text-xs uppercase tracking-[0.3em] text-gold-light underline-offset-8 hover:underline"
      >
        Voltar ao início
      </Link>
    </main>
  );
}