import { schema as schema_set } from './set';

export const schema = {
	properties: {
		sets: { elements: schema_set },
		created_at: { type: 'timestamp' }
	}
} as const;
