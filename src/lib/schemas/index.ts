import { captureMessage } from '@sentry/minimal';
import Ajv, { JTDDataType, JTDParser } from 'ajv/dist/jtd.js';
// Import schemas.
import { schema as schema_modifier } from './modifier';
import { schema as schema_set } from './set';
import { schema as schema_setmodifier } from './setmodifier';
import { schema as schema_workout } from './workout';

// Instantiate AJV Instance.
export const ajv = new Ajv();

// Export Schemas.
export { schema_modifier, schema_setmodifier, schema_set, schema_workout };

// Add schemas.
ajv.addSchema(schema_modifier, 'modifier');
ajv.addSchema(schema_setmodifier, 'setmodifier');
ajv.addSchema(schema_set, 'set');
ajv.addSchema(schema_workout, 'workout');

// Generate all validators.
export namespace validators {
	export const modifier = ajv.getSchema('modifier')!;
	export const setmodifier = ajv.getSchema('setmodifier')!;
	export const set = ajv.getSchema('set')!;
	export const workout = ajv.getSchema('workout');
}

// Generate all parsers.
export namespace parsers {
	/** Try to parse and report to sentry on failure. */
	export function parse<T>(data: string, parser: JTDParser<T>): T | undefined {
		const value = parser(data);
		if (!value) {
			console.log(`Failed to parse data. ${data} ${parser.message}`);
			captureMessage(`tryParse failed to parse ${data}`);
			return;
		}
		return value;
	}

	export const modifier = ajv.compileParser<ModifierType>(schema_modifier);
	export const modifiers = ajv.compileParser<ModifierType[]>({ elements: schema_modifier });
	export const setmodifier = ajv.compileParser<SetModifierType>(schema_setmodifier);
	export const set = ajv.compileParser<SetType>(schema_set);
	export const workout = ajv.compileParser<WorkoutType>(schema_workout);
	export const workouts = ajv.compileParser<WorkoutType[]>({ elements: schema_workout });
}

/**
 * TYPE DEFINITIONS.
 */

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
export type ModifierType = JTDDataType<typeof schema_modifier>;

/**
 * SetModifier.
 *
 * This is the application of a modifier to an actual set.
 * We define this to be a modifier + specfic variant.
 * Examples:
 *  - Bench Press: Pins set to 16, Medium Board, Red Bands
 */
export type SetModifierType = JTDDataType<typeof schema_setmodifier>;

/**
 * Set.
 *
 * Describes a single set within a workout.
 */
export type SetType = JTDDataType<typeof schema_set>;

/**
 * Workout type.
 *
 * Wraps an array of [Set]s and some metadata.
 */
export type WorkoutType = JTDDataType<typeof schema_workout>;
