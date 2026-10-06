import Image from "next/image";

const swatches = [
  { name: "Ink", hex: "#050505", className: "bg-ink border border-mist/20" },
  { name: "Ink Soft", hex: "#101010", className: "bg-ink-soft border border-mist/20" },
  { name: "Gold", hex: "#C6A15B", className: "bg-gold" },
  { name: "Gold Light", hex: "#E5C77A", className: "bg-gold-light" },
  { name: "Cream", hex: "#F4F0E8", className: "bg-cream" },
  { name: "Mist", hex: "#9B9B9B", className: "bg-mist" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <div className="mx-auto max-w-4xl space-y-20 px-6 py-20">
        {/* Logo */}
        <section className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/images/logo.png"
            alt="Logotipo AB Arte Becauzy — Corte & Costura"
            width={640}
            height={640}
            priority
            className="h-auto w-56 md:w-72"
          />
          <p className="font-script text-3xl text-gold-light">Arte</p>
        </section>

        {/* Tipografia */}
        <section className="space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-mist">
            01 — Tipografia
          </p>
          <h1 className="font-display text-5xl leading-tight md:text-7xl">
            A arte de vestir a sua identidade.
          </h1>
          <p className="max-w-prose font-sans text-base leading-relaxed text-mist">
            Interface limpa e técnica para menus, botões e informações. O
            contraste entre a serif editorial e a sans moderna é a voz digital
            da marca.
          </p>
        </section>

        {/* Linha dourada com remate em ponto (como no logo) */}
        <section className="space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-mist">
            02 — Linha dourada
          </p>
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="h-px flex-1 bg-gold/60" />
            <span className="h-1 w-1 rounded-full bg-gold" />
          </div>
        </section>

        {/* Paleta */}
        <section className="space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-mist">
            03 — Paleta
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {swatches.map((swatch) => (
              <div key={swatch.name} className="space-y-2">
                <div className={`h-20 w-full ${swatch.className}`} />
                <p className="font-sans text-xs text-mist">{swatch.name}</p>
                <p className="font-sans text-[10px] uppercase text-mist/60">
                  {swatch.hex}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Botões */}
        <section className="space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-mist">
            04 — Botões
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="border border-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink">
              Agendar atendimento
            </button>
            <button className="bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-light">
              Falar no WhatsApp
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}