import express from 'express';
import { createPlayer, getPlayers, getPlayersByUnit, updatePlayerString } from '../controllers/players';

const router = express.Router();

router.post('/', createPlayer);
router.patch('/:playerId/string', updatePlayerString);
router.get('/:groupId', getPlayers);
router.get('/unit/:groupId', getPlayersByUnit);

export default router;
