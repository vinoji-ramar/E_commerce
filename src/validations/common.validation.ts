import { z } from "zod";

const paginationSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    brand: z.string().trim().min(1).optional()
  })
});

const productIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export type PaginationQuery = z.infer<typeof paginationSchema>;
export type ProductListQuery = z.infer<typeof paginationSchema>;

export { paginationSchema, productIdSchema };
