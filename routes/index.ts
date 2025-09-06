import { Router } from 'express';
import userRoutes from './users';
import groupRoutes from './groups';
import playerRoutes from './players';

import { requireAuth } from '@clerk/express';

const router = Router();

router.use('/users', requireAuth({ signInUrl: undefined }), userRoutes);
router.use('/groups', requireAuth({ signInUrl: undefined }), groupRoutes);
router.use('/players', requireAuth({ signInUrl: undefined }), playerRoutes);

export default router;
