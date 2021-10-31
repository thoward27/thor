import { writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Modifier, Workout } from '$lib/interfaces/index';
import { workout as newWorkout, modifiers as default_modifiers } from '$lib/interfaces/index';

// Theme data.
export const theme = writable<string>(read('theme', 'light', (value) => value));
theme.subscribe((value) => write('theme', value));

// Username.
export const username = writable<string>('');

// Current workout
export const workout = writable<Workout>(read('workout', newWorkout(), JSON.parse));
workout.subscribe((value) => write('workout', JSON.stringify(value)));

// Historical workouts.
export const workouts = writable<Workout[]>(read('workouts', [], JSON.parse));
workouts.subscribe((value) => write('workouts', JSON.stringify(value)));

// Modifiers.
export const modifiers = writable<Modifier[]>(read('modifiers', [], JSON.parse));
modifiers.subscribe((value) => write('modifiers', JSON.stringify(value)));

if (browser) {
	modifiers.update((modifiers) => {
		const combined = [...modifiers, ...default_modifiers].filter(
			(value, index, array) => array.findIndex((entry) => value.name == entry.name) == index
		);
		return combined;
	});
}

/**
 * Utilities.
 */

/// Read a value, if not present, returns fallback.
function read<Type>(key: string, fallback: Type, transform: (value: string) => Type): Type {
	if (browser) {
		try {
			return transform(localStorage.getItem(key));
		} catch (SyntaxError) {
			return fallback;
		}
	}
	return fallback;
}

/// Writes the value to the key provided.
function write(key: string, value: string) {
	if (browser) {
		console.log(`setItem(${key}: ${value})`);
		localStorage.setItem(key, value);
	}
}
