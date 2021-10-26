/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(): Promise<Record<string, unknown>> {
	return {
		headers: { Location: '/workout' },
		status: 302
	};
}
