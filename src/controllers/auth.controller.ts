import { Request, Response } from "express";

import { authService } from "../services/auth.service";
import { sendSuccess } from "../utils/response.util";

const register = async (request: Request, response: Response): Promise<void> => {
  const data = await authService.register(request.body);
  sendSuccess(response, 201, "Customer registered successfully", data);
};

const login = async (request: Request, response: Response): Promise<void> => {
  const data = await authService.login(request.body);
  sendSuccess(response, 200, "Login successful", data);
};

const refreshToken = async (request: Request, response: Response): Promise<void> => {
  const data = await authService.refreshToken(request.body.refreshToken);
  sendSuccess(response, 200, "Token refreshed successfully", data);
};

export const authController = {
  register,
  login,
  refreshToken
};
