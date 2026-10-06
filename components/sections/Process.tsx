"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "Conversa", description: "Conhecemos o cliente e entendemos o que procura." },
  { number: "02", title: "Medidas", description: "Recolhemos as medidas necessárias com precisão." },
  { number: "03", title: "Escolha", description: "Definimos tecido, corte, detalhes e acabamento." },
  { number: "04", title: "Corte", description: "A peça começa a ganhar forma." },
  { number: "05", title: "Costura", description: "Confeção e acabamento, ponto a ponto." },
  { number: "06", title: "Prova", description: "Ajustes finais para o caimento perfeito." },
  { number: "07", title: "Entrega", description: "A peça pronta, sua." },
];

export function Process() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="processo" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          index="03"
          label="Processo"
          title="Do primeiro traço à peça final"
        />

        <div ref={rootRef} className="relative mt-16 pl-10 md:pl-16">
          {/* Linha base (apagada) */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[3px] top-0 w-px bg-mist/15 md:left-[7px]"
          />
          {/* Linha dourada animada pelo scroll */}
          <div
            aria-hidden="true"
            ref={lineRef}
            className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-gold md:left-[7px]"
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.05}>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-10 top-2 h-[7px] w-[7px] rounded-full bg-gold md:-left-[60px]"
                  />
                  <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
                    {step.number}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-cream md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-mist">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}