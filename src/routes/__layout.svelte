<script>
	import '../app.scss';
	import { Navbar } from '$lib/components';

	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';

	Sentry.init({
		dsn: 'https://6eb88841586a4a2b93ed4c92e3dbfdab@o1059727.ingest.sentry.io/6048571',
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
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
