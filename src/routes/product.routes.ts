import { Router } from "express";

import { productController } from "../controllers/product.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { singleProductImageUpload } from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validate.middleware";
import { paginationSchema, productIdSchema } from "../validations/common.validation";
import { createProductSchema, updateProductSchema } from "../validations/product.validation";

const productRouter = Router();

productRouter.get("/", validate(paginationSchema), asyncHandler(productController.getProducts));
productRouter.get("/:id", validate(productIdSchema), asyncHandler(productController.getProductById));
productRouter.post("/", authenticate, authorize("admin"), validate(createProductSchema), asyncHandler(productController.createProduct));
productRouter.patch("/:id", authenticate, authorize("admin"), validate(updateProductSchema), asyncHandler(productController.updateProduct));
productRouter.delete("/:id", authenticate, authorize("admin"), validate(productIdSchema), asyncHandler(productController.deleteProduct));
productRouter.post("/:id/image", authenticate, authorize("admin"), validate(productIdSchema), singleProductImageUpload, asyncHandler(productController.uploadProductImage));

export { productRouter };
