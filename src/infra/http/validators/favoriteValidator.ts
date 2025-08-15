import { z } from 'zod';

export const addFavoriteSchema = z.object({
  body: z.object({
    productId: z.number().int("O ID do produto deve ser um número inteiro."),
  }),
});

export const removeFavoriteSchema = z.object({
  params: z.object({
    productId: z.string().refine(value => !isNaN(Number(value)), {
      message: "O ID do produto deve ser um número.",
    }),
  }),
});