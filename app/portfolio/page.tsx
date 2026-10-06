import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Portfólio — AB Arte Becauzy",
  description:
    "Peças de alfaiataria, vestidos e personalizações do ateliê AB Arte Becauzy.",
};

export default function PortfolioPage() {
  return (
    <main className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <SectionHeading
          index="02"
          label="Portfólio"
          title="Peças que falam por si"
          description="Cada peça conta uma história de medida, tecido e tempo."
        />
        <PortfolioGallery />
      </Container>
    </main>
  );
}