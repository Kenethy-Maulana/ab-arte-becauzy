"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  orderStatuses,
  orderStatusLabels,
  type OrderStatus,
} from "@/lib/data/orderStatus";

type HistoryEntry = { status: string; date: string };

type TrackingResult = {
  order_number: string;
  piece: string;
  status: string;
  history: HistoryEntry[];
};

type SearchState = "idle" | "loading" | "not-found";

export function TrackOrder() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [state, setState] = useState<SearchState>("idle");

  const search = async (event: FormEvent) => {
    event.preventDefault();
    setState("loading");
    setResult(null);

    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_order_tracking", {
      p_number: value.trim().toUpperCase(),
    });

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      setState("not-found");
      return;
    }

    const row = (Array.isArray(data) ? data[0] : data) as TrackingResult;
    setResult(row);
    setState("idle");
  };

  const currentIndex = result
    ? orderStatuses.indexOf(result.status as OrderStatus)
    : -1;

  return (
    <div className="space-y-12">
      <form onSubmit={search} className="flex flex-col gap-4 sm:flex-row">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="AB-2026-0001"
          aria-label="Número do pedido"
          className="w-full border border-mist/25 bg-ink-soft px-4 py-3 font-sans text-sm uppercase tracking-[0.15em] text-cream placeholder:text-mist/40 transition-colors focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {state === "loading" ? "A procurar..." : "Acompanhar"}
        </button>
      </form>

      {state === "not-found" && (
        <p role="status" className="font-sans text-sm text-mist">
          Não encontrámos esse número. Verifica o formato (ex.: AB-2026-0001) ou
          fala connosco por WhatsApp.
        </p>
      )}

      {result && (
        <div className="space-y-8">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
              {result.order_number}
            </p>
            <p className="mt-2 font-display text-2xl text-cream md:text-3xl">
              {result.piece}
            </p>
          </div>

          <ol className="space-y-6 border-l border-mist/15 pl-8">
            {orderStatuses.map((status, index) => {
              const done = index <= currentIndex;
              const entry = result.history.find((item) => item.status === status);
              return (
                <li key={status} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[37px] top-1 h-[7px] w-[7px] rounded-full ${
                      done ? "bg-gold" : "bg-mist/25"
                    }`}
                  />
                  <p className={`font-sans text-sm ${done ? "text-cream" : "text-mist/40"}`}>
                    {orderStatusLabels[status]}
                  </p>
                  {entry && (
                    <p className="font-sans text-[11px] text-mist/50">{entry.date}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}