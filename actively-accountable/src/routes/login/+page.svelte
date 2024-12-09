<script lang="ts">
	let email: string = '';
	let password: string = '';

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		console.log(`Logged in as: ${email}`);
		window.location.href = '/timeline'; // Redirect to Timeline page
	};
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<div class="mb-8 text-center">
			<img src="/your-logo.png" alt="Logo" class="mx-auto h-16 w-16" />
			<h1 class="text-2xl font-bold text-gray-800">Good to see you again</h1>
		</div>
		<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700"> Your email </label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="e.g., email@example.com"
					required
					class="mt-1 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">
					Your password
				</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
					required
					class="mt-1 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<button
				type="submit"
				class="w-full rounded bg-green-500 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
			>
				Sign In
			</button>
		</form>
		<div class="mt-6 text-center text-sm">
			<a href="/create-account" class="text-blue-500 hover:underline">Don't have an account?</a>
			<span class="mx-2 text-gray-400">|</span>
			<a href="/forgot-password" class="text-blue-500 hover:underline">Forgot password?</a>
		</div>
	</div>
</div>
