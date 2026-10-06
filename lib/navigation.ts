export type NavLink = {
  label: string;
  href: string;
};

// Navegação por âncoras nas secções da Home.
// TODO(Sprint 6+): substituir pelas rotas reais quando as páginas existirem.
export const navLinks: NavLink[] = [
  { label: "Coleções", href: "/portfolio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Ateliê", href: "#atelier" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contactos", href: "#contactos" },
];