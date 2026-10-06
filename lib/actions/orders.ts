"use server";

import { revalidatePath } from "next/cache";
import {
  orderStatuses,
  type OrderStatus,
} from "@/lib/data/orderStatus";
import { newOrderSchema, type NewOrderInput } from "@/lib/schemas/order";
import { requireUser } from "@/lib/supabase/requireUser";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { ok: boolean; error?: string; orderNumber?: string };

export async function createOrder(input: NewOrderInput): Promise<ActionResult> {
  await requireUser();

  const parsed = newOrderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const data = parsed.data;
  const supabase = await createClient();

  // Cliente: reutiliza pelo telefone ou cria novo.
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", data.customerPhone)
    .maybeSingle();

  let customerId = existing?.id as string | undefined;

  if (!customerId) {
    const { data: created, error: customerError } = await supabase
      .from("customers")
      .insert({
        name: data.customerName,
        phone: data.customerPhone,
        email: data.customerEmail || null,
      })
      .select("id")
      .single();

    if (customerError || !created) {
      console.error("Erro ao criar cliente:", customerError);
      return { ok: false, error: "Não foi possível registar o cliente." };
    }
    customerId = created.id;
  }

  // Número de encomenda: AB-AAAA-0001 (TODO: sequência robusta em produção).
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true });

  const orderNumber = `AB-${year}-${String((count ?? 0) + 1).padStart(4, "0")}`;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_id: customerId,
      piece: data.piece,
      service: data.service,
      status: "NOVO",
      price: data.price ? Number(data.price) : null,
      delivery_date: data.deliveryDate || null,
      // ← NOVO: guarda as medidas (ou null se nenhuma for preenchida)
      measurements:
        data.measurements && Object.keys(data.measurements).length > 0
          ? data.measurements
          : null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Erro ao criar encomenda:", orderError);
    return { ok: false, error: "Não foi possível criar a encomenda." };
  }

  await supabase.from("order_updates").insert({
    order_id: order.id,
    status: "NOVO",
  });

  revalidatePath("/admin/encomendas");
  return { ok: true, orderNumber };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<ActionResult> {
  await requireUser();

  if (!orderStatuses.includes(status)) {
    return { ok: false, error: "Estado inválido." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) {
    console.error("Erro ao atualizar encomenda:", error);
    return { ok: false, error: "Não foi possível atualizar o estado." };
  }

  await supabase.from("order_updates").insert({ order_id: orderId, status });

  revalidatePath("/admin/encomendas");
  return { ok: true };
}