"use server";

import { revalidatePath } from "next/cache";
import {
  appointmentStatuses,
  type AppointmentStatus,
} from "@/lib/data/appointmentStatus";
import { requireUser } from "@/lib/supabase/requireUser";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { ok: boolean; error?: string };

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus,
): Promise<ActionResult> {
  // Segurança: verificação de sessão NO SERVIDOR, em cada chamada.
  await requireUser();

  if (!appointmentStatuses.includes(status)) {
    return { ok: false, error: "Estado inválido." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", appointmentId);

  if (error) {
    console.error("Erro ao atualizar marcação:", error);
    return { ok: false, error: "Não foi possível atualizar o estado." };
  }

  const { error: historyError } = await supabase
    .from("appointment_updates")
    .insert({ appointment_id: appointmentId, status });

  if (historyError) {
    // Não fatal: o estado mudou; o histórico falhou e fica registado no log.
    console.error("Erro ao registar histórico:", historyError);
  }

  revalidatePath("/admin");
  return { ok: true };
}