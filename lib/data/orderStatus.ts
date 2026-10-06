export const orderStatuses = [
  "NOVO",
  "ORCAMENTO",
  "APROVADO",
  "EM_PRODUCAO",
  "PROVA",
  "AJUSTES",
  "PRONTO",
  "ENTREGUE",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const orderStatusLabels: Record<OrderStatus, string> = {
  NOVO: "Novo",
  ORCAMENTO: "Orçamento",
  APROVADO: "Aprovado",
  EM_PRODUCAO: "Em produção",
  PROVA: "Prova",
  AJUSTES: "Ajustes",
  PRONTO: "Pronto",
  ENTREGUE: "Entregue",
};

export function orderWhatsAppMessage(
  customerName: string,
  piece: string,
  status: OrderStatus,
): string {
  const firstName = customerName.split(" ")[0];
  const label = orderStatusLabels[status].toLowerCase();
  return `Olá, ${firstName}. A tua encomenda "${piece}" na AB Arte Becauzy está agora: ${label}.`;
}