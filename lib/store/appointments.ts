import { promises as fs } from "fs";
import path from "path";
import type { BookingInput } from "@/lib/schemas/booking";

// PROVISÓRIO (apenas desenvolvimento): persistência local em .data/appointments.json.
// TODO(Sprint 8): substituir pela tabela `appointments` do Supabase.
// A UI e a API NÃO mudam quando fizermos a troca — só este ficheiro.

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "appointments.json");

export type StoredAppointment = BookingInput & {
  id: string;
  status: "pending";
  createdAt: string;
};

export async function saveAppointment(input: BookingInput): Promise<StoredAppointment> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let list: StoredAppointment[] = [];
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    list = JSON.parse(raw) as StoredAppointment[];
  } catch {
    // O ficheiro ainda não existe (primeira marcação) — começamos lista vazia.
  }

  const record: StoredAppointment = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  list.push(record);
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf8");
  return record;
}