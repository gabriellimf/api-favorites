import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
  }),
});

export const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres.").optional(),
    email: z.string().email("Formato de e-mail inválido.").optional(),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres.").optional(),
  }),
});