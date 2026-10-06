import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] transition-colors duration-300";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-gold text-ink hover:bg-gold-light",
  outline: "border border-gold text-gold hover:bg-gold hover:text-ink",
};

export function Button({
  children,
  variant = "solid",
  href,
  external = false,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}