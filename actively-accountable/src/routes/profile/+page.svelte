<script lang="ts">
	import { onMount } from 'svelte'; // Import lifecycle hook for data fetching

	interface User {
		name: string;
		email: string;
		bio: string;
		privacy: boolean; // Whether to display weight
		desiredWeightPrivacy: boolean; // Whether to display desired weight
		goalIntakePrivacy: boolean; // Whether to display goal intake
		dailyActivityPrivacy: boolean; // Whether to display daily activity
		weight: Float32Array; // Weight stored in kilograms
		desiredWeight: Float32Array; // Desired weight stored in kilograms
		goalIntake: number; // Daily goal intake (in calories)
		dailyActivity: number; // Daily activity (in minutes)
		profilePicture: string;
	}

	let user: User | null = null; // Initialize as null to handle loading state
	let errorMessage: string = ''; // Error message if data fetch fails
	let isEditing = false; // State to toggle edit mode
	let isLbs = false; // State to toggle between kg and lbs
	let tempUser: User | null = null;

	// Lifecycle hook to fetch user data
	onMount(async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('No logged-in user.');
			}

			const response = await fetch('http://localhost:5000/api/auth/profile', {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (!response.ok) {
				throw new Error('Failed to fetch user profile.');
			}

			const userData = await response.json();

			// Ensure type compatibility
			user = {
				...userData,
				// Ensure all required fields are present with defaults
				bio: userData.bio || 'Welcome to the app! Edit your bio here.',
				privacy: userData.privacy || true,
				desiredWeightPrivacy: userData.desiredWeightPrivacy || false,
				goalIntakePrivacy: userData.goalIntakePrivacy || false,
				dailyActivityPrivacy: userData.dailyActivityPrivacy || false,
				weight: new Float32Array(userData.weight || [0]),
				desiredWeight: new Float32Array(userData.desiredWeight || [0]),
				goalIntake: userData.goalIntake || 2000,
				dailyActivity: userData.dailyActivity || 30,
				profilePicture:
					userData.profilePicture ||
					'SoftwareProject/actively-accountable/src/lib/defaultUser/defaultUser.webp' // Replace with actual default image path
			};
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
			console.error(error);
		}
	});

	// Conversion functions with rounding to hundredths
	const kgToLbs = (kg: number) => (Math.round(kg * 2.20462 * 100) / 100).toFixed(2);
	const lbsToKg = (lbs: number) => (Math.round((lbs / 2.20462) * 100) / 100).toFixed(2);
	const formatWeight = (weight: number) => weight.toFixed(2); // Format number to 2 decimal places

	// Save profile edits
	const saveProfile = async () => {
		if (!user) {
			console.error('Cannot save: user is null.');
			return;
		}

		try {
			const payload = {
				...user,
				weight: Number(user.weight), // Ensure it's a number
				desiredWeight: Number(user.desiredWeight) // Ensure it's a number
			};

			const response = await fetch('http://localhost:5000/api/auth/update-profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error('Failed to update profile.');
			}

			console.log('Profile updated successfully.');
			isEditing = false;
		} catch (error) {
			errorMessage =
				error instanceof Error ? error.message : 'An error occurred while updating the profile.';
			console.error(error);
		}
	};

	// Cancel edits
	const cancelEdit = () => {
		isEditing = false;
	};

	// Handle profile picture upload
	const handleProfilePictureUpload = (event: Event) => {
		const file = (event.target as HTMLInputElement)?.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
		}
	};

	// Update profile data on the backend
	const updateProfileOnBackend = async (updatedUser: User | null) => {
		if (!updatedUser) {
			console.error('Cannot update: updatedUser is null.');
			return;
		}

		try {
			const response = await fetch('http://localhost:5000/api/auth/update-profile', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedUser)
			});

			if (!response.ok) {
				throw new Error('Failed to update profile.');
			}

			console.log('Profile updated successfully.');
		} catch (error) {
			errorMessage =
				error instanceof Error ? error.message : 'An error occurred while updating the profile.';
			console.error(error);
		}
	};

	// Logout functionality
	const logout = () => {
		localStorage.removeItem('token'); // Remove the token from localStorage
		window.location.href = '/login'; // Redirect to the login page
	};
</script>

