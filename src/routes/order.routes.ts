import { Router } from "express";

import { orderController } from "../controllers/order.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { paginationSchema } from "../validations/common.validation";

const orderRouter = Router();

orderRouter.use(authenticate, authorize("customer"));
orderRouter.post("/", asyncHandler(orderController.placeOrder));
orderRouter.get("/", validate(paginationSchema), asyncHandler(orderController.getOrderHistory));

export { orderRouter };
