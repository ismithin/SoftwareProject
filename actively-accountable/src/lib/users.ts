import { writable } from 'svelte/store';

export const users = writable([]); // Array to hold user information

export const currentUser = writable(null); // Logged-in user
