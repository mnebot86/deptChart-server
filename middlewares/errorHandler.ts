import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any, _req: Request,
  res: Response,
  _next: NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  
  res.status(err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err?.message || 'Internal Server Error'
  });
};
