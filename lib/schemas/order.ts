import { z } from "zod";

export const newOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Indica o nome do cliente."),
  customerPhone: z.string().trim().min(9, "Indica um telefone com pelo menos 9 dígitos."),
  customerEmail: z
    .string()
    .trim()
    .email("Email inválido.")
    .optional()
    .or(z.literal("")),
  piece: z.string().trim().min(2, "Descreve a peça."),
  service: z.string().min(1, "Escolhe um serviço."),
  price: z
    .string()
    .trim()
    .refine((value) => value === "" || !Number.isNaN(Number(value)), "Preço inválido."),
  deliveryDate: z.string().trim().optional(),
    measurements: z.record(z.string()).optional(),
});

export type NewOrderInput = z.infer<typeof newOrderSchema>;