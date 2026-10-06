import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewOrderForm } from "@/components/admin/NewOrderForm";
import { OrderStatusControl } from "@/components/admin/OrderStatusControl";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  orderStatusLabels,
  orderWhatsAppMessage,
  type OrderStatus,
} from "@/lib/data/orderStatus";
import { requireUser } from "@/lib/supabase/requireUser";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Encomendas — Painel AB Arte Becauzy",
};

type OrderRow = {
  id: string;
  order_number: string;
  piece: string;
  service: string;
  status: OrderStatus;
  delivery_date: string | null;
  measurements: Record<string, string> | null; // ← NOVO
  customers: { name: string; phone: string } | null;
};

export default async function AdminOrdersPage() {
  await requireUser();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, customers(name, phone)")
    .order("created_at", { ascending: false });

  const orders = (data ?? []) as OrderRow[];

  return (
    <AdminShell>
      <div className="space-y-10">
        <NewOrderForm />

        {error ? (
          <p className="font-sans text-sm text-[#e08a8a]">Erro ao carregar: {error.message}</p>
        ) : (
          <div className="overflow-x-auto border border-mist/15">
            <table className="w-full text-left font-sans text-sm">
              <thead className="border-b border-mist/15 text-[11px] uppercase tracking-[0.2em] text-mist">
                <tr>
                  <th className="px-4 py-3">Nº</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Peça</th>
                  <th className="px-4 py-3">Entrega</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-mist/60">
                      Ainda não há encomendas.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-mist/10 last:border-0">
                      <td className="px-4 py-3 font-sans text-xs tracking-[0.15em] text-gold-light">
                        {order.order_number}
                      </td>
                      <td className="px-4 py-3 text-cream">
                        {order.customers?.name ?? "—"}
                        <span className="block text-xs text-mist/60">
                          {order.customers?.phone ?? ""}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-mist">
                        {order.piece}
                        <span className="block text-xs text-mist/60">{order.service}</span>
                        {/* ← NOVO: mostra as medidas quando existirem */}
                        {order.measurements && Object.keys(order.measurements).length > 0 && (
                          <span className="block text-xs text-gold-light/80">
                            Medidas:{" "}
                            {Object.entries(order.measurements)
                              .map(([key, value]) => `${key} ${value}cm`)
                              .join(" · ")}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-mist">{order.delivery_date ?? "—"}</td>
                      <td className="px-4 py-3">
                        <OrderStatusControl orderId={order.id} currentStatus={order.status} />
                      </td>
                      <td className="px-4 py-3">
                        {order.customers && (
                          <a
                            href={`https://wa.me/${order.customers.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              orderWhatsAppMessage(order.customers.name, order.piece, order.status),
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Notificar ${order.customers.name} no WhatsApp`}
                            className="text-gold transition-colors hover:text-gold-light"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}