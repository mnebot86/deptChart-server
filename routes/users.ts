import { validate } from "./../dto/validate";
import { Router } from 'express';
import { createUserAtRegister, getLoggedUser } from '../controllers/users';
import { createUserAtRegisterSchema } from '../dto/createUser';

const router = Router();

router.get('/me', getLoggedUser);
router.post('/register', validate(createUserAtRegisterSchema), createUserAtRegister);

export default router;
