// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { UserSession } from '$lib/types';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userSession:UserSession,
		  }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