<div class="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
	{#if errorMessage}
		<p class="text-center text-red-500">{errorMessage}</p>
	{:else if !user}
		<p class="text-center text-gray-500">Loading profile...</p>
	{:else}
		<div class="flex items-center space-x-6">
			<!-- Circular Profile Picture -->
			<div class="relative">
				<div class="h-32 w-32 rounded-full bg-gradient-to-tr from-green-500 to-purple-600 p-1">
					<img
						src={user.profilePicture}
						alt="Profile picture"
						class="h-full w-full rounded-full object-cover"
					/>
				</div>
			</div>

			<!-- User Info -->
			<div>
				{#if !isEditing}
					<h1 class="text-4xl font-bold text-gray-900">{user.name}</h1>
					<p class="text-lg text-gray-700">{user.email}</p>
					<p class="mt-2 text-gray-600">{user.bio}</p>
					{#if user.privacy}
						<p class="mt-4 font-semibold text-gray-800">
							Weight:
							<span class="text-gray-600">
								{isLbs
									? formatWeight(parseFloat(kgToLbs(user.weight[0]))) + ' lbs'
									: formatWeight(user.weight[0]) + ' kg'}
							</span>
						</p>
					{/if}
					{#if user.desiredWeightPrivacy}
						<p class="mt-4 font-semibold text-gray-800">
							Desired Weight:
							<span class="text-gray-600">
								{isLbs
									? formatWeight(parseFloat(kgToLbs(user.desiredWeight[0]))) + ' lbs'
									: formatWeight(user.desiredWeight[0]) + ' kg'}
							</span>
						</p>
					{/if}
					{#if user.goalIntakePrivacy}
						<p class="mt-4 font-semibold text-gray-800">
							Goal Intake:
							<span class="text-gray-600">{user.goalIntake} kcal</span>
						</p>
					{/if}
					{#if user.dailyActivityPrivacy}
						<p class="mt-4 font-semibold text-gray-800">
							Daily Activity:
							<span class="text-gray-600">{user.dailyActivity} minutes</span>
						</p>
					{/if}
					<button
						on:click={() => (isEditing = true)}
						class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white shadow transition-all hover:bg-green-700"
					>
						Edit Profile
					</button>
					<button
						on:click={() => (isLbs = !isLbs)}
						class="ml-4 rounded-lg bg-gray-500 px-4 py-2 text-white shadow transition-all hover:bg-gray-600"
					>
						Toggle to {isLbs ? 'kg' : 'lbs'}
					</button>
				{:else}
					<form on:submit|preventDefault={saveProfile}>
						<div class="mb-4">
							<label for="name" class="block font-semibold text-gray-600">Name:</label>
							<input
								id="name"
								type="text"
								bind:value={user.name}
								class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>
						<div class="mb-4">
							<label for="email" class="block font-semibold text-gray-600">Email:</label>
							<input
								id="email"
								type="email"
								bind:value={user.email}
								class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>
						<div class="mb-4">
							<label for="bio" class="block font-semibold text-gray-600">Bio:</label>
							<textarea
								id="bio"
								bind:value={user.bio}
								class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
							></textarea>
						</div>
						<div class="mb-4 flex items-center space-x-4">
							<div class="w-1/2">
								<label for="weight" class="block font-semibold text-gray-600"
									>Weight ({isLbs ? 'lbs' : 'kg'}):</label
								>
								<input
									id="weight"
									type="number"
									bind:value={user.weight[0]}
									class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
								/>
							</div>
							<div class="flex w-1/2 items-center space-x-4">
								<button
									type="button"
									on:click={() => (isLbs = !isLbs)}
									class="rounded-lg bg-gray-500 px-4 py-2 text-white shadow transition-all hover:bg-gray-600"
								>
									Toggle to {isLbs ? 'kg' : 'lbs'}
								</button>
								<label class="flex items-center space-x-2">
									<input type="checkbox" bind:checked={user.privacy} class="form-checkbox" />
									<span class="font-semibold text-gray-600"> Display weight on profile </span>
								</label>
							</div>
						</div>
						<div class="mb-4 flex items-center space-x-4">
							<div class="w-1/2">
								<label for="desiredWeight" class="block font-semibold text-gray-600"
									>Desired Weight ({isLbs ? 'lbs' : 'kg'}):</label
								>
								<input
									id="desiredWeight"
									type="number"
									bind:value={user.desiredWeight[0]}
									class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
								/>
							</div>
							<div class="flex w-1/2 items-center space-x-4">
								<label class="flex items-center space-x-2">
									<input
										type="checkbox"
										bind:checked={user.desiredWeightPrivacy}
										class="form-checkbox"
									/>
									<span class="font-semibold text-gray-600">
										Display desired weight on profile
									</span>
								</label>
							</div>
						</div>
						<!-- Add Goal Intake and Daily Activity fields -->
						<div class="mb-4">
							<label for="goalIntake" class="block font-semibold text-gray-600"
								>Goal Intake (Calories):</label
							>
							<input
								id="goalIntake"
								type="number"
								bind:value={user.goalIntake}
								class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>
						<div class="mb-4">
							<label for="dailyActivity" class="block font-semibold text-gray-600"
								>Daily Activity (Minutes):</label
							>
							<input
								id="dailyActivity"
								type="number"
								bind:value={user.dailyActivity}
								class="w-full rounded border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>
						<!-- Privacy settings for new fields -->
						<div class="mb-4 flex items-center space-x-4">
							<label class="flex items-center space-x-2">
								<input
									type="checkbox"
									bind:checked={user.goalIntakePrivacy}
									class="form-checkbox"
								/>
								<span class="font-semibold text-gray-600"> Display goal intake on profile </span>
							</label>
						</div>
						<div class="mb-4 flex items-center space-x-4">
							<label class="flex items-center space-x-2">
								<input
									type="checkbox"
									bind:checked={user.dailyActivityPrivacy}
									class="form-checkbox"
								/>
								<span class="font-semibold text-gray-600"> Display daily activity on profile </span>
							</label>
						</div>
						<div class="mb-4">
							<label for="profilePicture" class="block font-semibold text-gray-600"
								>Profile Picture:</label
							>
							<input
								id="profilePicture"
								type="file"
								accept="image/*"
								on:change={handleProfilePictureUpload}
								class="mt-2 block"
							/>
						</div>
						<div class="flex space-x-4">
							<button
								type="submit"
								class="rounded-lg bg-purple-600 px-4 py-2 text-white shadow transition-all hover:bg-purple-700"
							>
								Save
							</button>
							<button
								type="button"
								on:click={cancelEdit}
								class="rounded-lg bg-gray-500 px-4 py-2 text-white shadow transition-all hover:bg-gray-600"
							>
								Cancel
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	body {
		background-color: #f7f9fc; /* Light background for the page */
		font-family: 'Inter', sans-serif; /* Modern font */
	}

	.rounded-full {
		border-radius: 50%;
	}

	.shadow {
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.focus:ring-2 {
		transition: all 0.2s ease;
	}
</style>
