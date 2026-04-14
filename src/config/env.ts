import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return value;
}, z.boolean());

const envSchema = z.object({
  APP_NAME: z.string().default("E-Commerce API"),
  API_PREFIX: z.string().default("/api"),
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.string().default("development"),
  DB_NAME: z.string().default("e_commerce"),
  DB_USER: z.string().default("root"),
  DB_PASSWORD: z.string().default(""),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_LOGGING: booleanFromEnv.default(false),
  DB_SLOW_QUERY_MS: z.coerce.number().int().nonnegative().default(300),
  DB_SYNC_ALTER: booleanFromEnv.default(false),
  DB_SYNC_FORCE: booleanFromEnv.default(false),
  JWT_ACCESS_SECRET: z.string().default("change_me_access_secret"),
  JWT_REFRESH_SECRET: z.string().default("change_me_refresh_secret"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().positive().default(10),
  CLIENT_URL: z.string().default("http://localhost:3000"),
  UPLOAD_DIR: z.string().default("uploads"),
  BASE_URL: z.string().default("http://localhost:4000")
});

const env = envSchema.parse(process.env);

export { env };
