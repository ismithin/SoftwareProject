import {z} from 'zod';

export const cookieSchema = z.object({
	key: z.string().min(1, "Cookie key must be a non-empty string"),
	value: z.string().min(1, "Cookie value must be a non-empty string"),
	options:z.object({
		maxAge: z.optional(z.number().int().positive().max(31536000, "maxAge must be between 0 and 1 year in seconds")),
		expires: z.date().optional(),
		path: z.string().optional(),
		domain: z.string().optional(),
		secure: z.boolean().optional(),
		httpOnly: z.boolean().optional(),
		sameSite: z.enum(['Strict', 'Lax', 'None']).optional(),
	}).optional(),
});