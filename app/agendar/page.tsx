import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappDefaultMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Agendar atendimento — AB Arte Becauzy",
  description: "Marque um atendimento no ateliê AB Arte Becauzy.",
};

export default function AgendarPage() {
  return (
    <main className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <SectionHeading
          index="07"
          label="Agendar"
          title="Marcar atendimento no ateliê"
          description="Escolhe o serviço, o dia e a hora. Confirmamos o teu pedido por WhatsApp."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_320px] md:gap-16">
          <BookingForm />

          <aside className="h-fit space-y-6 border border-mist/15 p-8">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
              Como funciona
            </p>
            <ol className="list-inside list-decimal space-y-3 font-sans text-sm text-mist">
              <li>Envias o pedido.</li>
              <li>Recebemos no painel do ateliê.</li>
              <li>Confirmamos contigo por WhatsApp.</li>
            </ol>
            <GoldLine className="w-12" />
            <p className="font-sans text-xs leading-relaxed text-mist/60">
              Preferes falar já?{" "}
              <a
                href={whatsappLink(whatsappDefaultMessage)}
                className="text-gold-light underline-offset-4 hover:underline"
              >
                WhatsApp direto
              </a>
              .
            </p>
          </aside>
        </div>
      </Container>
    </main>
  );
}