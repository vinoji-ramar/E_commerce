import { Request, Response } from "express";

import { MESSAGES } from "../constants/messages";
import { cartService } from "../services/cart.service";
import { sendSuccess } from "../utils/response.util";

const getCart = async (req: Request, res: Response): Promise<void> => {
  const cart = await cartService.getCart(req.user!.userId);
  sendSuccess(res, 200, MESSAGES.CART_FETCHED, cart);
};

const addCartItem = async (req: Request, res: Response) => {
  console.log("req.user:", req.user);

  const cartItem = await cartService.addCartItem(req.user!.userId, req.body);
  sendSuccess(res, 201, MESSAGES.CART_ITEM_ADDED, cartItem);
};

const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  const cartItemId = Number(req.params.id);
  const cartItem = await cartService.updateCartItem(req.user!.userId, cartItemId, req.body);
  sendSuccess(res, 200, MESSAGES.CART_ITEM_UPDATED, cartItem);
};

const removeCartItem = async (req: Request, res: Response): Promise<void> => {
  const cartItemId = Number(req.params.id);
  await cartService.removeCartItem(req.user!.userId, cartItemId);
  sendSuccess(res, 200, MESSAGES.CART_ITEM_REMOVED, null);
};

export const cartController = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem
};
