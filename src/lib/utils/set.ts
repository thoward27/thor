import type { SetModifierType, SetType } from '$lib/schemas';
import clone from 'just-clone';

/** Create a new Set. */
export function create(
	id: number,
	exercise: string,
	reps = 1,
	modifiers: SetModifierType[] = []
): SetType {
	return {
		id: id,
		exercise: exercise,
		reps: reps,
		modifiers: modifiers,
		failed: false,
		removed: false,
		created_at: new Date()
	};
}

/** Duplicate a set. */
export function duplicate(id: number, target: SetType): SetType {
	return {
		...clone(target),
		// New set should get a new ID and created_at date.
		id: id,
		created_at: new Date()
	};
}
