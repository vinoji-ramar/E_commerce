import { Transaction } from "sequelize";

import { User } from "../models/user.model";

const create = async (
  payload: { name: string; email: string; password: string; role?: "customer" | "admin" },
  transaction?: Transaction
) => {
  return User.create(payload, transaction ? { transaction } : undefined);
};

const findByEmail = async (email: string, transaction?: Transaction) => {
  return User.findOne({
    where: { email },
    ...(transaction ? { transaction } : {})
  });
};

const findById = async (userId: number, transaction?: Transaction) => {
  return User.findByPk(userId, transaction ? { transaction } : undefined);
};

export const userRepository = {
  create,
  findByEmail,
  findById
};