"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

// Rotas internas ("/...") → navegação client-side, sem reload.
// Âncoras ("#...") → scroll na Home; fora da Home, navega para "/#...".
export function SmartLink({ href, children, className, onClick, ariaLabel }: SmartLinkProps) {
  const pathname = usePathname();
  const finalHref = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  return (
    <Link href={finalHref} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}