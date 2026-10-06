import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          index="05"
          label="Sobre"
          title="Mais do que costura. Uma forma de expressão."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <Reveal>
              <p className="font-display text-2xl leading-snug text-cream md:text-4xl">
                Cada peça começa com uma ideia.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-2xl leading-snug text-cream md:text-4xl">
                Cada medida conta. Cada corte importa.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display text-2xl leading-snug md:text-4xl">
                <span className="italic text-gold-light">Cada ponto constrói uma história.</span>
              </p>
            </Reveal>
          </div>

          {/* Placeholder claro: a história real será fornecida pela marca */}
          <Reveal delay={0.15}>
            <div className="border border-dashed border-mist/25 p-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-mist/60">
                História da marca — texto real a fornecer
              </p>
              <div className="mt-6 space-y-3" aria-hidden="true">
                <span className="block h-3 w-full bg-mist/10" />
                <span className="block h-3 w-5/6 bg-mist/10" />
                <span className="block h-3 w-4/6 bg-mist/10" />
                <span className="block h-3 w-5/6 bg-mist/10" />
                <span className="block h-3 w-3/6 bg-mist/10" />
              </div>
              <p className="mt-6 font-sans text-xs leading-relaxed text-mist/50">
                Este bloco será substituído pela história real da AB Arte
                Becauzy quando o conteúdo for fornecido.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}