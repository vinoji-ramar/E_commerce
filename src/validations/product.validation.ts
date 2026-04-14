import { z } from "zod";

const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    brand: z.string().trim().min(2),
    price: z.coerce.number().positive(),
    stock: z.coerce.number().int().min(0)
  })
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  }),
  body: z.object({
    name: z.string().trim().min(2).optional(),
    brand: z.string().trim().min(2).optional(),
    price: z.coerce.number().positive().optional(),
    stock: z.coerce.number().int().min(0).optional()
  })
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export { createProductSchema, updateProductSchema };
