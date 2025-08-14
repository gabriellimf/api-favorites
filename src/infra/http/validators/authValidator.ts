import { z } from 'zod';

export const authSchema = z.object({
  body: z.object({
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
  }),
});