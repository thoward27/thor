import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { modifier_utils, workout_utils } from '$lib/utils';
import { parsers } from '$lib/schemas';
import type { ModifierType, WorkoutType } from '$lib/schemas';

/** Theme data store.
 *
 * Defaults to light mode.
 * TODO: Implement theme toggles.
 */
export const theme = writable<string>(read('theme', 'light', (value) => value));
theme.subscribe((value) => write('theme', value));

/** Username store. */
export const username = writable<string>('');

/** Current workout store.
 *
 * Holds the currently active workout.
 */
export const workout = writable<WorkoutType>(
	read('workout', workout_utils.create(), (data) => parsers.parse(data, parsers.workout))
);
workout.subscribe((value) => write('workout', JSON.stringify(value)));

/** Workouts store.
 *
 * Holds an array of workouts, or the history, of the user.
 */
export const workouts = writable<WorkoutType[]>(
	read('workouts', [], (data) => parsers.parse(data, parsers.workouts))
);
workouts.subscribe((value) => write('workouts', JSON.stringify(value)));

/** Modifiers store.
 *
 * This store holds the generic Modifiers created by the user.
 * It is guaranteed to have several, as we load fixture data in as soon as the client loads.
 */
export const modifiers = writable<ModifierType[]>(
	read('modifiers', [], (data) => parsers.parse(data, parsers.modifiers))
);
modifiers.subscribe((value) => write('modifiers', JSON.stringify(value)));

// Install fixture data into the array.
if (browser) {
	modifiers.update((modifiers) => {
		try {
			return [...modifiers, ...modifier_utils.fixtures].filter(
				(value, index, array) => array.findIndex((entry) => value.name == entry.name) == index
			);
		} catch (TypeError) {
			// If modifiers is null, this gets thrown.
			return modifier_utils.fixtures;
		}
	});
}

/**
 * Utilities.
 */

/** Read a value from storage.
 *
 * Calls `transform` on the value returned from storage.
 * If `transform` throws an error, or if it returns `null`, this function
 * returns the `fallback` provided.
 */
function read<Type>(
	key: string,
	fallback: Type,
	transform: (value: string) => Type | undefined
): Type {
	if (browser) {
		try {
			return transform(localStorage.getItem(key) || '') || fallback;
		} catch (SyntaxError) {
			return fallback;
		}
	}
	return fallback;
}

/** Write a value to storage. */
function write(key: string, value: string) {
	if (browser) {
		// console.log(`setItem(${key}: ${value})`);
		localStorage.setItem(key, value);
	}
}
