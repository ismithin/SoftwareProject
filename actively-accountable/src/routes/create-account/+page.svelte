<script lang="ts">
	let name: string = '';
	let email: string = '';
	let password: string = '';
	let securityQuestion: string = '';
	let securityAnswer: string = '';
	let errorMessage: string = '';
	let formErrorMessage: string = '';

	const validatePassword = (password: string) => {
		// Check if password contains at least one uppercase letter and one number
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
		return passwordRegex.test(password);
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		// Clear previous error messages
		formErrorMessage = '';
		errorMessage = '';

		// Check if all fields are filled
		if (!name || !email || !password || !securityQuestion || !securityAnswer) {
			formErrorMessage = 'Please fill in all fields.';
			return;
		}

		// Validate password
		if (!validatePassword(password)) {
			errorMessage = 'Password must contain at least one uppercase letter and one number.';
			return;
		}

		try {
			// Send POST request to the backend
			const response = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: name,
					email: email,
					password: password,
					securityQuestion: securityQuestion,
					securityAnswer: securityAnswer
				})
			});

			const result = await response.json();

			if (response.ok) {
				// Redirect to login page after successful account creation
				alert(result.message);
				window.location.href = '/login';
			} else {
				// Display error message from backend
				errorMessage = result.error || 'Failed to create account.';
			}
		} catch (error) {
			errorMessage = 'An error occurred while creating the account. Please try again.';
			console.error(error);
		}
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
	<h1 class="text-navy-900 mb-6 text-4xl font-bold">Create Account</h1>
	<form
		class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg"
		on:submit|preventDefault={handleSubmit}
	>
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700"
				>Name <span class="text-red-500">*</span></label
			>
			<input
				id="name"
				type="text"
				bind:value={name}
				required
				class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
			/>
		</div>
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700"
				>Email <span class="text-red-500">*</span></label
			>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
			/>
		</div>
		<div>
			<label for="password" class="block text-sm font-medium text-gray-700"
				>Password <span class="text-red-500">*</span></label
			>
			<input
				id="password"
				type="password"
				bind:value={password}
				required
				class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
			/>
			{#if errorMessage}
				<p class="mt-2 text-sm text-red-500">{errorMessage}</p>
			{/if}
		</div>

		<!-- Security Question Section -->
		<div>
			<label for="securityQuestion" class="block text-sm font-medium text-gray-700"
				>Security Question <span class="text-red-500">*</span></label
			>
			<select
				id="securityQuestion"
				bind:value={securityQuestion}
				required
				class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
			>
				<option value="" disabled>Select a security question</option>
				<option value="What is your mother's maiden name?"
					>What is your mother's maiden name?</option
				>
				<option value="What was the name of your first pet?"
					>What was the name of your first pet?</option
				>
				<option value="What is your favorite color?">What is your favorite color?</option>
				<option value="What city were you born in?">What city were you born in?</option>
			</select>
		</div>

		<div>
			<label for="securityAnswer" class="block text-sm font-medium text-gray-700"
				>Security Answer <span class="text-red-500">*</span></label
			>
			<input
				id="securityAnswer"
				type="text"
				bind:value={securityAnswer}
				required
				class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
			/>
		</div>

		<!-- Form-wide error message if any field is missing -->
		{#if formErrorMessage}
			<p class="mt-2 text-sm text-red-500">{formErrorMessage}</p>
		{/if}

		<button
			type="submit"
			class="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
		>
			Create Account
		</button>
	</form>
</div>

<style>
	/* Modern green and navy blue styling */
	.text-navy-900 {
		color: #003366;
	}
	.bg-green-500 {
		background-color: #48bb78;
	}
	.bg-green-600 {
		background-color: #38a169;
	}
	.bg-green-700 {
		background-color: #2f855a;
	}
	.focus\:ring-green-500:focus {
		ring-color: #48bb78;
	}
	.text-red-500 {
		color: #f56565;
	}
</style>
