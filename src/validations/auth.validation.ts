import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email(),
    password: z.string().min(6)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(6)
  })
});

const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1)
  })
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema, refreshTokenSchema };
