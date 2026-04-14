import { Transaction } from "sequelize";

import { sequelize } from "../config/database";
import { refreshTokenRepository } from "../repositories/refresh-token.repository";
import { userRepository } from "../repositories/user.repository";
import { AppError } from "../utils/app-error.util";
import { jwtUtil } from "../utils/jwt.util";
import { passwordUtil } from "../utils/password.util";
import { LoginInput, RegisterInput } from "../validations/auth.validation";

const buildAuthResponse = async (
  user: { id: number; email: string; role: "customer" | "admin"; name: string },
  transaction?: Transaction
) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = jwtUtil.signAccessToken(payload);
  const refreshToken = jwtUtil.signRefreshToken(payload);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await refreshTokenRepository.create(
    {
      userId: user.id,
      token: refreshToken,
      expiresAt
    },
    transaction
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    tokens: {
      accessToken,
      refreshToken
    }
  };
};

const register = async (payload: RegisterInput["body"]) => {
  return sequelize.transaction(async (transaction: Transaction) => {
    const existingUser = await userRepository.findByEmail(payload.email, transaction);

    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    const user = await userRepository.create(
      {
        name: payload.name,
        email: payload.email,
        password: await passwordUtil.hashPassword(payload.password),
        role: "customer"
      },
      transaction
    );

    return buildAuthResponse(user, transaction);
  });
};

const login = async (payload: LoginInput["body"]) => {
  return sequelize.transaction(async (transaction: Transaction) => {
    const user = await userRepository.findByEmail(payload.email, transaction);

    if (!user || !(await passwordUtil.comparePassword(payload.password, user.password))) {
      throw new AppError(401, "Invalid email or password");
    }

    return buildAuthResponse(user, transaction);
  });
};

const refreshToken = async (token: string) => {
  return sequelize.transaction(async (transaction: Transaction) => {
    const storedToken = await refreshTokenRepository.findValidToken(token, transaction);

    if (!storedToken) {
      throw new AppError(401, "Invalid or expired refresh token");
    }

    const payload = jwtUtil.verifyRefreshToken(token);
    await refreshTokenRepository.revokeToken(storedToken, transaction);
    const user = await userRepository.findById(payload.userId, transaction);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return buildAuthResponse(user, transaction);
  });
};

export const authService = {
  register,
  login,
  refreshToken
};
