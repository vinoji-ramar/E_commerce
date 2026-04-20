import { Request, Response, NextFunction } from "express";

import { authService } from "../services/auth.service";
import { sendSuccess } from "../utils/response.util";
import { AppError } from "../utils/app-error.util";

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await authService.register(request.body);

    sendSuccess(response, 201, "Customer registered successfully", data);
  } catch (error) {
    console.error("🔥 REGISTER CONTROLLER ERROR:", error);
    next(error); // ✅ pass to global error handler
  }
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await authService.login(request.body);

    sendSuccess(response, 200, "Login successful", data);
  } catch (error) {
    console.error("🔥 LOGIN CONTROLLER ERROR:", error);
    next(error);
  }
};

const refreshToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new AppError(400, "Refresh token is required");
    }

    const data = await authService.refreshToken(refreshToken);

    sendSuccess(response, 200, "Token refreshed successfully", data);
  } catch (error) {
    console.error("🔥 REFRESH CONTROLLER ERROR:", error);
    next(error);
  }
};

export const authController = {
  register,
  login,
  refreshToken
};