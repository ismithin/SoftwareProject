import * as schema from '$lib/schema';
import {z} from 'zod';

export type UserSession={
	userId:string,
	token:string
}

export type Cookie=z.infer<typeof schema.cookieSchema>;
