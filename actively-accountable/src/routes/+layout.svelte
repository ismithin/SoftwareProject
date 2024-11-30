<script lang="ts">
	import '../app.css';
</script>

<nav class="bg-gray-800 p-4 text-white">
	<div class="mx-auto flex max-w-7xl justify-between">
		<a href="/" class="text-lg font-bold">Actively Accountable</a>
		<div>
			<a href="/login" class="mr-4 hover:underline">Login</a>
			<a href="/profile" class="hover:underline">Profile</a>
		</div>
	</div>
</nav>

<main class="p-4">
	<slot />
	<!-- This is where child content will render -->
</main>
