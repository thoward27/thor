import type { ModifierType } from '$lib/schemas';
import { validators } from '$lib/schemas';

/** Fixture data containing an array of Modifiers. */
export const fixtures: ModifierType[] = [
	{ name: 'band', type: 'text', unit: 'color' },
	{ name: 'pins', type: 'number', unit: 'hole' },
	{ name: 'bar', type: 'text', unit: 'style' },
	// TODO: Best way to support KG/LBS? Perhaps autocomplete on name + unit combo?
	{ name: 'weight', type: 'number', unit: 'lbs' }
];
// Validate fixture data immediately.
fixtures.forEach((value) => {
	if (!validators.modifier(value)) {
		throw Error('Failed to vaildate fixture data.');
	}
});
