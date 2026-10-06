import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// TODO(Supabase): depoimentos virão da tabela `testimonials`,
// publicados apenas com autorização real dos clientes.
// Os itens abaixo são EXEMPLOS ESTRUTURAIS de layout, não depoimentos reais.
const examples = [
  {
    quote: "A peça ficou exatamente como eu imaginava.",
    author: "Cliente AB",
  },
  {
    quote: "O caimento é perfeito. Sente-se que foi feito para mim.",
    author: "Cliente AB",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          index="06"
          label="Depoimentos"
          title="Palavras de quem veste"
        />

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          {examples.map((item, index) => (
            <Reveal key={item.quote} delay={index * 0.1}>
              <figure className="space-y-6 border-l border-gold/30 pl-8">
                <blockquote className="font-display text-2xl italic leading-snug text-cream md:text-3xl">
                  “{item.quote}”
                </blockquote>
                <figcaption className="space-y-1">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">
                    — {item.author}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-mist/40">
                    Exemplo estrutural — substituir por depoimento real
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}