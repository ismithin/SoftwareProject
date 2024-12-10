import type { RequestEvent } from '@sveltejs/kit';
import {db} from '$lib/db'
import { apiResponse, requestParse } from '$lib/api';
import {z} from 'zod'
import { verifyHash } from '$lib/auth';

export const POST=async (event: RequestEvent): Promise<Response>=>{
	try{
		let userCredentials = await requestParse(event,
			z.object({
				username:z.string(),
				question:z.string(), // In case of future checks.
				answer:z.string().regex(/^[a-fA-F0-9]{64}$/, {message: "Invalid Sha256 hash."}),
			}).required().strict()
		);
		let questionData = await db.securityUser.findUnique({
			where: {
				username: userCredentials.username,
			},
			select: {
				id: true,
				question: true,
				answer: true,
			}
		});
		if(questionData){
			if(questionData.question!==userCredentials.question)
				return apiResponse(event,{message:"Request question field and database question field are not identical."},404);
			else if(await verifyHash(userCredentials.answer,questionData.answer))
				return apiResponse(event,
					// Hack to get a find or create function for prisma.
					await db.securityReset.upsert({
						where:{
							userId: questionData.id,
						},
						update:{},
						create:{
							userId: questionData.id,
							expirationDate: new Date(Date.now() + 60 * 60 * 1000) // User has an hour to change password.
						}
					})
				);
			else return apiResponse(event,{message: "Security answer is incorrect."},404);
		}else return apiResponse(event,{message: "User not found."},404);
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