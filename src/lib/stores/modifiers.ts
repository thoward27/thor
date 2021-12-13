import { gun } from '$lib/initGun';
import { readable } from 'svelte/store';

const ref = gun.get('modifiers');

export const modifiers = {
	subscribe: readable([], function start(set) {
		console.log('Starting notifications for modifiers.');
		// ref.map().on(data => )
	})
};
