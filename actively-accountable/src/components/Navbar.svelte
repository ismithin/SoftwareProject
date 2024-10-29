<script>
  export let currentPage;
</script>

<nav>
  <a href="#/" class:active={currentPage === 'home'}>Home</a>
  <a href="#/myProfile" class:active={currentPage === 'myProfile'}>Profile</a>
  <a href="#/timeline" class:active={currentPage === 'timeline'}>Timeline</a>
  <a href="#/createPost" class:active={currentPage === 'post'}>Create Post</a>
</nav>

<style>
  nav {
    display: flex;
    gap: 10px;
  }
  .active {
    font-weight: bold;
    color: blue;
  }
</style>
