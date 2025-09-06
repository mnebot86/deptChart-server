

import express from 'express';
import { createGroup, getGroups, joinGroup } from '../controllers/groups';

const router = express.Router();

router.post('/', createGroup);
router.get('/', getGroups);

router.post('/join', joinGroup);

export default router;
