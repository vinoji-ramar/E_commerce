import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, refreshTokenSchema, registerSchema } from "../validations/auth.validation";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), asyncHandler(authController.register));
authRouter.post("/login", validate(loginSchema), asyncHandler(authController.login));
authRouter.post("/refresh-token", validate(refreshTokenSchema), asyncHandler(authController.refreshToken));

export { authRouter };
