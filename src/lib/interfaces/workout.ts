import type { Set } from './set';

/**
 * Workout type.
 *
 * Wraps an array of [Set]s and some metadata.
 */
export type Workout = {
	sets: Set[];
	created_at: Date;
};

/**
 * Create a new workout.
 */
export function workout(): Workout {
	return { sets: [], created_at: new Date() };
}
