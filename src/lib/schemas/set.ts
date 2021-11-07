import { schema as schema_setmodifier } from './setmodifier';

export const schema = {
	properties: {
		id: { type: 'uint16' },
		exercise: { type: 'string' },
		reps: { type: 'uint8' },
		modifiers: { elements: schema_setmodifier },
		failed: { type: 'boolean' },
		removed: { type: 'boolean' },
		created_at: { type: 'timestamp' }
	}
};
