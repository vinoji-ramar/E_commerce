import { Request, Response } from "express";

import { MESSAGES } from "../constants/messages";
import { orderService } from "../services/order.service";
import { sendSuccess } from "../utils/response.util";

const placeOrder = async (request: Request, response: Response): Promise<void> => {
  const order = await orderService.placeOrder(request.user!.userId);

  sendSuccess(response, 201, MESSAGES.ORDER_PLACED, order);
};

const getOrderHistory = async (request: Request, response: Response): Promise<void> => {
  const orders = await orderService.getOrderHistory(request.user!.userId, request.query);

  sendSuccess(response, 200, MESSAGES.ORDERS_FETCHED, orders);
};

export const orderController = {
  placeOrder,
  getOrderHistory
};
