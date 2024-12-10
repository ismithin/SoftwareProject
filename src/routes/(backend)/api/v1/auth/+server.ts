export const GET=async (): Promise<Response>=>{
	return new Response("Unused endpoint.",{status:404,headers:{'Content-Type': 'text/plain'}});
}