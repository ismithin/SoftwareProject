<script lang="ts">
	let name: string = '';
	let email: string = '';
	let password: string = '';

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		// Mocking account creation; replace with actual backend integration
		console.log(`Account Created: ${name}, ${email}`);
		window.location.href = '/login'; // Redirect to login page after account creation
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
	<h1 class="mb-6 text-4xl font-bold text-gray-800">Create Account</h1>
	<form
		class="w-full max-w-md space-y-4 rounded bg-white p-6 shadow-md"
		on:submit|preventDefault={handleSubmit}
	>
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				required
				class="w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				class="w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				required
				class="w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<button type="submit" class="w-full rounded bg-green-500 py-2 text-white hover:bg-green-700">
			Create Account
		</button>
	</form>
</div>
