import bcrypt from "bcryptjs";

import { env } from "../config/env";

const hashPassword = async (value: string): Promise<string> => {
  return bcrypt.hash(value, env.BCRYPT_SALT_ROUNDS);
};

const comparePassword = async (plainText: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hashed);
};

export const passwordUtil = {
  hashPassword,
  comparePassword
};
