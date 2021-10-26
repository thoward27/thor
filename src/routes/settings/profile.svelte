<script>
	import { Subtitle } from '$lib/components';
	import { username } from '$lib/stores';
</script>

<Subtitle text="Profile" />

<div class="content">
	<p>
		Username: {$username}
	</p>
</div>
