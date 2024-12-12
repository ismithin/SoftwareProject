// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';

interface UserProfile {
    name: string;
    avatar: string;
    bio: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
}

export const profile = writable<UserProfile | null>(null);

export const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        profile.set({
            name: data.name,
            avatar: data.profilePicture,
            bio: data.bio,
            stats: {
                posts: data.stats?.posts || 0,
                followers: data.stats?.followers || 0,
                following: data.stats?.following || 0,
            },
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
};
