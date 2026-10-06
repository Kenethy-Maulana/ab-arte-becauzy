"use client";

import { useTransition } from "react";
import { updateAppointmentStatus } from "@/lib/actions/appointments";
import {
  appointmentStatuses,
  appointmentStatusLabels,
  type AppointmentStatus,
} from "@/lib/data/appointmentStatus";

type StatusControlProps = {
  appointmentId: string;
  currentStatus: AppointmentStatus;
};

export function StatusControl({ appointmentId, currentStatus }: StatusControlProps) {
  const [pending, startTransition] = useTransition();

  const onChange = (value: string) => {
    startTransition(async () => {
      await updateAppointmentStatus(appointmentId, value as AppointmentStatus);
    });
  };

  return (
    <select
      key={currentStatus}
      defaultValue={currentStatus}
      disabled={pending}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Estado da marcação"
      className="border border-mist/25 bg-ink-soft px-2 py-1 font-sans text-[11px] uppercase tracking-[0.15em] text-cream focus:border-gold focus:outline-none disabled:opacity-50"
    >
      {appointmentStatuses.map((status) => (
        <option key={status} value={status}>
          {appointmentStatusLabels[status]}
        </option>
      ))}
    </select>
  );
}