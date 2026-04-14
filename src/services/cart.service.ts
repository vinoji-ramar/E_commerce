import { Transaction } from "sequelize";

import { sequelize } from "../config/database";
import { CartItem } from "../models/cart-item.model";
import { cartRepository } from "../repositories/cart.repository";
import { productRepository } from "../repositories/product.repository";
import { AppError } from "../utils/app-error.util";
import { formatCartItems } from "../utils/cart.util";
import { AddCartItemInput, UpdateCartItemInput } from "../validations/cart.validation";

const getCart = async (userId: number) => {
  const cartItems = await cartRepository.getCartItemsByUserId(userId);

  return formatCartItems(cartItems);
};

const addCartItem = async (userId: number, payload: AddCartItemInput["body"]) => {
  return sequelize.transaction(async (transaction: Transaction) => {
    const product = await productRepository.findById(payload.productId, transaction);

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    if (product.stock < payload.quantity) {
      throw new AppError(400, "Requested quantity exceeds available stock");
    }

    const existingCartItem = await cartRepository.findByProductId(userId, payload.productId, transaction);

    if (existingCartItem) {
      const nextQuantity = existingCartItem.quantity + payload.quantity;

      if (product.stock < nextQuantity) {
        throw new AppError(400, "Requested quantity exceeds available stock");
      }

      await cartRepository.updateQuantity(existingCartItem, nextQuantity, transaction);
      const updatedCartItem = await cartRepository.getCartItemWithProduct(existingCartItem.id, userId, transaction);

      if (!updatedCartItem) {
        throw new AppError(404, "Cart item not found");
      }

      return updatedCartItem;
    }

    const cartItem = await cartRepository.create(
      {
        userId,
        productId: payload.productId,
        quantity: payload.quantity
      },
      transaction
    );

    const createdCartItem = await cartRepository.getCartItemWithProduct(cartItem.id, userId, transaction);

    if (!createdCartItem) {
      throw new AppError(404, "Cart item not found");
    }

    return createdCartItem;
  });
};

const updateCartItem = async (userId: number, cartItemId: number, payload: UpdateCartItemInput["body"]) => {
  return sequelize.transaction(async (transaction: Transaction) => {
    const cartItem = await cartRepository.findById(cartItemId, userId, transaction);

    if (!cartItem) {
      throw new AppError(404, "Cart item not found");
    }

    const product = await productRepository.findById(cartItem.productId, transaction);

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    if (product.stock < payload.quantity) {
      throw new AppError(400, "Requested quantity exceeds available stock");
    }

    await cartRepository.updateQuantity(cartItem, payload.quantity, transaction);
    const updatedCartItem = await cartRepository.getCartItemWithProduct(cartItem.id, userId, transaction);

    if (!updatedCartItem) {
      throw new AppError(404, "Cart item not found");
    }

    return updatedCartItem;
  });
};

const removeCartItem = async (userId: number, cartItemId: number): Promise<void> => {
  await sequelize.transaction(async (transaction: Transaction) => {
    const cartItem = await cartRepository.findById(cartItemId, userId, transaction);

    if (!cartItem) {
      throw new AppError(404, "Cart item not found");
    }

    await cartRepository.destroy(cartItem, transaction);
  });
};

export const cartService = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem
};
