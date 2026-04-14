import { Router } from "express";
import { cartController } from "../controllers/cart.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { addCartItemSchema, cartItemIdSchema, updateCartItemSchema } from "../validations/cart.validation";

const cartRouter = Router();

// Protect all cart routes with authentication + customer role
cartRouter.use(authenticate, authorize("customer"));

cartRouter.get("/", asyncHandler(cartController.getCart));
cartRouter.post("/", validate(addCartItemSchema), asyncHandler(cartController.addCartItem));
cartRouter.patch("/:id", validate(updateCartItemSchema), asyncHandler(cartController.updateCartItem));
cartRouter.delete("/:id", validate(cartItemIdSchema), asyncHandler(cartController.removeCartItem));

export { cartRouter };
