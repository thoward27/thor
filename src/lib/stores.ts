import { writable } from 'svelte/store';
import { browser } from '$app/env';

// Theme data.
export const theme = writable((browser && localStorage.getItem('theme')) || 'light');
theme.subscribe((value) => (browser ? localStorage.setItem('theme', value) : null));

/* Historical Workouts 

Workout: {
    start: dt,
    stop: dt
}
*/
// export const workouts = writable(browser && localStorage.getItem('workouts') || []);
// workouts.subscribe((value) => browser ? localStorage.setItem('workouts', value) : null);

export const username = writable('');
