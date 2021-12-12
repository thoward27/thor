<script>
	import '../app.scss';
	import { mode } from '$app/env';
	import { Navbar } from '$lib/components';

	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import { onMount } from 'svelte';
	import { username } from '$lib/stores';

	if (mode == 'development') {
		console.log('skipping sentry');
	} else {
		Sentry.init({
			dsn: 'https://6eb88841586a4a2b93ed4c92e3dbfdab@o1059727.ingest.sentry.io/6048571',
			// @ts-ignore: This gets defined in `svelte.config.js`.
			release: `thor-fitness@${__VERSION__}`, // eslint-disable-line no-undef
			integrations: [new Integrations.BrowserTracing()],
			environment: mode,
			tracesSampleRate: 0.9
		});
	}
	onMount(async () => {
		let gun = (await import('$lib/initGun')).gun;
		let user = gun.user().recall({ sessionStorage: true });
		user.get('alias').on((value) => username.set(value));
		// @ts-ignore
		gun.on('auth', async () => {
			const alias = user.get('alias');
			// @ts-ignore
			username.set(alias);
		});
	});
</script>

<Navbar />
<div class="container is-fluid mb-6">
	<slot />
</div>

<!-- <footer class="footer">
	<div class="content has-text-centered">
		<p>
			<strong>Thor Fitness</strong> by <a href="https://www.tomhoward.codes/">Tom Howard</a>. Source
			code can be found <a href="https://github.com/thoward27/thor">here</a>.
		</p>
	</div>
</footer> -->
