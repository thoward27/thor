export const schema = {
	properties: {
		name: { type: 'string' },
		type: { enum: ['text', 'number', 'checkbox'] },
		unit: { type: 'string' }
	}
} as const;
