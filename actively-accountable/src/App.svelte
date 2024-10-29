<script>
  import Router from 'svelte-spa-router';

  // Import your page components
  import Index from './routes/index.svelte';
  import MyProfile from './routes/myProfile.svelte';
  import Timeline from './routes/timeline.svelte';
  import CreatePost from './routes/createPost.svelte';

  // Define the routes object
  const routes = {
    '/': Index,
    '/myProfile': MyProfile,
    '/timeline': Timeline,
    '/createPost': CreatePost,
  };
</script>

<Router {routes} />
