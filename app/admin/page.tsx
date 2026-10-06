import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusControl } from "@/components/admin/StatusControl";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  appointmentStatusBadge,
  appointmentStatusLabels,
  appointmentWhatsAppMessage,
  type AppointmentStatus,
} from "@/lib/data/appointmentStatus";
import { requireUser } from "@/lib/supabase/requireUser";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Painel — AB Arte Becauzy",
};

export default async function AdminPage() {
  await requireUser();

  const supabase = await createClient();
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <AdminShell>
        <p className="font-sans text-sm text-[#e08a8a]">
          Erro ao carregar marcações: {error.message}
        </p>
      </AdminShell>
    );
  }

  const list = (appointments ?? []) as {
    id: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    date: string;
    time: string;
    status: AppointmentStatus;
  }[];

  const pending = list.filter((item) => item.status === "pending").length;

  return (
    <AdminShell>
      <div className="space-y-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-mist/15 p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-mist">
              Marcações totais
            </p>
            <p className="mt-2 font-display text-4xl text-cream">{list.length}</p>
          </div>
          <div className="border border-gold/30 p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-mist">
              Pendentes
            </p>
            <p className="mt-2 font-display text-4xl text-gold-light">{pending}</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-mist/15">
          <table className="w-full text-left font-sans text-sm">
            <thead className="border-b border-mist/15 text-[11px] uppercase tracking-[0.2em] text-mist">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Quando</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-mist/60">
                    Ainda não há marcações.
                  </td>
                </tr>
              ) : (
                list.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-mist/10 last:border-0">
                    <td className="px-4 py-3 text-cream">{appointment.name}</td>
                    <td className="px-4 py-3 text-mist">
                      {appointment.phone}
                      <span className="block text-xs text-mist/60">{appointment.email}</span>
                    </td>
                    <td className="px-4 py-3 text-mist">{appointment.service}</td>
                    <td className="px-4 py-3 text-mist">
                      {appointment.date} · {appointment.time}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`border px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${
                          appointmentStatusBadge[appointment.status] ?? "border-mist/40 text-mist"
                        }`}
                      >
                        {appointmentStatusLabels[appointment.status] ?? appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <StatusControl
                          appointmentId={appointment.id}
                          currentStatus={appointment.status}
                        />
                        <a
                          href={`https://wa.me/${appointment.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            appointmentWhatsAppMessage(appointment.name, appointment.status),
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Notificar ${appointment.name} no WhatsApp`}
                          className="text-gold transition-colors hover:text-gold-light"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}