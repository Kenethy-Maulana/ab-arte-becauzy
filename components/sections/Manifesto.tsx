import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="space-y-8">
          <Reveal>
            <p className="font-display text-3xl leading-snug text-cream md:text-5xl">
              A roupa não é apenas aquilo que vestimos.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display text-3xl leading-snug text-cream md:text-5xl">
              É aquilo que{" "}
              <span className="italic text-gold-light">escolhemos transmitir</span>.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-mist md:text-base">
              Na AB Arte Becauzy, cada peça nasce da combinação entre técnica,
              precisão e personalidade.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}