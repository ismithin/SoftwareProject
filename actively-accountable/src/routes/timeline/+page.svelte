<script lang="ts">
	import { posts } from '$lib/posts';
	import { get } from 'svelte/store'; // To access current store value
	import Modal from '$lib/Modal.svelte';

	let isModalOpen = false;
	let newPostContent = '';
	let newPostName = '';

	const openModal = () => (isModalOpen = true);
	const closeModal = () => (isModalOpen = false);

	const handleSubmit = () => {
		if (!newPostName || !newPostContent) {
			alert('Please fill out all fields.');
			return;
		}

		const newPost = {
			id: get(posts).length + 1,
			name: newPostName,
			avatar: 'https://via.placeholder.com/50',
			content: newPostContent,
			timestamp: 'Just now'
		};

		posts.update((currentPosts) => [newPost, ...currentPosts]);

		newPostName = '';
		newPostContent = '';
		closeModal();
	};

	// Mock user profile data
	const user = {
		name: 'Isaac Smith',
		avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		bio: 'Fitness enthusiast and developer. Staying accountable every day!',
		stats: {
			posts: 34,
			followers: 128,
			following: 52
		}
	};
</script>

<div class="flex min-h-screen bg-gray-100">
	<!-- Sidebar -->
	<aside class="hidden w-1/4 bg-white p-4 shadow-lg lg:block">
		<div class="text-center">
			<img src={user.avatar} alt="User Avatar" class="mx-auto h-24 w-24 rounded-full shadow-lg" />
			<h2 class="mt-4 text-xl font-bold text-gray-800">{user.name}</h2>
			<p class="mt-2 text-sm text-gray-600">{user.bio}</p>
		</div>
		<div class="mt-6 space-y-4">
			<div class="flex justify-between text-sm">
				<span class="font-semibold">Posts</span>
				<span>{user.stats.posts}</span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="font-semibold">Followers</span>
				<span>{user.stats.followers}</span>
			</div>
			<div class="flex justify-between text-sm">
				<span class="font-semibold">Following</span>
				<span>{user.stats.following}</span>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex flex-grow flex-col lg:w-3/4">
		<div class="flex-shrink-0 bg-white p-4 shadow">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold text-gray-800">Timeline</h1>
				<button
					class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					on:click={openModal}
				>
					Create Post
				</button>
			</div>
			<!-- Scrollable Timeline -->
			<div class="flex-grow overflow-y-auto bg-gray-50 p-4">
				{#each $posts as post (post.id)}
					<div class="rounded bg-gray-50 p-4 shadow-sm">
						<div class="flex items-center space-x-4">
							<img src={post.avatar} alt="Avatar" class="h-10 w-10 rounded-full" />
							<div>
								<h2 class="text-lg font-semibold">{post.name}</h2>
								<p class="text-sm text-gray-500">{post.timestamp}</p>
							</div>
						</div>
						<p class="mt-3 text-gray-700">{post.content}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Modal -->
	<Modal bind:isOpen={isModalOpen} onClose={closeModal}>
		<h2 class="mb-4 text-xl font-bold">Create a Post</h2>
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
				<input
					id="name"
					type="text"
					bind:value={newPostName}
					placeholder="Enter your name"
					required
					class="mt-1 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div>
				<label for="content" class="block text-sm font-medium text-gray-700">Post Content</label>
				<textarea
					id="content"
					bind:value={newPostContent}
					placeholder="What's on your mind?"
					required
					class="mt-1 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				></textarea>
			</div>
			<button
				type="submit"
				class="w-full rounded bg-green-500 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
			>
				Post
			</button>
		</form>
	</Modal>
</div>
