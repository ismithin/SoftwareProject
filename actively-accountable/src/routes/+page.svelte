<script lang="ts">
	// Image pool and random selection logic
	const imagePool = [
		'/src/lib/MealImages/frontPageAlbum/meal1.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal2.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal3.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal4.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal5.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal6.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal7.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal8.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal9.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal10.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal11.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal12.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal13.jpg',
		'/src/lib/MealImages/frontPageAlbum/meal14.jpg'
	];

	let currentImages: string[] = [];

	// Select 8 unique random images from the pool
	function initializeImages() {
		const shuffled = [...imagePool];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		currentImages = shuffled.slice(0, 8);
	}

	initializeImages();
</script>

<div class="main-container">
	<!-- Animated Grid Section -->
	<div class="grid-container">
		{#each currentImages as image, index}
			<div class="grid-item">
				<img src={image} alt={`Background ${index + 1}`} />
			</div>
		{/each}
	</div>

	<!-- Content Overlay Section -->
	<div class="form-container">
		<div class="text-box">
			<h1 class="welcome-title">Welcome to Actively Accountable</h1>
			<div class="button-group">
				<a href="/login" class="button">Login</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Main container */
	.main-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	/* Animated Grid */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 2px;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.grid-item {
		width: 100%;
		height: 100%;
	}

	.grid-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(1.1) contrast(1.2);
	}

	/* Overlay content */
	.form-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.85);
	}

	.text-box {
		text-align: center;
		background: white;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
	}

	.welcome-title {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.button-group {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.button {
		padding: 10px 20px;
		background-color: #3182ce;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		font-weight: bold;
	}

	.button:hover {
		background-color: #2c5282;
	}
</style>
