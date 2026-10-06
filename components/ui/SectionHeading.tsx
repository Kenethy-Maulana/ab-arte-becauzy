import { GoldLine } from "./GoldLine";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="space-y-6">
      <p className="font-sans text-xs uppercase tracking-[0.35em] text-mist">
        <span className="text-gold">{index}</span> — {label}
      </p>
      <h2 className="max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl font-sans text-sm leading-relaxed text-mist md:text-base">
          {description}
        </p>
      ) : null}
      <GoldLine className="w-16" />
    </Reveal>
  );
}