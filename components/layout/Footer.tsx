import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/lib/navigation";
import { site } from "@/lib/site";
import { whatsappDefaultMessage, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
   <footer id="contactos" className="scroll-mt-24 border-t border-gold/15 bg-ink-soft/40 py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Logotipo AB Arte Becauzy"
              width={512}
              height={512}
              className="h-auto w-20"
            />
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-mist">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Rodapé" className="space-y-3">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
              Navegação
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-mist transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
              Contacto
            </p>
            <ul className="space-y-2 font-sans text-sm text-mist">
              <li>
                <a
                  href={whatsappLink(whatsappDefaultMessage)}
                  className="transition-colors hover:text-gold-light"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={site.instagram} className="transition-colors hover:text-gold-light">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.facebook} className="transition-colors hover:text-gold-light">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-mist/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs text-mist/60">
            © 2026 AB Arte Becauzy. Todos os direitos reservados.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-mist/40">
            Corte & Costura
          </p>
        </div>
      </Container>
    </footer>
  );
}