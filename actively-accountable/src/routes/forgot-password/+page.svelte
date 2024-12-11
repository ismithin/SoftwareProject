<script lang="ts">
	// Form data bindings
	let email: string = '';
	let securityAnswer: string = '';
	let newPassword: string = '';
	let confirmPassword: string = '';
	let errorMessage: string = '';
	let formStep: number = 1; // Controls the form step (1: email, 2: security question, 3: password)
	let securityQuestion: string = '';
	let correctAnswer: string = '';

	// Simulate user database
	const usersDb: { [key: string]: { email: string, securityQuestion: string, securityAnswer: string, password: string } } = {
		"user@example.com": {
			email: "user@example.com",
			securityQuestion: "What is your favorite color?",
			securityAnswer: "blue",
			password: "OldPassword123"
		},
		"test@domain.com": {
			email: "test@domain.com",
			securityQuestion: "What was the name of your first pet?",
			securityAnswer: "buddy",
			password: "OldPassword456"
		}
	};

	const validatePassword = (password: string): boolean => {
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
		return passwordRegex.test(password);
	};

	const handleEmailSubmit = (event: Event) => {
		event.preventDefault();
		const user = usersDb[email];
		if (user) {
			securityQuestion = user.securityQuestion;
			correctAnswer = user.securityAnswer;
			formStep = 2;
		} else {
			alert('Email not recognized. Please try again.');
		}
	};

	const handleSecuritySubmit = (event: Event) => {
		event.preventDefault();
		if (securityAnswer.trim().toLowerCase() !== correctAnswer.toLowerCase()) {
			alert('Incorrect answer. Please try again.');
			return;
		}
		formStep = 3;
	};

	const handlePasswordSubmit = (event: Event) => {
		event.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('Passwords do not match. Please try again.');
			return;
		}
		if (!validatePassword(newPassword)) {
			errorMessage = "Password must contain at least one uppercase letter and one number.";
			return;
		}
		alert('Your password has been successfully reset!');
		window.location.href = '/login';
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

	<!-- Reset Password Overlay Section -->
	<div class="form-container">
		<div class="form-box">
			<h1 class="title">Reset Your Password</h1>
			{#if formStep === 1}
				<form class="form" on:submit|preventDefault={handleEmailSubmit}>
					<div>
						<label for="email" class="label">Email Address</label>
						<input id="email" type="email" bind:value={email} class="input" required />
					</div>
					<button type="submit" class="submit-btn">Continue</button>
				</form>
			{/if}
			{#if formStep === 2}
				<form class="form" on:submit|preventDefault={handleSecuritySubmit}>
					<div>
						<label class="label">{securityQuestion}</label>
						<input id="securityAnswer" type="text" bind:value={securityAnswer} class="input" required />
					</div>
					<button type="submit" class="submit-btn">Verify Answer</button>
				</form>
			{/if}
			{#if formStep === 3}
				<form class="form" on:submit|preventDefault={handlePasswordSubmit}>
					<div>
						<label for="newPassword" class="label">New Password</label>
						<input id="newPassword" type="password" bind:value={newPassword} class="input" required />
						{#if errorMessage}
							<p class="error">{errorMessage}</p>
						{/if}
					</div>
					<div>
						<label for="confirmPassword" class="label">Confirm New Password</label>
						<input id="confirmPassword" type="password" bind:value={confirmPassword} class="input" required />
					</div>
					<button type="submit" class="submit-btn">Reset Password</button>
				</form>
			{/if}
			<div class="mt-6 text-center">
				<a href="/login" class="text-blue-500 hover:underline">Back to Login</a>
			</div>
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
