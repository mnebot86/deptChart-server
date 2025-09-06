import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Player from "../models/players";
import { logger } from "../utils/logger";
import mongoose from "mongoose";

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const { players, groupId } = req.body;

    const trimmedPlayers = players
      .map((p: any) => ({
        firstName: p.firstName?.trim(),
        lastName: p.lastName?.trim(),
      }))
      .filter((p: any) => p.firstName && p.lastName);

    if (trimmedPlayers.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All player entries are missing first or last names' });
    }

    const existingPlayers = await Player.find({
      group: groupId,
      $or: trimmedPlayers.map((p: any) => ({
        firstName: p.firstName,
        lastName: p.lastName,
      }))
    });

    const existingNames = new Set(
      existingPlayers.map(p => `${p.firstName.toLowerCase()} ${p.lastName.toLowerCase()}`)
    );

    const newPlayers = trimmedPlayers.filter((p: any) => {
      const key = `${p.firstName.toLowerCase()} ${p.lastName.toLowerCase()}`;
      return !existingNames.has(key);
    });

    if (newPlayers.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All players already exist in this group' });
    }

    const playersToInsert = newPlayers.map((p: any) => ({
      firstName: p.firstName,
      lastName: p.lastName,
      group: groupId,
    }));

    await Player.insertMany(playersToInsert);

    logger.info(`Added ${playersToInsert.length} new players to group ${groupId}`);

    return res.status(StatusCodes.CREATED).json({ message: `${playersToInsert.length} players added` });
  } catch (error) {
    logger.error(`Error creating players: ${error instanceof Error ? error.message : String(error)}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create players' });
  }
};

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const { groupId } = req.params;

    if (!groupId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing group id' });
    }

    const players = await Player.find({ group: new mongoose.Types.ObjectId(groupId) })

    return res.status(StatusCodes.OK).json(players);
  } catch (error) {
    logger.error(`Error Fetching Players: ${error instanceof Error ? error.message : String(error)}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
};

export const getPlayersByUnit = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const { groupId } = req.params;
    const { unit } = req.query;

    const players = await Player.find({
      group: new mongoose.Types.ObjectId(groupId),
      'assignments.unit': unit
    })

    const gridData = players.reduce((acc, player) => {
      const assignment = player.assignments?.find(p => p.unit === unit);

      if (!assignment) return acc;

      const modifiedPlayer = {
        [assignment.position]: `${player.firstName} ${player.lastName}`,
        [assignment.string]: `${player.firstName} ${player.lastName}`,
        unit: assignment.unit,
        id: player._id.toString() as string,
        position: assignment.position
      };

      acc.push(modifiedPlayer);

      return acc;
    }, [] as Record<string, string>[]);

    return res.status(StatusCodes.OK).json(gridData);
  } catch (error) {
    logger.error(`Error Fetching Player By Unit: ${error instanceof Error ? error.message : String(error)}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}

export const updatePlayerString = async (req: Request, res: Response) => {
  const io = req.app.get('io');

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const { playerId } = req.params;

    const { unit, position, string } = req.body;

    if (!playerId || !unit || !position || !string) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Player not found' });
    }

    const assignment = player.assignments?.find(
      (a) => a.unit === unit && a.position === position
    );

    if (!assignment) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Assignment not found' });
    }

    assignment.string = string;

    await player.save();

    const updatedAssignment = player.assignments?.find(
      (a) => a.unit === unit && a.position === position
    );

    if (!updatedAssignment) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Updated assignment not found' });
    }

    const fullName = `${player.firstName} ${player.lastName}`;

    io.emit('player:string-updated', {
      [updatedAssignment.position]: fullName,
      [updatedAssignment.string]: fullName,
      unit: updatedAssignment.unit,
      id: player._id.toString(),
      position: updatedAssignment.position,
    });

    return res.status(StatusCodes.OK).json(player);
  } catch (error) {
    logger.error(`Error updating player: ${error instanceof Error ? error.message : String(error)}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}
