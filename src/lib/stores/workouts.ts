import { gun } from '$lib/initGun';
import type { WorkoutType } from '$lib/schemas';
import { gunStore } from './utils';

// @ts-ignore
const ref = gun.get('test-workouts');
export const workouts = {
	...gunStore(ref.map()),
	push: (key: string, workout: WorkoutType) => {
		console.log(`Saving workout to ${key}`);
		// Alright, let's save a workout!
		// We cannot natively save arrays, so we isolate them here.
		const { sets, ...rest } = workout;
		// Builds the workout node, which we will attach sets to.
		const workoutNode = ref.get(key).set(rest);
		sets.forEach((set) => {
			// Similaly to above, create a set node then add modifiers.
			const { modifiers, ...rest } = set;
			const setNode = workoutNode.get('sets').set(rest);
			modifiers.forEach((modifier) => {
				setNode.get('modifiers').set(modifier);
			});
		});
	}
};

// TODO: Does not work! 
export function userWorkouts(key?: string) {
	let userRef = key ? ref.get(key) : ref;
	return {
		...gunStore(userRef),
		push: (workout: WorkoutType) => {
			// Alright, let's save a workout!
			// We cannot natively save arrays, so we isolate them here.
			const { sets, ...rest } = workout;
			// Builds the workout node, which we will attach sets to.
			const workoutNode = userRef.set(rest);
			sets.forEach((set) => {
				// Similaly to above, create a set node then add modifiers.
				const { modifiers, ...rest } = set;
				const setNode = workoutNode.get('sets').set(rest);
				modifiers.forEach((modifier) => {
					setNode.get('modifiers').set(modifier);
				});
			});
		},
		user: (key) => {
			userRef = userRef.get(key);
		}
	};
}
