<script lang="ts">
    interface User {
        name: string;
        email: string;
        bio: string;
    }

    // Mock user data with the User interface
    let user: User = {
        name: 'Isaac Smith',
        email: 'isaac.smith@example.com',
        bio: 'Fitness enthusiast and developer',
    };
</script>

<div class="max-w-3xl mx-auto mt-10">
    <h1 class="text-4xl font-bold">Profile</h1>
    <div class="mt-6 p-6 border rounded shadow">
        <p class="text-xl"><strong>Name:</strong> {user.name}</p>
        <p class="text-xl"><strong>Email:</strong> {user.email}</p>
        <p class="text-xl"><strong>Bio:</strong> {user.bio}</p>
    </div>
    <a href="/" class="mt-6 inline-block px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-700">
        Back to Home
    </a>
</div>
