"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GoldLine } from "@/components/ui/GoldLine";

const headline = ["A", "arte", "de", "vestir", "a", "sua", "identidade."];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Luz dourada subtil de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold"
        >
          Ateliê de Alfaiataria
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <Image
            src="/images/logo.png"
            alt="Logotipo AB Arte Becauzy — Corte & Costura"
            width={512}
            height={512}
            priority
            className="h-auto w-32 md:w-40"
          />
        </motion.div>

       <h1 className="font-display text-5xl leading-tight text-cream md:text-7xl">
  {headline.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="mr-[0.25em] inline-block overflow-hidden align-bottom last:mr-0"
    >
      <motion.span
        className="inline-block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          delay: 0.9 + index * 0.07,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {word}
      </motion.span>
    </span>
  ))}
</h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-24 md:w-32"
        >
          <GoldLine />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="max-w-xl font-sans text-sm leading-relaxed text-mist md:text-base"
        >
          Corte, costura e personalização feitos para transformar uma ideia
          numa peça que é verdadeiramente sua.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/agendar" variant="solid">
            Agendar atendimento
          </Button>
          <Button href="#portfolio" variant="outline">
  Explorar o trabalho
</Button>
        </motion.div>
      </div>

      {/* Fio de scroll */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 h-16 w-px origin-top bg-gold/60"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ delay: 2.4, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}