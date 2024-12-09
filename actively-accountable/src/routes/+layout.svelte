<script lang="ts">
	import '../app.css';
  </script>
  
  <nav class="bg-gray-800 p-4 text-white">
	<div class="mx-auto flex max-w-7xl justify-between">
	  <a href="/" class="text-lg font-bold">Actively Accountable</a>
	  <div class="flex space-x-4">
		<!-- Login Link (Increased Font Size) -->
		<a href="/login" class="text-xl hover:underline">Login</a>
  
		<!-- Profile Link Wrapper (After Login) -->
		<div class="relative group">
		  <a href="/profile" class="text-xl hover:underline">Profile</a>

		<!-- Timeline Link Wrapper (After Login) -->
		<div class="relative group">
		  <a href="/timeline" class="text-xl hover:underline">Timeline</a>
  
		  <!-- Dropdown Menu (Hidden by default, shown on hover or focus) -->
		  <div class="absolute left-0 mt-2 hidden bg-gray-700 text-white rounded-md shadow-lg group-hover:block group-focus-within:block">
			<a href="/forgot-password" class="text-sm block px-4 py-2 hover:bg-gray-600">Reset Password</a>
		  </div>
		</div>
	  </div>
	</div>
  </nav>
  
  <main class="p-4">
	<slot />
	<!-- This is where child content will render -->
  </main>
  