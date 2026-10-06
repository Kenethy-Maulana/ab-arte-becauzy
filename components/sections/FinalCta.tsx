import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappDefaultMessage, whatsappLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="py-24 md:py-36">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <GoldLine className="mx-auto w-16" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl">
            A sua próxima peça começa aqui.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-xl font-sans text-sm leading-relaxed text-mist md:text-base">
            Fale connosco e transforme a sua ideia numa peça feita para si.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="flex flex-wrap justify-center gap-4">
          <Button href="/agendar" variant="solid">
            Agendar atendimento
          </Button>
          <Button href={whatsappLink(whatsappDefaultMessage)} variant="outline">
            WhatsApp
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}