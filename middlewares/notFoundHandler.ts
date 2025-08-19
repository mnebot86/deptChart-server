import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/logger';

export const notFoundHandler = (req: Request, res: Response) => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;

  logger.warn(message);
  
  res.status(StatusCodes.NOT_FOUND).json({ message });
};
