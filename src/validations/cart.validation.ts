import { z } from "zod";

const addCartItemSchema = z.object({
  body: z.object({
    productId: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().min(1)
  })
});

const updateCartItemSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  }),
  body: z.object({
    quantity: z.coerce.number().int().min(1)
  })
});

const cartItemIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;

export { addCartItemSchema, updateCartItemSchema, cartItemIdSchema };
