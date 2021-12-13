import { gun } from '$lib/initGun';
import type { SetModifierType } from '$lib/schemas';
import type { IGunChainReference } from 'gun/types/chain';
import { readable } from 'svelte/store';

function workoutStore(ref: IGunChainReference) {
	const { subscribe } = readable(null, function start(set) {
		// @ts-ignore
		ref.on((data) => set(data));
		return function stop() {
			ref.off();
		};
	});
	return {
		subscribe,
		addModifier: (modifier: SetModifierType) => ref.get('modifiers').set(modifier),
		start: () => ref.put({})
	};
}

export const workout = workoutStore(gun.user().get('workout'));
