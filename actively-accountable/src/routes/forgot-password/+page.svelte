<script lang="ts">
    let email: string = '';
    let securityAnswer: string = '';
    let newPassword: string = '';
    let confirmPassword: string = '';
    let errorMessage: string = '';
    let formStep: number = 1; // Controls the form step (1: email, 2: security question, 3: password)
    let securityQuestion: string = '';
    let correctAnswer: string = '';

    // Simulating a user database
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
        // Ensure the password contains at least one uppercase letter and one number
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
        return passwordRegex.test(password);
    };

    const handleEmailSubmit = (event: Event) => {
        event.preventDefault();
        
        // Check if the email exists in the user database
        const user = usersDb[email];
        
        if (user) {
            securityQuestion = user.securityQuestion; // Set the security question for the user
            correctAnswer = user.securityAnswer; // Set the correct answer for the question
            formStep = 2; // Move to the next step (security question)
        } else {
            alert('Email not recognized. Please try again.');
        }
    };

    const handleSecuritySubmit = (event: Event) => {
        event.preventDefault();

        // Check if the security answer is correct
        if (securityAnswer.trim().toLowerCase() !== correctAnswer.toLowerCase()) {
            alert('Incorrect answer. Please try again.');
            return;
        }

        // Proceed to password reset step
        formStep = 3;
    };

    const handlePasswordSubmit = (event: Event) => {
        event.preventDefault();

        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Validate the new password
        if (!validatePassword(newPassword)) {
            errorMessage = "Password must contain at least one uppercase letter and one number.";
            return;
        }

        // Here you would update the user's password in the backend, but for this example, we just log it.
        console.log(`Password reset for: ${email}`);
        alert('Your password has been successfully reset!');
        window.location.href = '/login'; // Redirect to login page after reset
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
    <div class="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h1>

        <!-- Step 1: Email -->
        {#if formStep === 1}
            <form class="space-y-6" on:submit|preventDefault={handleEmailSubmit}>
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
                <button
                    type="submit"
                    class="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 focus:outline-none"
                >
                    Continue
                </button>
            </form>
        {/if}

        <!-- Step 2: Security Question -->
        {#if formStep === 2}
            <form class="space-y-6" on:submit|preventDefault={handleSecuritySubmit}>
                <div>
                    <label class="block text-sm font-medium text-gray-700">{securityQuestion}</label>
                    <input
                        id="securityAnswer"
                        type="text"
                        bind:value={securityAnswer}
                        required
                        class="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    class="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 focus:outline-none"
                >
                    Verify Answer
                </button>
            </form>
        {/if}

        <!-- Step 3: Reset Password -->
        {#if formStep === 3}
            <form class="space-y-6" on:submit|preventDefault={handlePasswordSubmit}>
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
                    {#if errorMessage}
                        <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
                    {/if}
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
        {/if}

        <div class="mt-6 text-center text-sm">
            <a href="/login" class="text-blue-500 hover:underline">Back to Login</a>
        </div>
    </div>
</div>

<style>
    /* Styling for error message */
    .text-red-500 {
        color: #f56565;
    }
</style>
