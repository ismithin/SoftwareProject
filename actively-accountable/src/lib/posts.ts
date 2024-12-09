import { writable } from 'svelte/store';


export const posts = writable([
    {
        id: 1,
        name: 'Alice Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        content: 'Just finished a 5k run! Feeling great! 🏃‍♀️',
        timestamp: '2 hours ago',
        likes: 3,
        likedBy: []
    },
    {
        id: 2,
        name: 'Bob Smith',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        content: 'Started meal prepping for the week. Healthy eating! 🥗',
        timestamp: '5 hours ago',
        likes: 2,
        likedBy: []
    },
    {
        id: 3,
        name: 'Cathy Williams',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        content: 'Loving my yoga class. 🧘‍♀️',
        timestamp: '1 day ago',
        likes: 3,
        likedBy: []
    },
    {
        id: 4,
        name: 'David Brown',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        content: 'Hit a new personal record in deadlifts today. 💪',
        timestamp: '2 days ago',
        likedBy: []
    },
    {
        id: 5,
        name: 'Emma Davis',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        content: 'Drinking more water these days. Stay hydrated, everyone! 💧',
        timestamp: '3 days ago',
        likes: 4,
        likedBy: []
    },
    {
        id: 6,
        name: 'Franklin Adams',
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        content: 'Signed up for my first marathon! Nervous but excited! 🏅',
        timestamp: '4 days ago',
        likes: 1
    },
    {
        id: 7,
        name: 'Grace Lee',
        avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
        content: 'Morning meditation complete. Ready to tackle the day! 🌅',
        timestamp: '6 days ago',
        likes: 6,
        likedBy: []
    },
    {
        id: 8,
        name: 'Henry Moore',
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        content: 'Finally learned how to swim. Better late than never! 🏊',
        timestamp: '1 week ago',
        likes: 5,
        likedBy: []
    },
    {
        id: 9,
        name: 'Isabella Carter',
        avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
        content: 'Tried rock climbing today. My arms are jelly! 🧗‍♀️',
        timestamp: '8 days ago',
        likes: 6,
        likedBy: []
    },
    {
        id: 10,
        name: 'Jack Peterson',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        content: 'Cooked a new healthy recipe. Tasted amazing! 🍲',
        timestamp: '9 days ago',
        likes: 12,
        likedBy: []
    },
    {
        id: 11,
        name: 'Katherine Brooks',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        content: 'Did 100 push-ups in one go. My body hurts! 💪',
        timestamp: '10 days ago',
        likes: 55,
        likedBy: []
    },
    {
        id: 12,
        name: 'Liam Turner',
        avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        content: 'Explored a new hiking trail. The view was breathtaking! 🏞️',
        timestamp: '2 weeks ago',
        likes: 6,
        likedBy: []
    },
    {
        id: 13,
        name: 'Mia Thompson',
        avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
        content: 'Tried intermittent fasting. It’s tough, but I feel great! ⏳',
        timestamp: '3 weeks ago',
        likes: 17,
        likedBy: []
    },
    {
        id: 14,
        name: 'Noah Scott',
        avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
        content: 'Biked 20 miles today. Feeling accomplished! 🚴',
        timestamp: '4 weeks ago',
        likes: 36,
        likedBy: []
    },
    {
        id: 15,
        name: 'Olivia Martin',
        avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
        content: 'Planted a small garden. Can’t wait to see it grow! 🌱',
        timestamp: '1 month ago',
        likes: 30000,
        likedBy: []
    }
]);
