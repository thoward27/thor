import type { SetModifier } from './setmodifier';
import clone from 'just-clone';

/**
 * Set.
 *
 * Describes a single set within a workout.
 */
export type Set = {
	// Used for updating the UI.
	id: number;
	exercise: string;
	reps: number;
	modifiers: SetModifier[];

	// Whether this set has been removed from the workout.
	removed: boolean;
	created_at: Date;
};

/**
 * Create a new Set.
 */
export function createSet(
	id: number,
	exercise: string,
	reps = 1,
	modifiers: SetModifier[] = []
): Set {
	return {
		id: id,
		exercise: exercise,
		reps: reps,
		modifiers: modifiers,
		removed: false,
		created_at: new Date()
	};
}

export function duplicateSet(id: number, target: Set): Set {
	return {
		...clone(target),
		// New set should get a new ID and created_at date.
		id: id,
		created_at: new Date()
	};
}
