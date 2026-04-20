import { Includeable, Transaction } from "sequelize";

import { OrderItem } from "../models/order-item.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";

const orderItemsInclude: Includeable[] = [
  {
    model: OrderItem,
    as: "items",
    include: [{ model: Product, as: "product", attributes: ["id", "name", "brand", "price", "imageUrl"] }]
  }
];

const createOrder = async (
  payload: { userId: number; totalAmount: number; itemCount: number },
  transaction: Transaction
) => {
  return Order.create(payload, { transaction });
};

const createOrderItem = async (
  payload: { orderId: number; productId: number; quantity: number; unitPrice: number },
  transaction: Transaction
) => {
  return OrderItem.create(payload, { transaction });
};

const findByIdWithItems = async (orderId: number) => {
  return Order.findByPk(orderId, {
    include: orderItemsInclude
  });
};

const getOrders = async (userId: number, limit: number, offset: number) => {
  return Order.findAndCountAll({
    where: { userId },
    include: orderItemsInclude,
    order: [["createdAt", "DESC"]],
    limit,
    offset
  });
};

export const orderRepository = {
  createOrder,
  createOrderItem,
  findByIdWithItems,
  getOrders
};