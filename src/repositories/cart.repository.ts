import { Includeable, Transaction } from "sequelize";

import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model";

const cartItemInclude: Includeable[] = [
  {
    model: Product,
    as: "product",
    attributes: ["id", "name", "brand", "price", "stock", "imageUrl"]
  }
];

const getCartItems = async () => {
  return CartItem.findAll({
    include: cartItemInclude,
    order: [["id", "ASC"]]
  });
};

const getCartItemsByUserId = async (userId: number) => {
  return CartItem.findAll({
    where: { userId },
    include: cartItemInclude,
    order: [["id", "ASC"]]
  });
};

const getCartItemsForTransaction = async (userId: number, transaction: Transaction) => {
  return CartItem.findAll({
    where: { userId },
    include: [{ model: Product, as: "product" }],
    order: [["id", "ASC"]],
    transaction
  });
};

const findById = async (cartItemId: number, userId?: number, transaction?: Transaction) => {
  return CartItem.findOne({
    where: {
      id: cartItemId,
      ...(userId ? { userId } : {})
    },
    ...(transaction ? { transaction } : {})
  });
};

const findByProductId = async (userId: number, productId: number, transaction?: Transaction) => {
  return CartItem.findOne({
    where: { userId, productId },
    ...(transaction ? { transaction } : {})
  });
};

const create = async (
  payload: { userId: number; productId: number; quantity: number },
  transaction?: Transaction
) => {
  return CartItem.create(payload, transaction ? { transaction } : undefined);
};



const updateQuantity = async (cartItem: CartItem, quantity: number, transaction?: Transaction) => {
  await cartItem.update({ quantity }, transaction ? { transaction } : undefined);
  return cartItem;
};

const getCartItemWithProduct = async (cartItemId: number, userId?: number, transaction?: Transaction) => {
  return CartItem.findOne({
    where: {
      id: cartItemId,
      ...(userId ? { userId } : {})
    },
    include: cartItemInclude,
    ...(transaction ? { transaction } : {})
  });
};

const destroy = async (cartItem: CartItem, transaction?: Transaction) => {
  await cartItem.destroy(transaction ? { transaction } : undefined);
};

const clearCart = async (userId: number, transaction: Transaction) => {
  await CartItem.destroy({
    where: { userId },
    transaction
  });
};

export const cartRepository = {
  getCartItems,
  getCartItemsByUserId,
  getCartItemsForTransaction,
  findById,
  findByProductId,
  create,
  updateQuantity,
  getCartItemWithProduct,
  destroy,
  clearCart
};
