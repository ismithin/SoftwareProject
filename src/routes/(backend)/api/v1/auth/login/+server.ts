import type { RequestEvent } from '@sveltejs/kit';
import {z} from 'zod'
import {db} from '$lib/db'
import { apiResponse, requestParse } from '$lib/api';
import { verifyHash } from '$lib/auth';

export const POST=async (event: RequestEvent): Promise<Response>=>{
	try{
		let userCredentials = await requestParse(event,
			z.object({
				username:z.string(),
				// Uses a sha256 hash when in transit.
				password:z.string().regex(/^[a-fA-F0-9]{64}$/, {message: "Invalid Sha256 hash."}),
			}).required().strict()
		);
		const user = await db.securityUser.findUnique({
			where:{
				username: userCredentials.username,
			}
		});
		if(!user) return apiResponse(event, {message:"Username not found."}, 404);
		if(await verifyHash(userCredentials.password, user.password)){
			let sessionExpiration = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
			let userSession = await db.securitySession.create({
				data: {
				  userId: user.id,
				  expirationDate: sessionExpiration,  // 3 days from now.
				},
			});
			return apiResponse(event,userSession,200,{
				key:"session",
				value:userSession.id,
				options:{
					expires:sessionExpiration,
				}
			});
		}else return apiResponse(event,{messsage:"Incorrect password."},404);
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