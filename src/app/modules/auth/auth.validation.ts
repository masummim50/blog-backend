import { z } from 'zod';

const create = z.object({
  body: z.object({
    userName: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});
const gmailLogin = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    name: z.string({ required_error: 'name is required' }),
  }),
});

export const authValidation = {
  create,
  login,
  gmailLogin,
};
