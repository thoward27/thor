<!-- Page header with slot for controls. -->
<script>
	import { Title } from '$lib/components';
	export let title;
</script>

<header class="mb-4">
	<div class="columns is-mobile is-multiline is-align-items-end is-justify-content-space-between">
		<div class="column is-narrow">
			<Title {title} />
		</div>
		<div class="column is-narrow">
			<slot name="controls" />
		</div>
	</div>
</header>
