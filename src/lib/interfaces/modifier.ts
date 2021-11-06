/**
 * Modifier.
 *
 * This type describes a generic modifier, something that
 * can be instantiated as a [SetModifier] against a set.
 *
 * Consider the example: a user wishes to perform Box Squats.
 * In this case, the set exercise is Squat.
 * A modifier applied would be { name: box, type: number, unit: pin }.
 * This would allow the user to use the SetModifier { modifier: box, variant: 5 }.
 * Which would mean the user used a box set to the 5th pin.
 */
export type Modifier = {
	name: string;
	type: 'text' | 'number' | 'checkbox';
	unit: string;
};

export const modifiers: Modifier[] = [
	{ name: 'band', type: 'text', unit: 'color' },
	{ name: 'pins', type: 'number', unit: 'hole' },
	{ name: 'bar', type: 'text', unit: 'style' },
	// TODO: Best way to support KG/LBS? Perhaps autocomplete on name + unit combo?
	{ name: 'weight', type: 'number', unit: 'lbs'}
];
