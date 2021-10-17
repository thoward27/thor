/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
	return {
		headers: { Location: '/settings/profile' },
		status: 302
	};
}
