import { site } from "@/lib/site";

export const whatsappDefaultMessage =
  "Olá, AB Arte Becauzy. Gostaria de saber mais sobre os serviços.";

export function whatsappLink(message: string): string {
  if (!site.whatsappNumber) return "#";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}