<script lang="ts">
	export let isOpen: boolean;
	export let onClose: () => void;

	const closeModal = (event: Event) => {
		event.stopPropagation();
		onClose();
	};
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		on:click={closeModal}
	>
		<div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg" on:click|stopPropagation>
			<button
				class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
				on:click={closeModal}
			>
				✕
			</button>
			<slot />
			<!-- Slot allows content injection -->
		</div>
	</div>
{/if}
