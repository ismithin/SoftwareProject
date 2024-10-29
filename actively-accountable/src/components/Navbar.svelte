<script>
  export let currentPage;
</script>

<nav class="navbar">
  <a href="#/" class:active={currentPage === 'home'}>Home</a>
  <a href="#/myProfile" class:active={currentPage === 'myProfile'}>Profile</a>
  <a href="#/timeline" class:active={currentPage === 'timeline'}>Timeline</a>
  <a href="#/createPost" class:active={currentPage === 'post'}>Create Post</a>
</nav>

<style>
  /* Navbar container styling */
  nav.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    padding: 1em;
  }

  /* Link styling */
  nav a {
    color: white;
    text-decoration: none;
    padding: 0.75em 1.5em;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.1s;
    font-size: 1.1em;
    font-family: 'Arial', sans-serif;
  }

  /* Active link styling */
  .active {
    background-color: #4caf50;
    color: white;
    font-weight: bold;
  }

  /* Hover effect for links */
  nav a:hover {
    background-color: #575757;
    transform: scale(1.05);
  }

  /* Responsive styling for smaller screens */
  @media (max-width: 600px) {
    nav.navbar {
      flex-direction: column;
      align-items: flex-start;
    }

    nav a {
      width: 100%; /* Make links span full width */
      text-align: center;
      margin: 0.5em 0;
    }
  }
</style>
