import { Transaction } from "sequelize";

import { sequelize } from "../config/database";
import { cartRepository } from "../repositories/cart.repository";
import { orderRepository } from "../repositories/order.repository";
import { productRepository } from "../repositories/product.repository";
import { AppError } from "../utils/app-error.util";
import { buildPagination } from "../utils/pagination.util";
import { PaginationQuery } from "../validations/common.validation";

const placeOrder = async (userId: number) => {
  return sequelize.transaction(async (transaction: Transaction) => {
    const cartItems = await cartRepository.getCartItemsForTransaction(userId, transaction);

    if (cartItems.length === 0) {
      throw new AppError(400, "Cart is empty");
    }

    let totalAmount = 0;
    let itemCount = 0;

    for (const cartItem of cartItems) {
      const product = await productRepository.findById(cartItem.productId, transaction);

      if (!product) {
        throw new AppError(404, `Product with id ${cartItem.productId} not found`);
      }

      if (product.stock < cartItem.quantity) {
        throw new AppError(400, `Insufficient stock for product ${product.name}`);
      }

      totalAmount += product.price * cartItem.quantity;
      itemCount += cartItem.quantity;
    }

    const order = await orderRepository.createOrder(
      {
        userId,
        totalAmount,
        itemCount
      },
      transaction
    );

    for (const cartItem of cartItems) {
      const product = await productRepository.findById(cartItem.productId, transaction);

      if (!product) {
        throw new AppError(404, `Product with id ${cartItem.productId} not found`);
      }

      await orderRepository.createOrderItem(
        {
          orderId: order.id,
          productId: product.id,
          quantity: cartItem.quantity,
          unitPrice: product.price
        },
        transaction
      );

      await productRepository.updateStock(product, product.stock - cartItem.quantity, transaction);
    }

    await cartRepository.clearCart(userId, transaction);

    return orderRepository.findByIdWithItems(order.id, transaction);
  });
};

const getOrderHistory = async (userId: number, query: PaginationQuery["query"]) => {
  const limit = Number(query.limit ?? 10);
  const offset = Number(query.offset ?? 0);

  const { rows, count } = await orderRepository.getOrders(userId, limit, offset);

  return {
    items: rows,
    pagination: buildPagination(limit, offset, count)
  };
};

export const orderService = {
  placeOrder,
  getOrderHistory
};
