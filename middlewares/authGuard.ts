import { getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuthed = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  return next();
};
