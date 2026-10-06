type PlaceholderFrameProps = {
  tag: string;
  title: string;
  className?: string;
};

export function PlaceholderFrame({ tag, title, className = "" }: PlaceholderFrameProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-gold/15 bg-ink-soft ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(198,161,91,0.05) 0px, rgba(198,161,91,0.05) 1px, transparent 1px, transparent 9px)",
      }}
    >
      <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-mist/70">
        {tag}
      </span>
      <span className="font-display text-2xl text-gold/80">{title}</span>
      <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-mist/40">
        Fotografia real em breve
      </span>
    </div>
  );
}