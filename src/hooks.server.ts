import type { Handle, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		// Delete all expired sessions (sessions where 'expires' < current date)
		await db.securitySession.deleteMany({
			where: {
				expirationDate: {
					lt: new Date() // 'lt' means less than the current date
				}
			}
		});
	} catch (err) {
		console.error('Error deleting expired session tokens:', err);
	}

	try {
		// Delete all expired sessions (sessions where 'expires' < current date)
		await db.securityReset.deleteMany({
			where: {
				expirationDate: {
					lt: new Date() // 'lt' means less than the current date
				}
			}
		});
	} catch (err) {
		console.error('Error deleting expired password reset tokens:', err);
	}

	// get cookies from browser
	const session:string|undefined = event.cookies.get('session');
	if (!session) {
		return await resolve(event);
	}
	// find the user based on the session
	const userId: string|undefined = (await db.securitySession.findUnique({
		where: { id: session },
		select: { userId: true },
	}))?.userId;
	// if `user` exists set `events.local`
	if (userId) {
		event.locals.userSession = {
			userId:userId,
			token:session
		};
	}
	// load page as normal
	return await resolve(event);
}