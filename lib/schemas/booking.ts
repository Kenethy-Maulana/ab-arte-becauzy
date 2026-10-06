import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Indica o teu nome."),
  phone: z.string().trim().min(9, "Indica um contacto com pelo menos 9 dígitos."),
  email: z.string().trim().email("Indica um email válido."),
  service: z.string().min(1, "Escolhe um serviço."),
  date: z.string().min(1, "Escolhe uma data."),
  time: z.string().min(1, "Escolhe uma hora."),
  message: z.string().trim().max(600, "Máximo de 600 caracteres.").optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;