import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
  };
