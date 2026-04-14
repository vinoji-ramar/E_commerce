import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";

import { AppError } from "../utils/app-error.util";
import { logger } from "../utils/logger.util";

const notFoundHandler = (_request: Request, _response: Response, next: NextFunction): void => {
  next(new AppError(404, "Route not found"));
};

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors
    });
    return;
  }

  if (error instanceof multer.MulterError) {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Image file is too large. Maximum allowed size is 2MB"
        : error.code === "LIMIT_UNEXPECTED_FILE"
          ? "Invalid file field. Use 'image' as the form-data key"
          : error.message;

    response.status(400).json({
      success: false,
      message
    });
    return;
  }

  logger.error("Unhandled application error", error);

  response.status(500).json({
    success: false,
    message: "Internal server error"
  });
};

export { notFoundHandler, errorHandler };
