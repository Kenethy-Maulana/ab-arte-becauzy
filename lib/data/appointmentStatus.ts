export const appointmentStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  completed: "Concluída",
  cancelled: "Cancelada",
};

export const appointmentStatusBadge: Record<AppointmentStatus, string> = {
  pending: "border-gold/40 text-gold-light",
  confirmed: "border-emerald-400/40 text-emerald-300",
  completed: "border-mist/40 text-mist",
  cancelled: "border-[#e08a8a]/40 text-[#e08a8a]",
};

export function appointmentWhatsAppMessage(
  name: string,
  status: AppointmentStatus,
): string {
  const firstName = name.split(" ")[0];
  switch (status) {
    case "pending":
      return `Olá, ${firstName}. Recebemos o teu pedido de marcação na AB Arte Becauzy. Vamos confirmar em breve.`;
    case "confirmed":
      return `Olá, ${firstName}. A tua marcação na AB Arte Becauzy está confirmada. Até já!`;
    case "completed":
      return `Olá, ${firstName}. O teu atendimento na AB Arte Becauzy está concluído. Obrigado pela confiança!`;
    case "cancelled":
      return `Olá, ${firstName}. A tua marcação na AB Arte Becauzy foi cancelada. Fala connosco para reagendar.`;
  }
}