import { z } from 'zod';

const RegisterSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type PayloadRegister = z.infer<typeof RegisterSchema>;
export type PayloadLogin = z.infer<typeof LoginSchema>;

export { RegisterSchema, LoginSchema };