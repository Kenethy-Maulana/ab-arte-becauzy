"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import {
  orderStatuses,
  orderStatusLabels,
  type OrderStatus,
} from "@/lib/data/orderStatus";

type OrderStatusControlProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

export function OrderStatusControl({ orderId, currentStatus }: OrderStatusControlProps) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      key={currentStatus}
      defaultValue={currentStatus}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value as OrderStatus;
        startTransition(async () => {
          await updateOrderStatus(orderId, next);
        });
      }}
      aria-label="Estado da encomenda"
      className="border border-mist/25 bg-ink-soft px-2 py-1 font-sans text-[11px] uppercase tracking-[0.15em] text-cream focus:border-gold focus:outline-none disabled:opacity-50"
    >
      {orderStatuses.map((status) => (
        <option key={status} value={status}>
          {orderStatusLabels[status]}
        </option>
      ))}
    </select>
  );
}