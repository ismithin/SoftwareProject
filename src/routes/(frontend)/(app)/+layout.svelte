<script lang="ts">
	import '$lib/app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	//$page.data.userSession // important variable to note
</script>
<div class="navbar bg-base-100">
	<div role="tablist" class="navbar-start tab tabs-lifted p-0">
		{#each ["/","/explore"] as navlink}
			<a role="tab" class="tab" class:tab-active={$page.url.pathname===navlink} href={navlink}>Test</a>
		{/each}
	</div>
	<div class="navbar-end">

	</div>
</div>

{@render children()}