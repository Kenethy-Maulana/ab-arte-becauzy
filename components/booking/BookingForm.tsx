"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { bookingServices, bookingTimeSlots } from "@/lib/data/bookingOptions";
import { bookingSchema, type BookingInput } from "@/lib/schemas/booking";

type FormStatus = "idle" | "success" | "error";

const fieldClasses =
  "w-full border border-mist/25 bg-ink-soft px-4 py-3 font-sans text-sm text-cream placeholder:text-mist/40 transition-colors focus:border-gold focus:outline-none";

const labelClasses =
  "mb-2 block font-sans text-[11px] uppercase tracking-[0.25em] text-mist";

const errorClasses = "mt-2 font-sans text-xs text-[#e08a8a]";

export function BookingForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="space-y-6 border border-gold/30 p-10 text-center">
        <p className="font-display text-3xl text-cream">Pedido recebido.</p>
        <p className="font-sans text-sm leading-relaxed text-mist">
          A tua marcação foi registada. Vamos confirmar contigo por WhatsApp ou
          telefone.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-sans text-xs uppercase tracking-[0.3em] text-gold-light underline-offset-8 hover:underline"
        >
          Fazer nova marcação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Nome</label>
          <input id="name" type="text" placeholder="O teu nome" className={fieldClasses} {...register("name")} />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>Telefone</label>
          <input id="phone" type="tel" placeholder="+258 ..." className={fieldClasses} {...register("phone")} />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input id="email" type="email" placeholder="nome@email.com" className={fieldClasses} {...register("email")} />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="service" className={labelClasses}>Serviço</label>
          <select id="service" defaultValue="" className={fieldClasses} {...register("service")}>
            <option value="" disabled>Escolhe um serviço</option>
            {bookingServices.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && <p className={errorClasses}>{errors.service.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className={labelClasses}>Data</label>
            <input
              id="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className={fieldClasses}
              {...register("date")}
            />
            {errors.date && <p className={errorClasses}>{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="time" className={labelClasses}>Hora</label>
            <select id="time" defaultValue="" className={fieldClasses} {...register("time")}>
              <option value="" disabled>HH:MM</option>
              {bookingTimeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && <p className={errorClasses}>{errors.time.message}</p>}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className={labelClasses}>Mensagem (opcional)</label>
          <textarea id="message" rows={4} placeholder="Conta-nos o que procuras..." className={fieldClasses} {...register("message")} />
          {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="font-sans text-sm text-[#e08a8a]">
          Não foi possível enviar o pedido. Verifica a ligação e tenta novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "A enviar..." : "Confirmar pedido"}
      </button>
    </form>
  );
}