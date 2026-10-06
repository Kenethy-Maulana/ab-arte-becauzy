import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas/booking";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido." },
      { status: 400 },
    );
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.from("appointments").insert({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    service: parsed.data.service,
    date: parsed.data.date,
    time: parsed.data.time,
    message: parsed.data.message ?? null,
    status: "pending",
  });

  if (error) {
    console.error("Erro Supabase:", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível registar a marcação." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}