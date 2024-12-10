import type { RequestEvent } from '@sveltejs/kit';
import {db} from '$lib/db'
import { apiResponse } from '$lib/api';
//Note for later. Add logic to allow user to logout via session token in request, rather than ony cookies.
export const POST=async (event: RequestEvent): Promise<Response>=>{
	try{
		let userSession = await db.securitySession.delete({
			where: {
				id: event.locals.userSession.token
			},
		});
	}catch{
		console.error("Error removing session from database.")
	}
	event.cookies.delete("session",{path:"/"});
	return apiResponse(event,{message:"User has been signed out!"});
}