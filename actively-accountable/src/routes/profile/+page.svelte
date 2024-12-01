<script lang="ts">
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

    // Mock user data
    let user: User = {
        name: 'Isaac Smith',
        email: 'isaac.smith@example.com',
        bio: 'Fitness enthusiast and developer',
        privacy: true, // Default to displaying weight
        desiredWeightPrivacy: true, // Default to displaying desired weight
        goalIntakePrivacy: true, // Default to displaying goal intake
        dailyActivityPrivacy: true, // Default to displaying daily activity
        weight: new Float32Array([70]), // Weight in kg
        desiredWeight: new Float32Array([68]), // Desired weight in kg
        goalIntake: 2000, // Example goal intake in calories
        dailyActivity: 45, // Example daily activity in minutes
        profilePicture: 'https://via.placeholder.com/150'
    };

    let isEditing = false; // State to toggle edit mode
    let isLbs = false; // State to toggle between kg and lbs
    let tempUser = { ...user }; // Temporary storage for edits

    // Conversion functions with rounding to hundredths
    const kgToLbs = (kg: number) => (Math.round((kg * 2.20462) * 100) / 100).toFixed(2);
    const lbsToKg = (lbs: number) => (Math.round((lbs / 2.20462) * 100) / 100).toFixed(2);

    // Save edits
    const saveProfile = () => {
        // Save weight and desired weight based on the toggle (lbs or kg)
        tempUser.weight[0] = isLbs ? parseFloat(lbsToKg(tempUser.weight[0])) : tempUser.weight[0];
        tempUser.desiredWeight[0] = isLbs ? parseFloat(lbsToKg(tempUser.desiredWeight[0])) : tempUser.desiredWeight[0];
        user = { ...tempUser };
        isEditing = false;
    };

    // Cancel edits
    const cancelEdit = () => {
        tempUser = { ...user };
        isEditing = false;
    };

    // Handle profile picture upload
    const handleProfilePictureUpload = (event: Event) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                tempUser.profilePicture = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // Format weight to display with two decimal places, regardless of the unit
    const formatWeight = (weight: number) => {
        return weight.toFixed(2); // Always format to two decimal places
    };
</script>

