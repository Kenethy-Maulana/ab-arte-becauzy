"use client";

import { useState, type FormEvent } from "react";
import { createOrder } from "@/lib/actions/orders";
import { bookingServices } from "@/lib/data/bookingOptions";

const fieldClasses =
  "w-full border border-mist/25 bg-ink-soft px-4 py-3 font-sans text-sm text-cream placeholder:text-mist/40 transition-colors focus:border-gold focus:outline-none";

const labelClasses =
  "mb-2 block font-sans text-[11px] uppercase tracking-[0.25em] text-mist";

const measurementFields = [
  { key: "altura", label: "Altura" },
  { key: "ombro", label: "Ombro" },
  { key: "peito", label: "Peito" },
  { key: "cintura", label: "Cintura" },
  { key: "anca", label: "Anca" },
  { key: "manga", label: "Manga" },
  { key: "comprimento", label: "Comprimento" },
];

export function NewOrderForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // REGRA: capturar o elemento ANTES de qualquer await.
    const formElement = event.currentTarget;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(formElement);

    const measurements: Record<string, string> = {};
    for (const field of measurementFields) {
      const raw = String(formData.get(`med_${field.key}`) ?? "").trim();
      if (raw !== "") measurements[field.key] = raw;
    }

    const result = await createOrder({
      customerName: String(formData.get("customerName") ?? ""),
      customerPhone: String(formData.get("customerPhone") ?? ""),
      customerEmail: String(formData.get("customerEmail") ?? ""),
      piece: String(formData.get("piece") ?? ""),
      service: String(formData.get("service") ?? ""),
      price: String(formData.get("price") ?? ""),
      deliveryDate: String(formData.get("deliveryDate") ?? ""),
      measurements,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Erro ao criar encomenda.");
      return;
    }

    setSuccess(result.orderNumber ?? "Encomenda criada.");
    formElement.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 border border-mist/15 p-8">
      <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
        Nova encomenda
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="customerName" className={labelClasses}>Cliente</label>
          <input id="customerName" name="customerName" type="text" className={fieldClasses} required />
        </div>
        <div>
          <label htmlFor="customerPhone" className={labelClasses}>Telefone</label>
          <input id="customerPhone" name="customerPhone" type="tel" className={fieldClasses} required />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="customerEmail" className={labelClasses}>Email (opcional)</label>
          <input id="customerEmail" name="customerEmail" type="email" className={fieldClasses} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="piece" className={labelClasses}>Peça</label>
          <input id="piece" name="piece" type="text" placeholder="Ex.: Fato de duas peças" className={fieldClasses} required />
        </div>
        <div>
          <label htmlFor="service" className={labelClasses}>Serviço</label>
          <select id="service" name="service" defaultValue="" className={fieldClasses} required>
            <option value="" disabled>Escolhe um serviço</option>
            {bookingServices.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className={labelClasses}>Preço (opcional)</label>
            <input id="price" name="price" type="text" placeholder="0.00" className={fieldClasses} />
          </div>
          <div>
            <label htmlFor="deliveryDate" className={labelClasses}>Entrega</label>
            <input id="deliveryDate" name="deliveryDate" type="date" className={fieldClasses} />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-mist/10 pt-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-mist">
          Medidas do cliente (cm, opcionais)
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {measurementFields.map((field) => (
            <div key={field.key}>
              <label htmlFor={`med_${field.key}`} className={labelClasses}>
                {field.label}
              </label>
              <input
                id={`med_${field.key}`}
                name={`med_${field.key}`}
                type="number"
                step="0.5"
                min="0"
                placeholder="—"
                className={fieldClasses}
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p role="alert" className="font-sans text-xs text-[#e08a8a]">{error}</p>}
      {success && (
        <p role="status" className="font-sans text-xs text-gold-light">
          Encomenda criada: <strong>{success}</strong> — comunica este número ao cliente.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "A criar..." : "Criar encomenda"}
      </button>
    </form>
  );
}