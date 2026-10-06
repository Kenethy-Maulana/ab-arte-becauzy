"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { navLinks } from "@/lib/navigation";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/20 bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <SmartLink href="/" className="font-display text-lg tracking-[0.25em] text-cream">
            AB <span className="text-gold">ARTE BECAUZY</span>
          </SmartLink>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <SmartLink
                  href={link.href}
                  className="font-sans text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-gold-light"
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="/agendar" variant="outline" className="px-6 py-2">
              Agendar
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="font-sans text-xs uppercase tracking-[0.3em] text-cream lg:hidden"
          >
            Menu
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}