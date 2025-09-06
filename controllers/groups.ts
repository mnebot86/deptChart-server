import { logger } from '../utils/logger';
import { Request, Response } from 'express';
import Group from '../models/groups';
import { StatusCodes } from 'http-status-codes';
import { getAuth } from '@clerk/express';
import User from '../models/users';
import { Types } from 'mongoose';

export const createGroup = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  try {
    const { name, code } = req.body;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Group name is required' });
    }

    if (!code) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Group code is required' });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    const group = new Group({ name, code, coaches: [user] });

    const savedGroup = await group.save();

    if (!!savedGroup.id) {
      user.groups.push(savedGroup._id as Types.ObjectId);

      await user.save();
    }

    return res.status(StatusCodes.OK).json(savedGroup);
  } catch (error: any) {
    logger.error('Error creating group:', error);

    return res.status(500).json({ message: 'Failed to create group', error: error.message });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }

  const group = await Group.find({
    coaches: user._id
  });

  if (!group) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'No groups were found' })
  }

  return res.status(StatusCodes.OK).json(group);
}

export const joinGroup = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'A code is required' });
  }

  const group = await Group.findOne({ code });

  if (!group) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: `No group found with code ${code}` })
  }

  group.coaches.push(user._id as Types.ObjectId);

  const savedGroup = await group.save();

  user.groups.push(savedGroup._id as Types.ObjectId)

  await user.save();

  res.status(StatusCodes.OK).json(savedGroup);
};
