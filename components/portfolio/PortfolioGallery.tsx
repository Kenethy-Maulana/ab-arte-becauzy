"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { PlaceholderFrame } from "@/components/ui/PlaceholderFrame";
import {
  portfolioCategories,
  portfolioPieces,
  type PortfolioCategory,
} from "@/lib/data/portfolio";

type Filter = "Todos" | PortfolioCategory;

const filters: Filter[] = ["Todos", ...portfolioCategories];

export function PortfolioGallery() {
  const [active, setActive] = useState<Filter>("Todos");

  const visible =
    active === "Todos"
      ? portfolioPieces
      : portfolioPieces.filter((piece) => piece.category === active);

  return (
    <div className="mt-16 space-y-12">
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar portfólio">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={`border px-5 py-2 font-sans text-[11px] uppercase tracking-[0.25em] transition-colors ${
              active === filter
                ? "border-gold bg-gold text-ink"
                : "border-mist/25 text-mist hover:border-gold/60 hover:text-gold-light"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((piece) => (
            <motion.div
              layout
              key={piece.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/portfolio/${piece.slug}`} className="group relative block">
                <PlaceholderFrame
                  tag={piece.category}
                  title={piece.title}
                  className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-ink/70 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-display text-xl text-cream">{piece.title}</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-light">
                    Ver peça →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}