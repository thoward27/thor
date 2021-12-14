import type { WorkoutType } from '$lib/schemas';
import type { IGunChainReference } from 'gun/types/chain';

const WORKOUTS_KEY = 'test-workouts/v1';

export namespace workout {
	export function add(gun: IGunChainReference, user: string, workout: WorkoutType): void {
		const { sets, ...rest } = workout;
		const ref = gun.get(WORKOUTS_KEY).get(user).set(rest);
		sets.forEach((set) => {
			const { modifiers, ...rest } = set;
			const setRef = ref.get('sets').set(rest);
			modifiers.forEach((modifier) => setRef.get('modifiers').set(modifier));
		});
	}
}
