
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get() {
	return {
		headers: { Location: '/workout' },
		status: 302
	};
}
