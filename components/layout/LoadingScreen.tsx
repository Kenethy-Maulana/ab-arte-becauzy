"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SEQUENCE_MS = 1600;

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      setUnmounted(true);
      return;
    }
    const timer = setTimeout(() => setDone(true), SEQUENCE_MS);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  if (unmounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setUnmounted(true)}>
      {!done && (
        <motion.div
          key="loading"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <svg width="160" height="24" viewBox="0 0 160 24" fill="none" className="mb-6">
            <motion.path
              d="M2 12 C 40 2, 60 22, 80 12 S 120 2, 158 12"
              stroke="#C6A15B"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-2xl tracking-[0.35em] text-cream"
          >
            AB ARTE BECAUZY
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-3 font-sans text-[10px] uppercase tracking-[0.5em] text-mist"
          >
            Corte & Costura
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}