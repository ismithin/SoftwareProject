import { hydrate, mount } from 'svelte';
import App from './App.svelte';

const app = hydrate(App, { target: document.body});

export default app;