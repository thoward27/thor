import { writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Workout } from '$lib/interfaces/index';
import { workout as newWorkout } from '$lib/interfaces/index';

// Theme data.
export const theme = writable<string>((browser && localStorage.getItem('theme')) || 'light');
theme.subscribe((value) => (browser ? localStorage.setItem('theme', value) : null));

// Username.
export const username = writable<string>('');

// Current workout
export const workout = writable<Workout>(
	(browser && JSON.parse(localStorage.getItem('workout'))) || newWorkout()
);
workout.subscribe((value) =>
	browser ? localStorage.setItem('workout', JSON.stringify(value)) : null
);

// Historical workouts.
export const workouts = writable<Workout[]>(
	(browser && JSON.parse(localStorage.getItem('workouts'))) || []
);
workouts.subscribe((value) =>
	browser ? localStorage.setItem('workouts', JSON.stringify(value)) : null
);
