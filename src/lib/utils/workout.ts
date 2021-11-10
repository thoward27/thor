import type { WorkoutType } from '$lib/schemas';
import { set_utils } from '.';
import { create as create_set } from './set';

/** Create a new workout. */
export function create(): WorkoutType {
	return { sets: [], created_at: new Date() };
}

/** Add a set to a workout. */
export function addSet(workout: WorkoutType): WorkoutType {
	workout.sets = [create_set(workout.sets.length, 'null'), ...workout.sets];
	return workout;
}

/** Duplicate the set at the given index. */
export function duplicateSet(workout: WorkoutType, index: number): WorkoutType {
	workout.sets = [set_utils.duplicate(workout.sets.length, workout.sets[index]), ...workout.sets];
	return workout;
}

/** Remove the set from the workout. */
export function removeSet(workout: WorkoutType, index: number): WorkoutType {
	workout.sets[index].removed = true;
	return workout;
}
