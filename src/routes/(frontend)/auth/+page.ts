import { redirect } from '@sveltejs/kit';
throw redirect(303, '/auth/login');