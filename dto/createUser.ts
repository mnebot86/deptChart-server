import { z } from 'zod';

export const createUserAtRegisterSchema = z.object({
  email: z.email(),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});
