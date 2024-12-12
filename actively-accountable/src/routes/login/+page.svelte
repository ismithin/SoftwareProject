<script lang="ts">
	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	const imagePool = [
		'/src/lib/MealImages/frontPageAlbum/meal1.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal2.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal3.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal4.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal5.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal6.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal7.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal8.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal9.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal10.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal11.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal12.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal13.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal14.jpg',
	];

	let currentImages: string[] = [];

	// Select 8 unique random images from the pool on page load
	function initializeImages() {
		currentImages = getRandomUniqueSubset(imagePool, 8);
	}

	// Helper function to get a unique random subset of images
	function getRandomUniqueSubset(array: string[], count: number): string[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled.slice(0, count);
	}

	// Initialize images when the script runs
	initializeImages();

	// Handle login submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		errorMessage = '';

		try {
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const result = await response.json();

			if (response.ok) {
				alert('Login successful!');
				window.location.href = '/profile';
			} else {
				errorMessage = result.error || 'Failed to log in. Please check your credentials.';
			}
		} catch (error) {
			errorMessage = 'An error occurred while logging in. Please try again.';
			console.error(error);
		}
	};
</script>

<div class="main-container">
	<!-- Animated Grid Section -->
	<div class="grid-container">
		{#each currentImages as image, index}
			<div class="grid-item">
				<img src={image} alt={`Placeholder ${index + 1}`} />
			</div>
		{/each}
	</div>

	<!-- Login Overlay Section -->
	<div class="login-overlay">
		<div class="login-box">
			<img
				src="\src\lib\MealImages\logodesign.png"
				alt="Logo"
				class="logo"
			/>
			<h1 class="title">Actively Accountable Login</h1>

			<form class="login-form" on:submit|preventDefault={handleSubmit}>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Your email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="e.g., email@example.com"
						required
						class="mt-1 w-full rounded border border-lime-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Your password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						placeholder="••••••••"
						required
						class="mt-1 w-full rounded border border-lime-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
					/>
				</div>
				{#if errorMessage}
					<p class="mt-2 text-sm text-red-500">{errorMessage}</p>
				{/if}

				<button
					type="submit"
					class="w-full rounded bg-lime-500 py-2 font-bold text-white hover:bg-lime-600 focus:outline-none"
				>
					Sign In
				</button>
			</form>

			<!-- Links for Forgot Password & Create Account -->
			<div class="auth-links">
				<a href="/forgot-password" class="text-blue-500 hover:underline">Forgot Password?</a>
				<span class="mx-2 text-gray-400">|</span>
				<a href="/create-account" class="text-blue-500 hover:underline">Create New Account</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* General container styles */
	.main-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: linear-gradient(to bottom, #d0e8d0, #a8d5ba);
		position: relative;
	}

	/* Animated Grid */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 8px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		overflow: hidden;
	}

	.grid-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(1.2) contrast(1.3);
	}

	/* Login overlay */
	.login-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: rgba(255, 255, 255, 0.9);
	}

	/* Login box */
	.login-box {
		background: white;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		text-align: center;
		width: 100%;
		max-width: 400px;
	}

	/* Auth links */
	.auth-links {
		margin-top: 10px;
		text-align: center;
		font-size: 0.9em;
	}

	.auth-links a:hover {
		color: #0056b3;
	}
</style>
