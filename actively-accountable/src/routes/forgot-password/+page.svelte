<script lang="ts">
    let email: string = '';
    let newPassword: string = '';
    let confirmPassword: string = '';

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Mocking password reset; replace with backend logic
        console.log(`Password reset for: ${email}`);
        alert('Your password has been successfully reset!');
        window.location.href = '/login'; // Redirect to login page after reset
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
    <div class="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h1>
        <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
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
                <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
                <input
                    id="newPassword"
                    type="password"
                    bind:value={newPassword}
                    placeholder="••••••••"
                    required
                    class="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>
            <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    bind:value={confirmPassword}
                    placeholder="••••••••"
                    required
                    class="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                class="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 focus:outline-none"
            >
                Reset Password
            </button>
        </form>
        <div class="mt-6 text-center text-sm">
            <a href="/login" class="text-blue-500 hover:underline">Back to Login</a>
        </div>
    </div>
</div>
