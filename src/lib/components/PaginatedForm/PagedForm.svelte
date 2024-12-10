<script lang="ts">
	import { SvelteComponent } from 'svelte';
	import FormStep from './FormStep.svelte';

	let {children, ...rest } = $props<{children:Array<SvelteComponent>;}>();
	let currentStep = $state(0);

	let validForm = children?.every( (child:SvelteComponent) => child?.type === FormStep ) ?? false;
</script>

{#if validForm}
	<form {...rest}>
		{#each children as Step, index}
			{#if index === currentStep}
				<Step bind:this={children[index]} />
			{/if}
		{/each}
		{@render children()}
		<div class="controls">
			{#if currentStep > 0}
				<button type="button" onclick={previousStep()}>
					&lt; Previous
				</button>
			{/if}
			{#if currentStep < children.length - 1}
				<button type="button" onclick={nextStep} disabled={!canMoveToNextStep()}>
					Next &gt;
				</button>
			{/if}
			{#if currentStep === children.length - 1}
				<button type="submit" disabled={!children.every((step, index)=>stepValidities[index])}>
					Submit
				</button>
			{/if}
		</div>
	</form>
{:else}
	<p>Error has occured on the server side. Please contact an admin immediately.</p>
{/if}