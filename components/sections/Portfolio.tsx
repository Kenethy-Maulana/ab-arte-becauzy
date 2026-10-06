import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlaceholderFrame } from "@/components/ui/PlaceholderFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Espelha as primeiras peças de lib/data/portfolio.ts.
const pieces = [
  { slug: "fato-sob-medida", tag: "Alfaiataria", title: "Fato Sob Medida", className: "aspect-[3/4] md:col-span-3" },
  { slug: "vestido-de-cerimonia", tag: "Vestidos", title: "Vestido de Cerimónia", className: "aspect-[4/5] md:col-span-3 md:mt-16" },
  { slug: "camisa-artesanal", tag: "Masculino", title: "Camisa Artesanal", className: "aspect-square md:col-span-2" },
  { slug: "saia-de-alfaiataria", tag: "Feminino", title: "Saia de Alfaiataria", className: "aspect-[3/4] md:col-span-2" },
  { slug: "detalhe-de-acabamento", tag: "Detalhes", title: "Detalhe de Acabamento", className: "aspect-[4/3] md:col-span-2" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          index="02"
          label="Portfólio"
          title="Peças que falam por si"
          description="Cada peça conta uma história de medida, tecido e tempo."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-6">
          {pieces.map((piece, index) => (
            <Reveal key={piece.slug} delay={index * 0.1} className={piece.className}>
              <Link href={`/portfolio/${piece.slug}`} className="group relative block h-full w-full">
                <PlaceholderFrame tag={piece.tag} title={piece.title} className="h-full w-full" />
                <span className="absolute inset-0 flex items-end justify-between bg-ink/70 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="font-display text-xl text-cream">{piece.title}</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-light">
                    Ver peça →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/portfolio"
            className="font-sans text-xs uppercase tracking-[0.3em] text-gold-light underline-offset-8 hover:underline"
          >
            Ver todas as peças →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}