// TODO(Supabase): encomendas virão de `orders` + `order_updates`.
// Dados de DEMONSTRAÇÃO para validar a interface de tracking.

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

export type DemoOrder = {
  number: string;
  piece: string;
  currentStatus: OrderStatus;
  history: { status: OrderStatus; date: string }[];
};

export const demoOrders: DemoOrder[] = [
  {
    number: "AB-2026-0001",
    piece: "Fato Sob Medida",
    currentStatus: "EM_PRODUCAO",
    history: [
      { status: "NOVO", date: "12/09/2026" },
      { status: "ORCAMENTO", date: "14/09/2026" },
      { status: "APROVADO", date: "18/09/2026" },
      { status: "EM_PRODUCAO", date: "25/09/2026" },
    ],
  },
  {
    number: "AB-2026-0002",
    piece: "Vestido de Cerimónia",
    currentStatus: "PRONTO",
    history: [
      { status: "NOVO", date: "05/09/2026" },
      { status: "ORCAMENTO", date: "06/09/2026" },
      { status: "APROVADO", date: "09/09/2026" },
      { status: "EM_PRODUCAO", date: "12/09/2026" },
      { status: "PROVA", date: "22/09/2026" },
      { status: "AJUSTES", date: "26/09/2026" },
      { status: "PRONTO", date: "02/10/2026" },
    ],
  },
];