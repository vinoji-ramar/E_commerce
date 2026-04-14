import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return async (request: Request, _response: Response, next: NextFunction): Promise<void> => {
    await schema.parseAsync({
      body: request.body,
      query: request.query,
      params: request.params
    });

    next();
  };
};
