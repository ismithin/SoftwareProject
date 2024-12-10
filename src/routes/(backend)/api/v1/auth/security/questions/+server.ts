import type { RequestEvent } from '@sveltejs/kit';
import {db} from '$lib/db'
import { apiResponse, requestParse } from '$lib/api';
import {z} from 'zod'
import { verifyHash } from '$lib/auth';

// Note: Convert this to using GET rather than POST later.

export const POST=async (event: RequestEvent): Promise<Response>=>{
	try{
		let user = await requestParse(event,
			z.object({
				username:z.string(),
			}).required().strict()
		);
		let questionData = await db.securityUser.findUnique({
			where: {
				username: user.username,
			},
			select: {
				username: true,
				question: true
			}
		});
		if(questionData)
			return apiResponse(event, questionData);
		else
			return apiResponse(event,{message: "User not found."},404);
	}catch(err){
		if (err instanceof z.ZodError) {
			// If validation fails, handle the error
			return apiResponse(event,{message:err.errors},400);
		} else {
			// Handle other errors
			return apiResponse(event,{message:err},500);
		}
	}
}