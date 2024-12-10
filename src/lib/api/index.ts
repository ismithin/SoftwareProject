import type { RequestEvent } from '@sveltejs/kit';
import {z} from 'zod';
import type {ZodObject, ZodRawShape } from "zod";

// Maybe make this use a callback function, to reduce repetition throughout the code, however, that will reduce modularity.
export const requestParse = async (event:RequestEvent,zObj:ZodObject<ZodRawShape>):Promise<any> =>{
	return zObj.parse(await event.request.json()).data;
}

import type {Cookie} from '$lib/types'
// Request event is needed for setting cookies, due to the (imo) dumb ways that sveltekit sets cookies
export const apiResponse = (event: RequestEvent, data: object, status: number = 200, cookie: Cookie|Cookie[]|undefined=undefined): Response =>{
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};
	if(cookie!==undefined){
		(Array.isArray(cookie)?cookie:[cookie]).forEach(_cookie=>{
			event.cookies.set(_cookie.key,_cookie.value,_cookie.options);
		})
	}
	return new Response(
		JSON.stringify(data),
		{
        	status,
        	headers,
    	}
	);
}