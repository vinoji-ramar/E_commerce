import { Op, Transaction } from "sequelize";
import { RefreshToken } from "../models/refresh-token.model";

const create = async (
  payload: {
    userId: number;
    token: string;
    expiresAt: Date;
  },
  transaction?: Transaction
) => {
  try {
    return await RefreshToken.create(payload, {
      transaction   // ✅ always pass as object
    });
  } catch (error) {
    console.error("🔥 REFRESH TOKEN CREATE ERROR:", error);
    throw error;
  }
};

const findValidToken = async (token: string, transaction?: Transaction) => {
  try {
    return await RefreshToken.findOne({
      where: {
        token,
        isRevoked: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      },
      transaction   // ✅ clean pass
    });
  } catch (error) {
    console.error("🔥 FIND TOKEN ERROR:", error);
    throw error;
  }
};

const revokeToken = async (refreshToken: RefreshToken, transaction?: Transaction) => {
  try {
    await refreshToken.update(
      { isRevoked: true },
      { transaction }   // ✅ correct
    );
    return refreshToken;
  } catch (error) {
    console.error("🔥 REVOKE TOKEN ERROR:", error);
    throw error;
  }
};

export const refreshTokenRepository = {
  create,
  findValidToken,
  revokeToken
};