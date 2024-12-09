<script lang="ts">
	let email: string = '';
	let password: string = '';

	let errorMessage: string = '';

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		errorMessage = ''; // Clear any previous error messages

		try {
			// Send login request to the backend
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const result = await response.json();

			if (response.ok) {
				// Redirect to profile page on successful login
				alert('Login successful!');
				window.location.href = '/profile';
			} else {
				// Display error message from the backend
				errorMessage = result.error || 'Failed to log in. Please check your credentials.';
			}
		} catch (error) {
			errorMessage = 'An error occurred while logging in. Please try again.';
			console.error(error);
		}
	};
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100"
>
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

			<!-- Display error message if any -->
			{#if errorMessage}
				<p class="mt-2 text-sm text-red-500">{errorMessage}</p>
			{/if}

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
