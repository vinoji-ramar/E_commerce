import { Op, Transaction } from "sequelize";

import { RefreshToken } from "../models/refresh-token.model";

const create = async (payload: { userId: number; token: string; expiresAt: Date }, transaction?: Transaction) => {
  return RefreshToken.create(payload, transaction ? { transaction } : undefined);
};

const findValidToken = async (token: string, transaction?: Transaction) => {
  return RefreshToken.findOne({
    where: {
      token,
      isRevoked: false,
      expiresAt: {
        [Op.gt]: new Date()
      }
    },
    ...(transaction ? { transaction } : {})
  });
};

const revokeToken = async (refreshToken: RefreshToken, transaction?: Transaction) => {
  await refreshToken.update({ isRevoked: true }, transaction ? { transaction } : undefined);
  return refreshToken;
};

export const refreshTokenRepository = {
  create,
  findValidToken,
  revokeToken
};
