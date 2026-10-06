import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { PlaceholderFrame } from "@/components/ui/PlaceholderFrame";
import { getPieceBySlug, portfolioPieces } from "@/lib/data/portfolio";
import { whatsappLink } from "@/lib/whatsapp";

type PiecePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioPieces.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: PiecePageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);
  if (!piece) return { title: "Peça não encontrada — AB Arte Becauzy" };
  return { title: `${piece.title} — AB Arte Becauzy`, description: piece.description };
}

export default async function PiecePage({ params }: PiecePageProps) {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);

  if (!piece) notFound();

  const ctaMessage = `Olá, AB Arte Becauzy. Gostaria de solicitar um orçamento para a peça "${piece.title}".`;

  return (
    <main className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Link
          href="/portfolio"
          className="font-sans text-[11px] uppercase tracking-[0.3em] text-mist transition-colors hover:text-gold-light"
        >
          ← Portfólio
        </Link>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <PlaceholderFrame
              tag={piece.category}
              title={piece.title}
              className="aspect-[3/4] w-full"
            />
            <div className="grid grid-cols-2 gap-6">
              <PlaceholderFrame tag="Detalhe" title="Vista 02" className="aspect-square w-full" />
              <PlaceholderFrame tag="Detalhe" title="Vista 03" className="aspect-square w-full" />
            </div>
          </div>

          <div className="space-y-8">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
              {piece.category}
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream md:text-6xl">
              {piece.title}
            </h1>
            <GoldLine className="w-16" />
            <p className="font-sans text-sm leading-relaxed text-mist md:text-base">
              {piece.description}
            </p>
            <ul className="space-y-3">
              {piece.details.map((detail) => (
                <li key={detail} className="flex items-center gap-3 font-sans text-sm text-cream">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="space-y-3 pt-4">
              <Button href={whatsappLink(ctaMessage)} external variant="solid">
                Solicitar orçamento
              </Button>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-mist/50">
                Orçamento sem compromisso via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}