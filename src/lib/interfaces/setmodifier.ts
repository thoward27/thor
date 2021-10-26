import type { Modifier } from './modifier';

/**
 * SetModifier.
 *
 * This is the application of a modifier to an actual set.
 * We define this to be a modifier + specfic variant.
 * Examples:
 *  - Bench Press: Pins set to 16, Medium Board, Red Bands
 */
export type SetModifier = {
	modifier: Modifier;
	variant: string | number | boolean;
};
