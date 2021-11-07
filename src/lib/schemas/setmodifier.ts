import { schema as schema_modifier } from './modifier';

export const schema = {
	properties: {
		modifier: schema_modifier,
		variant: {}
	}
} as const;
