import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAuth } from '@clerk/express';
import User from '../models/users';
import { logger } from '../utils/logger';

export const createUserAtRegister = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const { email, firstName, lastName } = req.body || {};

  try {
    const existingUser = await User.findOne({ clerkId: userId });

    if (existingUser) {
      logger.info({
        clerkId: userId,
        userMongoId: existingUser._id
      }, '[users] createUserAtRegister - user exists');

      return res.status(StatusCodes.OK).json({
        created: false,
        user: existingUser,
      });
    }

    const newUser = new User({ clerkId: userId, email, firstName, lastName });

    await newUser.save();

    logger.info({ clerkId: userId, created: true, userMongoId: newUser._id }, '[users] createUserAtRegister - user created');

    return res.status(StatusCodes.CREATED).json({
      created: true,
      user: newUser,
    });
  } catch (err: any) {
    logger.error({ err, clerkId: userId }, '[users] createUserAtRegister failed');

    const isDup = err?.code === 11000;

    return res
      .status(isDup ? StatusCodes.CONFLICT : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: isDup ? 'User with that email already exists' : 'Failed to create user' });
  }
};

export const getLoggedUser = async (req: Request, res: Response) => {  
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      logger.info({ clerkId: userId }, '[users] getLoggedUser - user not found');

      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    logger.info({ clerkId: userId, userMongoId: user._id }, '[users] getLoggedUser - user found');

    return res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    logger.error({ err, clerkId: userId }, '[users] getLoggedUser failed');

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch user' });
  }
};
