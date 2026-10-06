"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const fieldClasses =
  "w-full border border-mist/25 bg-ink-soft px-4 py-3 font-sans text-sm text-cream placeholder:text-mist/40 transition-colors focus:border-gold focus:outline-none";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciais inválidas. Verifica o email e a password.");
      setSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.25em] text-mist">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@..."
          className={fieldClasses}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.25em] text-mist">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          className={fieldClasses}
          required
        />
      </div>

      {error && (
        <p role="alert" className="font-sans text-xs text-[#e08a8a]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "A entrar..." : "Entrar"}
      </button>
    </form>
  );
}