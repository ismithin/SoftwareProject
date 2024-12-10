import type { RequestEvent } from '@sveltejs/kit';
import {db} from '$lib/db'
import { apiResponse } from '$lib/api';
import {z} from 'zod'
import { hashBcrypt } from '$lib/auth';

// At some point, make this include user info.
let registerUserSchema=z.object({
	username:z.string(),
	password:z.string().regex(/^[a-fA-F0-9]{64}$/, {message: "Invalid Sha256 hash."}),
	question:z.string(),
	answer:z.string().regex(/^[a-fA-F0-9]{64}$/, {message: "Invalid Sha256 hash."}),
}).required().strict();


// API Route: POST /api/register
export const POST=async (event: RequestEvent): Promise<Response>=>{
	const requestSchemaCheck = registerUserSchema.safeParse(await event.request.json());

}