<div class="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
    <div class="flex items-center space-x-6">
        <!-- Circular Profile Picture -->
        <div class="relative">
            <div class="w-32 h-32 rounded-full bg-gradient-to-tr from-green-500 to-purple-600 p-1">
                <img
                    src={isEditing ? tempUser.profilePicture : user.profilePicture}
                    alt="Profile picture"
                    class="w-full h-full object-cover rounded-full"
                />
            </div>
        </div>

        <!-- User Info -->
        <div>
            {#if !isEditing}
                <h1 class="text-4xl font-bold text-gray-900">{user.name}</h1>
                <p class="text-gray-700 text-lg">{user.email}</p>
                <p class="mt-2 text-gray-600">{user.bio}</p>
                {#if user.privacy}
                    <p class="mt-4 text-gray-800 font-semibold">
                        Weight: 
                        <span class="text-gray-600">
                            {isLbs ? formatWeight(parseFloat(kgToLbs(user.weight[0]))) + ' lbs' : formatWeight(user.weight[0]) + ' kg'}
                        </span>
                    </p>
                {/if}
                {#if user.desiredWeightPrivacy}
                    <p class="mt-4 text-gray-800 font-semibold">
                        Desired Weight: 
                        <span class="text-gray-600">
                            {isLbs ? formatWeight(parseFloat(kgToLbs(user.desiredWeight[0]))) + ' lbs' : formatWeight(user.desiredWeight[0]) + ' kg'}
                        </span>
                    </p>
                {/if}
                {#if user.goalIntakePrivacy}
                    <p class="mt-4 text-gray-800 font-semibold">
                        Goal Intake: 
                        <span class="text-gray-600">{user.goalIntake} kcal</span>
                    </p>
                {/if}
                {#if user.dailyActivityPrivacy}
                    <p class="mt-4 text-gray-800 font-semibold">
                        Daily Activity: 
                        <span class="text-gray-600">{user.dailyActivity} minutes</span>
                    </p>
                {/if}
                <button
                    on:click={() => (isEditing = true)}
                    class="mt-4 px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition-all"
                >
                    Edit Profile
                </button>
                <button
                    on:click={() => (isLbs = !isLbs)}
                    class="ml-4 px-4 py-2 text-white bg-gray-500 rounded-lg shadow hover:bg-gray-600 transition-all"
                >
                    Toggle to {isLbs ? 'kg' : 'lbs'}
                </button>
            {:else}
                <form on:submit|preventDefault={saveProfile}>
                    <div class="mb-4">
                        <label for="name" class="block text-gray-600 font-semibold">Name:</label>
                        <input
                            id="name"
                            type="text"
                            bind:value={tempUser.name}
                            class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-600 font-semibold">Email:</label>
                        <input
                            id="email"
                            type="email"
                            bind:value={tempUser.email}
                            class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="bio" class="block text-gray-600 font-semibold">Bio:</label>
                        <textarea
                            id="bio"
                            bind:value={tempUser.bio}
                            class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>
                    <div class="mb-4 flex items-center space-x-4">
                        <div class="w-1/2">
                            <label for="weight" class="block text-gray-600 font-semibold">Weight ({isLbs ? 'lbs' : 'kg'}):</label>
                            <input
                                id="weight"
                                type="number"
                                bind:value={tempUser.weight[0]}
                                class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div class="w-1/2 flex items-center space-x-4">
                            <button
                                type="button"
                                on:click={() => (isLbs = !isLbs)}
                                class="px-4 py-2 text-white bg-gray-500 rounded-lg shadow hover:bg-gray-600 transition-all"
                            >
                                Toggle to {isLbs ? 'kg' : 'lbs'}
                            </button>
                            <label class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    bind:checked={tempUser.privacy}
                                    class="form-checkbox"
                                />
                                <span class="text-gray-600 font-semibold">
                                    Display weight on profile
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="mb-4 flex items-center space-x-4">
                        <div class="w-1/2">
                            <label for="desiredWeight" class="block text-gray-600 font-semibold">Desired Weight ({isLbs ? 'lbs' : 'kg'}):</label>
                            <input
                                id="desiredWeight"
                                type="number"
                                bind:value={tempUser.desiredWeight[0]}
                                class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div class="w-1/2 flex items-center space-x-4">
                            <label class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    bind:checked={tempUser.desiredWeightPrivacy}
                                    class="form-checkbox"
                                />
                                <span class="text-gray-600 font-semibold">
                                    Display desired weight on profile
                                </span>
                            </label>
                        </div>
                    </div>
                    <!-- Add Goal Intake and Daily Activity fields -->
                    <div class="mb-4">
                        <label for="goalIntake" class="block text-gray-600 font-semibold">Goal Intake (Calories):</label>
                        <input
                            id="goalIntake"
                            type="number"
                            bind:value={tempUser.goalIntake}
                            class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="dailyActivity" class="block text-gray-600 font-semibold">Daily Activity (Minutes):</label>
                        <input
                            id="dailyActivity"
                            type="number"
                            bind:value={tempUser.dailyActivity}
                            class="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <!-- Privacy settings for new fields -->
                    <div class="mb-4 flex items-center space-x-4">
                        <label class="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                bind:checked={tempUser.goalIntakePrivacy}
                                class="form-checkbox"
                            />
                            <span class="text-gray-600 font-semibold">
                                Display goal intake on profile
                            </span>
                        </label>
                    </div>
                    <div class="mb-4 flex items-center space-x-4">
                        <label class="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                bind:checked={tempUser.dailyActivityPrivacy}
                                class="form-checkbox"
                            />
                            <span class="text-gray-600 font-semibold">
                                Display daily activity on profile
                            </span>
                        </label>
                    </div>
                    <div class="mb-4">
                        <label for="profilePicture" class="block text-gray-600 font-semibold">Profile Picture:</label>
                        <input
                            id="profilePicture"
                            type="file"
                            accept="image/*"
                            on:change={handleProfilePictureUpload}
                            class="block mt-2"
                        />
                    </div>
                    <div class="flex space-x-4">
                        <button
                            type="submit"
                            class="px-4 py-2 text-white bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition-all"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            on:click={cancelEdit}
                            class="px-4 py-2 text-white bg-gray-500 rounded-lg shadow hover:bg-gray-600 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
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
