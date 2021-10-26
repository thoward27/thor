<script>
	import '../app.scss';
	import { Navbar } from '$lib/components';
</script>

<Navbar />
<div class="container is-fluid mb-6">
	<slot />
</div>

<footer class="footer">
	<div class="content has-text-centered">
		<p>
			<strong>Thor Fitness</strong> by <a href="https://www.tomhoward.codes/">Tom Howard</a>. Source
			code can be found <a href="https://github.com/thoward27/thor">here</a>.
		</p>
	</div>
</footer>
