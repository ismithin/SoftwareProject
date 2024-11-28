<script lang="ts">
    let email: string = '';
    let password: string = '';

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        console.log(`Logged in as: ${email}`);
        window.location.href = '/'; // Redirect to landing page
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100">
    <div class="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <div class="text-center mb-8">
            <img src="/your-logo.png" alt="Logo" class="w-16 h-16 mx-auto" />
            <h1 class="text-2xl font-bold text-gray-800">Good to see you again</h1>
        </div>
        <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                    Your email
                </label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    placeholder="e.g., email@example.com"
                    required
                    class="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                    class="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                class="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 focus:outline-none"
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
