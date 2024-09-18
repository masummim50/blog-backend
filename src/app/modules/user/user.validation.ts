import { z } from 'zod';

const update = z.object({
  body: z.object({
    userName: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const userValidation = {
  update,
};
