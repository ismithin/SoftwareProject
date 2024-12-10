import type { RequestEvent } from '@sveltejs/kit';
import {db} from '$lib/db'
import { apiResponse, requestParse } from '$lib/api';
import {z} from 'zod'
import { hashBcrypt } from '$lib/auth';

export const POST=async (event: RequestEvent): Promise<Response>=>{
	try {
		let resetData = await requestParse(event,
			z.object({
				password:z.string().regex(/^[a-fA-F0-9]{64}$/, {message: "Invalid Sha256 hash."}),
				resetToken:z.string().uuid(),
			}).required().strict()
		);
		let securityResetData = await db.securityReset.findUnique({
			where:{
				id: resetData.resetToken,
			}
		});
		if(securityResetData){
			let sessionExpiration = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
			let sessionDatabaseTransaction = await db.$transaction([
				db.securityReset.delete({
					where:{
						id: resetData.resetToken,
					}
				}),
				db.securityUser.update({
					where:{
						id: securityResetData.userId,
					},
					data:{
						password: await hashBcrypt(resetData.password),
					}
				}),
				db.securitySession.create({
					data: {
					  userId: securityResetData.id,
					  expirationDate: sessionExpiration,  // 3 days from now.
					},
				})
			])
			return apiResponse(event,sessionDatabaseTransaction[2],200,{
				key:"session",
				value:sessionDatabaseTransaction[2].id,
				options:{
					expires:sessionExpiration,
				}
			});
		}else return apiResponse(event,{message:"Invalid Token"},404);
	}catch(err) {
		if (err instanceof z.ZodError) {
			// If validation fails, handle the error
			return apiResponse(event,{message:err.errors},400);
		} else {
			// Handle other errors
			return apiResponse(event,{message:err},500);
		}
	}
}