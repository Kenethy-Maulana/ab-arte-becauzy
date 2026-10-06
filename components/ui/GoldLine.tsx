type GoldLineProps = {
  className?: string;
};

export function GoldLine({ className = "" }: GoldLineProps) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className="h-1 w-1 rounded-full bg-gold" />
      <span className="h-px flex-1 bg-gold/60" />
      <span className="h-1 w-1 rounded-full bg-gold" />
    </span>
  );
}