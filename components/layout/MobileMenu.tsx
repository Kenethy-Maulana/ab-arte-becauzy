"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { navLinks } from "@/lib/navigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-6 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg tracking-[0.25em] text-cream">
              AB <span className="text-gold">ARTE BECAUZY</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="font-sans text-xs uppercase tracking-[0.3em] text-mist"
            >
              Fechar
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
              >
                <SmartLink
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-3xl text-cream transition-colors hover:text-gold-light"
                >
                  {link.label}
                </SmartLink>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto">
            <Button href="/agendar"variant="solid" className="w-full">
              Agendar atendimento
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}