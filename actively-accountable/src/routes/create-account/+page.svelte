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

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        // Clear previous error messages
        formErrorMessage = '';

        // Check if all fields are filled
        if (!name || !email || !password || !securityQuestion || !securityAnswer) {
            formErrorMessage = 'Please fill in all fields.';
            return;
        }

        // Validate password
        if (!validatePassword(password)) {
            errorMessage = "Password must contain at least one uppercase letter and one number.";
            return;
        }

        // Mocking account creation; replace with actual backend integration
        console.log(`Account Created: ${name}, ${email}, ${securityQuestion}, ${securityAnswer}`);
        window.location.href = '/login'; // Redirect to login page after account creation
    };
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <h1 class="mb-6 text-4xl font-bold text-navy-900">Create Account</h1>
    <form
        class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg"
        on:submit|preventDefault={handleSubmit}
    >
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
            <input
                id="name"
                type="text"
                bind:value={name}
                required
                class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
            <input
                id="email"
                type="email"
                bind:value={email}
                required
                class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password <span class="text-red-500">*</span></label>
            <input
                id="password"
                type="password"
                bind:value={password}
                required
                class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {#if errorMessage}
                <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
            {/if}
        </div>

        <!-- Security Question Section -->
        <div>
            <label for="securityQuestion" class="block text-sm font-medium text-gray-700">Security Question <span class="text-red-500">*</span></label>
            <select
                id="securityQuestion"
                bind:value={securityQuestion}
                required
                class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="" disabled>Select a security question</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                <option value="What is your favorite color?">What is your favorite color?</option>
                <option value="What city were you born in?">What city were you born in?</option>
            </select>
        </div>
        
        <div>
            <label for="securityAnswer" class="block text-sm font-medium text-gray-700">Security Answer <span class="text-red-500">*</span></label>
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
            <p class="text-red-500 text-sm mt-2">{formErrorMessage}</p>
        {/if}

        <button type="submit" class="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
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
        background-color: #48BB78;
    }
    .bg-green-600 {
        background-color: #38A169;
    }
    .bg-green-700 {
        background-color: #2F855A;
    }
    .focus\:ring-green-500:focus {
        ring-color: #48BB78;
    }
    .text-red-500 {
        color: #f56565;
    }
</style>


