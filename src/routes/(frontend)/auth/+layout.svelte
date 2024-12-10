<script lang="ts">
	import '$lib/app.css';
	import { page } from '$app/stores';
	
	let { children } = $props();
</script>

<dialog id="my_modal_2" class="modal" open>
	<div class="modal-box h-full max-md:w-full max-md:max-h-full overflow-y-clip">
		<div role="tablist" class="tabs tabs-boxed join w-full absolute top-0 right-0">
			<a role="tab" class="tab join-item w-full px-full" class:tab-active={$page.url.pathname==="/auth/register"} href="/auth/register">Register</a>
			<a role="tab" class="tab join-item w-full px-full" class:tab-active={$page.url.pathname!=="/auth/register"} href="/auth/login">Login</a>
		</div>
		<div class="mt-[2em] h-full w-full">
			{@render children()}
		</div>
	</div>
</dialog>