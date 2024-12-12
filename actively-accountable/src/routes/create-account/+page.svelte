<script lang="ts">
	// Form data bindings
	let name: string = '';
	let email: string = '';
	let password: string = '';
	let securityQuestion: string = '';
	let securityAnswer: string = '';
	let errorMessage: string = '';
	let formErrorMessage: string = '';

	// Validate password
	const validatePassword = (password: string) => {
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
		return passwordRegex.test(password);
	};

	// Handle form submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		// Clear previous error messages
		formErrorMessage = '';
		errorMessage = '';

		// Validate all fields filled
		if (!name || !email || !password || !securityQuestion || !securityAnswer) {
			formErrorMessage = 'Please fill in all fields.';
			return;
		}

		// Password validation
		if (!validatePassword(password)) {
			errorMessage = 'Password must contain at least one uppercase letter and one number.';
			return;
		}

		// Simulate POST request
		try {
			const response = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: name,
					email,
					password,
					securityQuestion,
					securityAnswer
				})
			});

			const result = await response.json();
			if (response.ok) {
				alert(result.message);
				window.location.href = '/login';
			} else {
				errorMessage = result.error || 'Failed to create account.';
			}
		} catch (error) {
			errorMessage = 'An error occurred while creating the account. Please try again.';
			console.error(error);
		}
	};

	// Image pool and random selection logic
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
		'/src/lib/MealImages/frontPageAlbum/meal14.jpg'
	];

	let currentImages: string[] = [];

	// Select 8 unique random images from the pool
	function initializeImages() {
		const shuffled = [...imagePool];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		currentImages = shuffled.slice(0, 8);
	}

	// Initialize images when the script runs
	initializeImages();
</script>

<div class="main-container">
	<!-- Animated Grid Section -->
	<div class="grid-container">
		{#each currentImages as image, index}
			<div class="grid-item">
				<img src={image} alt={`Background ${index + 1}`} />
			</div>
		{/each}
	</div>

	<!-- Create Account Overlay Section -->
	<div class="form-container">
		<div class="form-box">
			<h1 class="title">Create Your Account</h1>
			<form class="form" on:submit|preventDefault={handleSubmit}>
				<div>
					<label for="name" class="label">Name</label>
					<input id="name" type="text" bind:value={name} class="input" required />
				</div>
				<div>
					<label for="email" class="label">Email</label>
					<input id="email" type="email" bind:value={email} class="input" required />
				</div>
				<div>
					<label for="password" class="label">Password</label>
					<input id="password" type="password" bind:value={password} class="input" required />
					{#if errorMessage}
						<p class="error">{errorMessage}</p>
					{/if}
				</div>
				<div>
					<label for="securityQuestion" class="label">Security Question</label>
					<select id="securityQuestion" bind:value={securityQuestion} class="input" required>
						<option value="" disabled>Select a question</option>
						<option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
						<option value="What was the name of your first pet?">What was the name of your first pet?</option>
						<option value="What is your favorite color?">What is your favorite color?</option>
						<option value="What city were you born in?">What city were you born in?</option>
					</select>
				</div>
				<div>
					<label for="securityAnswer" class="label">Answer</label>
					<input id="securityAnswer" type="text" bind:value={securityAnswer} class="input" required />
				</div>
				{#if formErrorMessage}
					<p class="error">{formErrorMessage}</p>
				{/if}
				<button type="submit" class="submit-btn">Register</button>
			</form>
		</div>
	</div>
</div>

<style>
	/* Main container */
	.main-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	/* Animated Grid */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 2px;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.grid-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(1.1) contrast(1.2);
	}

	/* Overlay form */
	.form-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.85);
	}

	.form-box {
		background: white;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		width: 400px;
	}

	.input {
		width: 100%;
		padding: 10px;
		margin: 5px 0;
		border: 1px solid #d1d1d1;
		border-radius: 4px;
	}

	.error {
		color: red;
		font-size: 0.9em;
	}

	.submit-btn {
		width: 100%;
		padding: 10px;
		background-color: #38a169;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
