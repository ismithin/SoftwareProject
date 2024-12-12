<script lang="ts">
	import '../app.css';
</script>

<nav class="bg-gray-800 p-4 text-white shadow-md relative z-20">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<a href="/" class="text-2xl font-bold hover:text-gray-300">
			Actively Accountable
		</a>
		<div class="flex items-center space-x-6">
			<a href="/login" class="text-lg font-medium hover:text-gray-300 transition duration-200">
				Login
			</a>
			<a href="/profile" class="text-lg font-medium hover:text-gray-300 transition duration-200">
				Profile
			</a>
			<a href="/timeline" class="text-lg font-medium hover:text-gray-300 transition duration-200">
				Timeline
			</a>
			<div class="relative group">
				<a href="#" class="text-lg font-medium hover:text-gray-300 transition duration-200">
					More
				</a>
				<div
					class="absolute left-0 mt-2 hidden w-40 rounded-md bg-gray-700 py-2 text-sm shadow-lg group-hover:block z-30"
				>
					<a href="/forgot-password" class="block px-4 py-2 hover:bg-gray-600 transition duration-200">
						Reset Password
					</a>
					<a href="/settings" class="block px-4 py-2 hover:bg-gray-600 transition duration-200">
						Settings
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>


<main class="p-4">
	<slot />
</main>
