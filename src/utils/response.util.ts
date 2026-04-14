import { Response } from "express";

const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown,
  meta?: Record<string, unknown>
): void => {
  response.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {})
  });
};

export { sendSuccess };
