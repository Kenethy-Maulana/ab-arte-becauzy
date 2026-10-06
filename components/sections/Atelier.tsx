import { Container } from "@/components/ui/Container";
import { PlaceholderFrame } from "@/components/ui/PlaceholderFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// TODO(Supabase/Storage): fotografias reais do ateliê substituirão estes placeholders.
const frames = [
  { tag: "Tecidos", title: "Matéria", className: "aspect-[4/5] md:col-span-5" },
  { tag: "Máquinas", title: "Precisão", className: "aspect-[3/4] md:col-span-4 md:col-start-7 md:mt-16" },
  { tag: "Linhas & Agulhas", title: "Fio", className: "aspect-[3/4] md:col-span-4" },
  { tag: "Mãos", title: "Ofício", className: "aspect-square md:col-span-4 md:mt-12" },
  { tag: "Detalhes", title: "Acabamento", className: "aspect-[3/4] md:col-span-4" },
];

export function Atelier() {
  return (
    <section id="atelier" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          index="04"
          label="Ateliê"
          title="Onde a ideia ganha forma"
          description="Tecido, máquina, linha e tempo. O ateliê é o coração da marca."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          {frames.map((frame, index) => (
            <Reveal key={frame.title} delay={index * 0.08} className={frame.className}>
              <PlaceholderFrame tag={frame.tag} title={frame.title} className="h-full w-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}