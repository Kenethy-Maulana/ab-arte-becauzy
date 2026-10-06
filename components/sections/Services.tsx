import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// TODO(Supabase): os serviços virão da tabela `services`.
const services = [
  {
    number: "01",
    title: "Alfaiataria",
    description:
      "Peças pensadas e confecionadas de acordo com as suas medidas, o seu corpo e o seu estilo.",
  },
  {
    number: "02",
    title: "Corte & Costura",
    description:
      "Do conceito ao acabamento: criação e confeção de peças personalizadas.",
  },
  {
    number: "03",
    title: "Personalização",
    description:
      "Cada detalhe — tecido, corte, acabamento — adaptado à ocasião e à sua identidade.",
  },
  {
    number: "04",
    title: "Ajustes",
    description:
      "Transformações e ajustes para conseguir o caimento exato que a peça pede.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          index="01"
          label="Serviços"
          title="O nosso trabalho"
          description="Quatro disciplinas, um mesmo padrão de exigência."
        />

        <div className="mt-16">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 0.08}>
              <a
                href="#"
                className="group grid gap-4 border-t border-mist/10 py-8 transition-colors hover:border-gold/40 md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="font-display text-lg text-gold">{service.number}</span>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-cream transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="max-w-xl font-sans text-sm leading-relaxed text-mist">
                    {service.description}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden font-sans text-xl text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:block"
                >
                  →
                </span>
              </a>
            </Reveal>
          ))}
          <div className="border-t border-mist/10" />
        </div>
      </Container>
    </section>
  );
}